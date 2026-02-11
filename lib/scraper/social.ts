import { KEYWORDS } from "./keywords";
import Parser from "rss-parser";
import cities from "@/cities.json";

interface SocialResult {
    city: string;
    text: string;
    url: string;
}

const parser = new Parser();

export async function scrapeSocial(cityAccount: string) {
    const results: SocialResult[] = [];
    
    let feed;

    do {
        feed = await parser.parseURL(`https://nitter.net/${cityAccount}/with_replies/rss`);
    } while (!feed || !feed.items);

    feed.items.forEach(item => {
        const text = (item.title || "").toLocaleLowerCase("tr-TR");
        if (KEYWORDS.some((k) => text.includes(k))) {
            results.push({
                city: Object.entries(cities).find(([, account]) => account === cityAccount)?.[0] || "",
                text: text,
                url: item.link?.toString().replace("http://nitter.net", "//x.com") || "",
            });
        }
    }
    );
    
    return results;
}