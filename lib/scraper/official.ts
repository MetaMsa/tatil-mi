import { KEYWORDS } from "./keywords";
import * as cheerio from "cheerio";
import { slugify } from "turkify";

interface OfficialResult {
  city: string;
  text: string;
  url: string;
}

export async function scrapeOfficial(city: string) {
  const results: OfficialResult[] = [];

  const res = await fetch(`http://www.${slugify(city)}.gov.tr/duyurular`);
  const html = await res.text();
  const $ = cheerio.load(html);

  $("a.announce-text").each((_, el) => {
    const text = $(el).text().toLocaleLowerCase("tr-TR");
    if (KEYWORDS.some((k) => text.includes(k))) {
      results.push({
        city: city,
        text: text,
        url: $(el).attr("href")!,
      });
    }
  });

  if (results.length == 0) {
    const res2 = await fetch(
      `http://www.${slugify(city)}.gov.tr/basin-aciklamalari`
    );
    const html2 = await res2.text();
    const $2 = cheerio.load(html2);

    $2("a.announce-text").each((_, el) => {
      const text = $(el).text().toLocaleLowerCase("tr-TR");
      if (KEYWORDS.some((k) => text.includes(k))) {
        results.push({
          city: city,
          text: text,
          url: $(el).attr("href")!,
        });
      }
    });
  }

  return results;
}
