"use client";

import cities from "@/cities.json";
import { useState } from "react";
import { slugify } from "turkify";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [searchTextOpen, setSearchTextOpen] = useState<boolean>(false);
  const router = useRouter();

  const searchHandler = (e: any) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filtered = Object.keys(cities).filter((city) =>
    city.toLowerCase().includes(searchText)
  );

  const keyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filtered.length > 0) {
      router.push("/" + slugify(filtered[0]));
    }
  };

  return (
    <div className="w-72">
      <input
        onChange={searchHandler}
        onKeyDown={keyHandler}
        type="search"
        className="input border-black w-full bg-white my-auto"
        placeholder="Şehir ara..."
        onFocus={() => setSearchTextOpen(true)}
        onBlur={() => setSearchTextOpen(false)}
      />
      {searchText && searchTextOpen && (
        <ul className="absolute p-3 bg-white rounded-box shadow max-h-96 overflow-auto">
          {filtered.length === 0 && (
            <li className="disabled">
              <span>Sonuç yok</span>
            </li>
          )}

          {filtered.map((city) => (
            <li key={city}>
              <Link href={slugify(city)}>{city}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
