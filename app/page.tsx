"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import trData from "@/tr-cities.json"; 
import { FeatureCollection, Geometry } from "geojson";
import { useRouter } from "next/navigation";

const width = 800;
const height = 450;

export default function TurkeyMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!trData || !svgRef.current) return;

    const geoData = trData as unknown as FeatureCollection<Geometry>;

    const svg = d3.select(svgRef.current);
    
    svg.selectAll("*").remove();

    const projection = d3.geoMercator().fitSize([width, height], geoData);

    const pathGenerator = d3.geoPath().projection(projection);

    const g = svg.append("g");

    g.selectAll("path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("d", (d: any) => pathGenerator(d))
      .attr("fill", "#1e90ff44")
      .attr("stroke", "#1e90ff")
      .attr("stroke-width", 1)
      .attr("cursor", "pointer")
      .on("mouseover", function (event, d) {
        d3.select(this as SVGPathElement)
          .transition()
          .duration(200)
          .attr("fill", "#1e90ff88");
      })
      .on("click", function (event, d) {
        router.push("/" + d.properties.name);
      })
      .on("mouseout", function (event, d) {
        d3.select(this as SVGPathElement)
          .transition()
          .duration(200)
          .attr("fill", "#1e90ff44");
      });

  }, []);

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