import { KEYWORDS } from "./keywords";
import * as cheerio from "cheerio";
import { slugify } from "turkify";

interface OfficialResult {
  city: string;
  text: string;
  url: string;
}

export async function scrapeOfficial(cityName: string) {
  const results: OfficialResult[] = [];

  const res = await fetch(`http://www.${slugify(cityName)}.gov.tr/duyurular`);
  const html = await res.text();
  const $ = cheerio.load(html);

  $("a.announce-text").each((_, el) => {
    const text = $(el).text().toLocaleLowerCase("tr-TR");
    if (KEYWORDS.some((k) => text.includes(k))) {
      results.push({
        city: cityName,
        text: text,
        url: $(el).attr("href")!,
      });
    }
  });

  return results;
}