"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import trData from "@/tr-cities.json";
import { FeatureCollection, Geometry } from "geojson";
import { useRouter } from "next/navigation";
import { slugify } from "turkify";

const width = 800;
const height = 450;

interface Cities {
  id: string;
  city: string;
}

export default function TurkeyMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const router = useRouter();
  const [cities, setCities] = useState<Cities[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/api/holidays", {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });

      const list: Cities[] = await res.json();

      const mapped = list.map((x: any) => ({
        id: x.id,
        city: x.city.toLocaleLowerCase(),
      }));

      setCities(mapped);
    };

    getData();
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const geoData = trData as FeatureCollection<Geometry>;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const projection = d3.geoMercator().fitSize([width, height], geoData);
    const pathGen = d3.geoPath().projection(projection);

    const g = svg.append("g");

    const isHolidayCity = (d: any) =>
      cities.some((c) => c.city === d.properties?.name?.toLocaleLowerCase());

    g.selectAll("path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("d", (d) => pathGen(d) || "")
      .attr("fill", (d) => (isHolidayCity(d) ? "#ff3b3b" : "#1e90ff44"))
      .attr("fill-opacity", (d) => (isHolidayCity(d) ? 0.8 : 0.6))
      .attr("stroke", "#1e90ff")
      .attr("stroke-width", 1)
      .attr("cursor", "pointer")
      .attr("class", (d) => (isHolidayCity(d) ? "holiday-city" : ""))
      .on("mouseover", function () {
        d3.select(this).transition().duration(150).attr("fill-opacity", 1);
      })
      .on("mouseout", function (event, d: any) {
        d3.select(this)
          .transition()
          .duration(150)
          .attr("fill-opacity", isHolidayCity(d) ? 0.8 : 0.6);
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

    const holidayPaths = g.selectAll<SVGPathElement, any>(".holiday-city");

    const pulse = () => {
      holidayPaths
        .transition()
        .duration(700)
        .attr("fill-opacity", 0.25)
        .transition()
        .duration(700)
        .attr("fill-opacity", 0.9)
        .on("end", pulse);
    };

    if (!holidayPaths.empty()) {
      pulse();
    }
  }, [cities, router]);

  return (
    <div className="w-full h-auto max-w-4xl mx-auto">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
      />
      <div className="flex gap-3 justify-center">
        <span className="relative flex size-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
        </span>
        Gün içinde duyuru tespit edilen iller
      </div>
      <div className="text-center my-5 text-sm">Duyuru detayları için haritadan il seçin.</div>
    </div>
  );
}
