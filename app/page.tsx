"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import trData from "@/tr-cities.json";
import { FeatureCollection, Geometry } from "geojson";
import { useRouter } from "next/navigation";
import { slugify } from "turkify";

const width = 800;
const height = 450;

export default function TurkeyMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const router = useRouter();

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
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-gray-50">
      <main className="w-full max-w-4xl p-4">
        <div className="w-full h-auto">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto"
          />
        </div>
      </main>
    </div>
  );
}