import { KEYWORDS } from "./keywords";
import Parser from "rss-parser";
import cities from "@/cities.json";

interface SocialResult {
    city: string;
    text: string;
    url: string;
}

const parser = new Parser({
    headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0'},
});

export async function scrapeSocial(cityAccount: string) {
    const results: SocialResult[] = [];
    
    const feed = await parser.parseURL(`https://nitter-production-73a7.up.railway.app/${cityAccount}/with_replies/rss`);

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