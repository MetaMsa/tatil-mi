import City from "./City";

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

  return <City city={city} />;
}
