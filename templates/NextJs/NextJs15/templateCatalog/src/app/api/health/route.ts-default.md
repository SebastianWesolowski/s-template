import { trackCustomEvent } from '@/lib/telemetry';

export async function GET() {
  trackCustomEvent('api.example.request', {
    timestamp: Date.now(),
    // inne atrybuty...
  });
  return Response.json({ status: 'ok' });
}
