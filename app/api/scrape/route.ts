import { scrapeOfficial } from "@/lib/scraper/official";
import { prisma } from "@/lib/prisma";
import cities from "@/cities.json";
import { NextRequest } from "next/server";

/**
* @swagger
* /api/scrape:
*   get:
*     summary: Web Scraping Başlatır (Cron Job)
*     parameters:
*       - in: header
*         name: Authorization
*         required: true
*         schema:
*           type: string
*         description: Bearer CRON_SECRET
*     responses:
*       200:
*         description: Successful Response
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 ok:
*                   type: boolean
*                   example: true
*                 processed:
*                   type: number
*                   example: 5
*                 details:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       city:
*                         type: string
*                       count:
*                         type: number
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: unauthorized
*/
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