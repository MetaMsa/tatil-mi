import { notFound } from "next/navigation";
import City from "./City";
import cities from "@/cities.json";

enum NormalizeCities {
  adana = "adana",
  adiyaman = "adıyaman",
  afyonkarahisar = "afyonkarahisar",
  agri = "ağrı",
  aksaray = "aksaray",
  amasya = "amasya",
  ankara = "ankara",
  antalya = "antalya",
  ardahan = "ardahan",
  artvin = "artvin",
  aydin = "aydın",
  balikesir = "balıkesir",
  bartin = "bartın",
  batman = "batman",
  bayburt = "bayburt",
  bilecik = "bilecik",
  bingol = "bingöl",
  bitlis = "bitlis",
  bolu = "bolu",
  burdur = "burdur",
  bursa = "bursa",
  canakkale = "çanakkale",
  cankiri = "çankırı",
  corum = "çorum",
  denizli = "denizli",
  diyarbakir = "diyarbakır",
  duzce = "düzce",
  edirne = "edirne",
  elazig = "elazığ",
  erzincan = "erzincan",
  erzurum = "erzurum",
  eskisehir = "eskişehir",
  gaziantep = "gaziantep",
  giresun = "giresun",
  gumushane = "gümüşhane",
  hakkari = "hakkari",
  hatay = "hatay",
  igdir = "ığdır",
  isparta = "ısparta",
  istanbul = "istanbul",
  izmir = "izmir",
  kahramanmaras = "kahramanmaraş",
  karabuk = "karabük",
  karaman = "karaman",
  kars = "kars",
  kastamonu = "kastamonu",
  kayseri = "kayseri",
  kilis = "kilis",
  kirikkale = "kırıkkale",
  kirklareli = "kırklareli",
  kirsehir = "kırşehir",
  kocaeli = "kocaeli",
  konya = "konya",
  kutahya = "kütahya",
  malatya = "malatya",
  manisa = "manisa",
  mardin = "mardin",
  mersin = "mersin",
  mugla = "muğla",
  mus = "muş",
  nevsehir = "nevşehir",
  nigde = "niğde",
  ordu = "ordu",
  osmaniye = "osmaniye",
  rize = "rize",
  sakarya = "sakarya",
  samsun = "samsun",
  sanliurfa = "şanlıurfa",
  siirt = "siirt",
  sinop = "sinop",
  sivas = "sivas",
  sirnak = "şırnak",
  tekirdag = "tekirdağ",
  tokat = "tokat",
  trabzon = "trabzon",
  tunceli = "tunceli",
  usak = "uşak",
  van = "van",
  yalova = "yalova",
  yozgat = "yozgat",
  zonguldak = "zonguldak",
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;

  const capitalized = NormalizeCities[city as keyof typeof NormalizeCities]
    ? NormalizeCities[city as keyof typeof NormalizeCities]
        .charAt(0)
        .toLocaleUpperCase("tr-TR") +
      NormalizeCities[city as keyof typeof NormalizeCities].slice(1)
    : city.charAt(0).toLocaleUpperCase("tr-TR") + city.slice(1);

  return {
    title: `${capitalized} tatil mi?`,
    description: `${capitalized} kar tatili duyuruları`,
    keywords: `${capitalized} tatil mi, ${capitalized} kar tatili, ${capitalized} valilik, ${capitalized} açıklama`,
    alternates: {
      canonical: `https://tatilmi.benserhat.com/${city}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;

  if (!NormalizeCities[city as keyof typeof NormalizeCities]) return notFound();

  return <City city={city} />;
}
