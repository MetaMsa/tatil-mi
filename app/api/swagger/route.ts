import { getApiDocs } from "@/lib/swagger";

export async function GET() {
    const spec = await getApiDocs();
    return Response.json(spec);
}