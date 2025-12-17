import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import cities from "@/cities.json";

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
  elazig = "elazığ",
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const city = searchParams.get("city");

  if (
    city &&
    !Object.keys(cities).includes(
      NormalizeCities[city as keyof typeof NormalizeCities] ?? city
    )
  ) {
    return Response.json({ error: "not found" }, { status: 404 });
  }

  const now = new Date();
  const TR_OFFSET = 3;

  const start = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      -TR_OFFSET,
      0,
      0,
      0
    )
  );

  const end = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      -TR_OFFSET,
      0,
      0,
      0
    )
  );

  let holidays;

  if (city && city != "") {
    holidays = await prisma.holiday.findMany({
      where: {
        city: NormalizeCities[city as keyof typeof NormalizeCities] ?? city,
      },
      orderBy: { createdAt: "desc" },
    });
  } else {
    holidays = await prisma.holiday.findMany({
      where: {
        createdAt: {
          gte: start,
          lt: end,
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  return Response.json(holidays);
}
