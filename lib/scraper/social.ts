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
    
    const feed = await parser.parseURL(`https://nitter.dashy.a3x.dn.nyx.im/${cityAccount}/rss`);

    feed.items.forEach(item => {
        const text = (item.title || "").toLocaleLowerCase("tr-TR");
        if (KEYWORDS.some((k) => text.includes(k))) {
            results.push({
                city: Object.entries(cities).find(([, account]) => account === cityAccount)?.[0] || "",
                text: text,
                url: item.link!,
            });
        }
    }
    );
    
    return results;
}