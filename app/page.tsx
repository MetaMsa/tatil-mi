"use client";

import * as d3 from "d3";
import { useEffect, useRef, useCallback } from "react";
import trData from "@/tr-cities.json";
import { FeatureCollection, Geometry } from "geojson";
import { useRouter } from "next/navigation";
import { slugify } from "turkify";
import { prisma } from "@/lib/prisma";

const width = 800;
const height = 450;

export default function TurkeyMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const router = useRouter();

  const getData = async() => {
    const res = await fetch("/api/holidays", {
      cache: "no-store",
    });
    return res.json();
  }

  const data = getData();

  console.log(data);

  useEffect(() => {
    if (!svgRef.current) return;
    const geoData = trData as FeatureCollection<Geometry>;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const projection = d3.geoMercator().fitSize([width, height], geoData);
    const pathGen = d3.geoPath().projection(projection);

    const g = svg.append("g");

    g.selectAll("path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("d", (d) => pathGen(d) || "")
      .attr("fill", "#1e90ff44")
      .attr("stroke", "#1e90ff")
      .attr("stroke-width", 1)
      .attr("cursor", "pointer")
      .on("mouseover", (event) => {
        d3.select(event.currentTarget)
          .transition()
          .duration(150)
          .attr("fill", "#1e90ff88");
      })
      .on("mouseout", (event) => {
        d3.select(event.currentTarget)
          .transition()
          .duration(150)
          .attr("fill", "#1e90ff44");
      })
      .on("click", (_, d: any) => {
        router.push("/" + slugify(d.properties.name));
      });

    g.selectAll("text")
      .data(geoData.features)
      .enter()
      .append("text")
      .attr("x", (d) => pathGen.centroid(d)[0])
      .attr("y", (d) => pathGen.centroid(d)[1])
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "10px")
      .attr("fill", "#111")
      .attr("pointer-events", "none")
      .text((d) => d.properties?.name);
  }, [router]);

  return (
    <main className="w-full max-w-4xl m-auto">
      <div className="w-full h-auto">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
        />
      </div>
    </main>
  );
}
