import { scrapeOfficial } from "@/lib/scraper/official";
import { prisma } from "@/lib/prisma";
import cities from "@/cities.json";
import { NextRequest } from "next/server";
import { scrapeSocial } from "@/lib/scraper/social";

export async function GET(
  req: NextRequest,
  { params }: { params: { city: string } },
) {
  const auth = req.headers.get("authorization");
  const cityName = params.city;

  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const cityAccount = cities[cityName as keyof typeof cities];

  let results: { city: string; text: string; url: string }[] = [];

  try {
    console.log(`Şehir işleniyor: ${cityName}`);

    results = await scrapeOfficial(cityName);

    if (!results || results.length === 0) {
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
  } catch (e) {
    console.error(`Şehir işlenirken hata oluştu ${cityName}: `, e);
  }

  return Response.json({
    ok: true,
    city: cityName,
    count: results.length,
  });
}
