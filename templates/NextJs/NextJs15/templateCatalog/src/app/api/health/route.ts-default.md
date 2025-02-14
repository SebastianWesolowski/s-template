export async function GET() {
  return Response.json({ status: 'ok', imestamp: Date.now() });
}
