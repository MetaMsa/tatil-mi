"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

enum NormalizeCities {
  adiyaman = "adıyaman",
  agri = "ağrı",
  aydin = "aydın",
  balikesir = "balıkesir",
  bartin = "bartın",
  bingol = "bingöl",
  canakkale = "çanakkale",
  cankiri = "çankırı",
  corum = "çorum",
  diyarbakir = "diyarbakır",
  duzce = "düzce",
  elazıg = "elazığ",
  eskisehir = "eskişehir",
  gumushane = "gümüşhane",
  igdir = "ığdır",
  isparta = "ısparta",
  kahramanmaras = "kahramanmaraş",
  karabuk = "karabük",
  kirikkale = "kırıkkale",
  kirklareli = "kırklareli",
  kirsehir = "kırşehir",
  kutahya = "kütahya",
  mugla = "muğla",
  mus = "muş",
  nevsehir = "nevşehir",
  nigde = "niğde",
  sanliurfa = "şanlıurfa",
  sirnak = "şırnak",
  tekirdag = "tekirdağ",
  usak = "uşak",
}

interface Holiday {
  id: string;
  city: string;
  text: string;
  url: string;
  createdAt: string;
}

const fmtDT = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleString("tr-TR") : "—";

export default function City({ city }: { city: string }) {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const res = await fetch(`/api/holidays?city=${city}`, {
        cache: "no-store",
        headers: { Accept: "application/json" },
      }).finally(() => setLoading(false));

      const list: Holiday[] = await res.json();

      const mapped: Holiday[] = list.map((x: Holiday) => ({
        id: x.id,
        city: x.city,
        text: x.text,
        url: x.url,
        createdAt: x.createdAt,
      }));
      setHolidays(mapped);
    };
    getData();
  }, [city]);

  const capitalized = NormalizeCities[city as keyof typeof NormalizeCities]
    ? NormalizeCities[city as keyof typeof NormalizeCities]
        .charAt(0)
        .toLocaleUpperCase("tr-TR") +
      NormalizeCities[city as keyof typeof NormalizeCities].slice(1)
    : city.charAt(0).toLocaleUpperCase("tr-TR") + city.slice(1);

  const d = new Date();

  return (
    <div className="m-10 text-center bg-white p-3 rounded-xl shadow">
      <p className="text-center mb-5 bg-info mx-auto p-3 rounded-xl">
        {capitalized} Tatil Duyuruları
      </p>
      <div className="flex flex-wrap justify-center gap-6 overflow-y-auto max-h-96">
        {loading ? 
          <div className="loading loading-spinner"></div>
         : (holidays.length != 0 ? (
          holidays.map((h) => (
            <Link
              key={h.id}
              href={"http:" + h.url}
              className={`card ${
                fmtDT(h.createdAt).slice(0, 10) ===
                fmtDT(d.toString()).slice(0, 10)
                  ? "bg-primary"
                  : "bg-warning"
              } text-primary-content w-96 h-50 hover:shadow-2xl active:shadow-2xl`}
            >
              <div className="card-body">
                <h2 className="card-title mx-auto md:mx-0">Kar Tatili</h2>
                <p className="truncate">
                  {h.text} <br />
                  <span className="text-xs">
                    {fmtDT(h.createdAt).slice(0, 10)} <br />
                    {fmtDT(h.createdAt).slice(0, 10) ===
                    fmtDT(d.toString()).slice(0, 10)
                      ? "Yeni duyuru"
                      : "Eski duyuru"}
                  </span>
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="bg-red-500 text-white p-3 rounded-xl">
            Bu il için duyuru yok.
          </div>
        ))}
      </div>
    </div>
  );
}
