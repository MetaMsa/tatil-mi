import { KEYWORDS } from "./keywords";
import * as cheerio from "cheerio";
import { slugify } from "turkify";

export async function scrapeOfficial(city: string) {
  const res = await fetch(`http://www.${slugify(city)}.gov.tr/duyurular`);
  const html = await res.text();
  const $ = cheerio.load(html);

  const results: any[] = [];

  $("a.announce-text").each((_, el) => {
    const text = $(el).text().toLocaleLowerCase();
    if (KEYWORDS.some((k) => text.includes(k))) {
        results.push({
            city: city,
            text: text,
            url: $(el).attr("href")
        });
    }
  });

  return results;
}
