import { prisma } from "@/lib/prisma";

export async function GET() {
    const holidays = await prisma.holiday.findMany({
        orderBy: { createdAt: "desc" }
    })
    return Response.json(holidays)
}