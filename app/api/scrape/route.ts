import { scrapeOfficial } from "@/lib/scraper/official";
import { prisma } from "@/lib/prisma";
import cities from "@/cities.json";
import { NextRequest } from "next/server";
import { scrapeSocial } from "@/lib/scraper/social";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");

  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const processed: { city: string; count: number }[] = [];

  for (const [cityName, cityAccount] of Object.entries(cities)) {
    try {
      console.log(`Şehir işleniyor: ${cityName}`);

      let results = await scrapeOfficial(cityName);

      if (!results || results.length === 0) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        results = await scrapeSocial(cityAccount);
      }

      await prisma.holiday.createMany({
        data: results.map((item) => ({
          city: cityName,
          text: item.text,
          url: item.url,
        })),
        skipDuplicates: true,
      });

      processed.push({ city: cityName, count: results.length });
    } catch (e) {
      console.error(`Şehir işlenirken hata oluştu ${cityName}: `, e);
      processed.push({ city: cityName, count: 0 });
    }
  }

  return Response.json({
    ok: true,
    processed: processed.length,
    details: processed,
  });
}
