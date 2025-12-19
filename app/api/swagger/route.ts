import { getSwaggerSpec } from "@/lib/swagger";

export async function GET() {
    return Response.json(getSwaggerSpec());
}