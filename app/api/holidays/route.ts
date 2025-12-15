import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

enum NormalizeCities{
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
    usak = "uşak"
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const city = searchParams.get("city");

  const now = new Date();

  const start = new Date(now);
  start.setDate(start.getDate() - 1);
  start.setHours(22, 0, 0, 0);

  const end = new Date(now);
  end.setHours(22, 0, 0, 0);

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
