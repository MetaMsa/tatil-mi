import { scrapeOfficial } from "@/lib/scraper/official";
import { prisma } from "@/lib/prisma";
import cities from "@/cities.json";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");

  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const processed: { city: string; count: number }[] = [];

  for (const [cityName] of Object.entries(cities)) {
    const results = await scrapeOfficial(cityName);
    if (!results || results.length === 0) continue;

    await prisma.holiday.createMany({
      data: results.map((item) => ({
        city: cityName,
        text: item.text,
        url: item.url,
      })),
      skipDuplicates: true,
    });

    processed.push({ city: cityName, count: results.length });
  }

  return Response.json({
    ok: true,
    processed: processed.length,
    details: processed,
  });
}
