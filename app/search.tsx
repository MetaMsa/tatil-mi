"use client";

import cities from "@/cities.json";
import { useState, useMemo } from "react";
import { slugify } from "turkify";
import { useRouter } from "next/navigation";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [searchTextOpen, setSearchTextOpen] = useState<boolean>(false);
  const router = useRouter();

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLocaleLowerCase("tr-TR"));
  };

  const filtered = useMemo(
    () =>
      Object.keys(cities).filter((city) =>
        city.toLocaleLowerCase("tr-TR").includes(searchText),
      ),
    [searchText],
  );

  const keyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filtered.length > 0) {
      router.push("/" + slugify(filtered[0]));
    }
  };

  return (
    <div className="relative me-6 sm:ms-24 md:ms-36 lg:ms-48">
      <input
        onChange={searchHandler}
        onKeyDown={keyHandler}
        type="search"
        className="input border-black bg-info my-auto text-dark rounded-xl text-center w-full"
        placeholder="Şehir ara..."
        onFocus={() => setSearchTextOpen(true)}
        onBlur={() => setSearchTextOpen(false)}
      />
      {searchText && searchTextOpen && (
        <ul className="absolute left-0 right-0 mt-2 p-3 bg-white rounded-box shadow max-h-60 sm:max-h-96 overflow-auto text-center text-xs sm:text-lg">
          {filtered.length === 0 && (
            <li className="py-2 text-gray-500">Sonuç yok</li>
          )}

          {filtered.map((city) => (
            <li
              key={city}
              onMouseDown={() => router.push("/" + slugify(city))}
              className="cursor-pointer py-2 px-2 truncate link rounded"
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
