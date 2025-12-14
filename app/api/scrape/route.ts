import { scrapeOfficial } from "@/lib/scraper/official";
import { prisma } from "@/lib/prisma";
import cities from "@/cities.json";

export async function GET() {
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