/** @type {import('next-sitemap').IConfig} */
import fs from "fs";
import path from "path";

import { slugify } from "turkify";

const config = {
  siteUrl: 'https://tatilmi.benserhat.com',
  exclude: ['/docs'],

  additionalPaths: async () => {
    const cities = JSON.parse(
      fs.readFileSync(path.resolve("./cities.json"), "utf-8")
    );
    
    return Object.keys(cities).map((city) => ({
      loc: slugify(city),
      changefreq: "daily",
      priority: 0.7,
      lastmod: new Date().toISOString()
    }));
  }
};

export default config;