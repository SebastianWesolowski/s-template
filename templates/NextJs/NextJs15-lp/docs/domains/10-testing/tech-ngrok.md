# Ngrok Configuration

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)
## Rola Ngrok w projekcie

Ngrok umożliwia external testing i webhook testing przez automatyczną autentykację i równoległe uruchamianie z serwerem dev. Integruje się z workflow testing i developer experience.

**Koncepcja i filozofia:** [overview.md](overview.md) — external testing (brak dedykowanej sekcji)
**Workflow i integracja:** [technical.md](technical.md#external-testing-z-ngrok)
**Kompletna referencja:** [reference.md](reference.md)

## Nietypowe konfiguracje projektu

### 1. Automatyczna Autentykacja (tools/ngrok-auth.js)

**Problem:** Ręczna autentykacja ngrok przed każdym uruchomieniem jest uciążliwa.

**Rozwiązanie:** Automatyczne narzędzie autentykacji uruchamiane przed tunnel.

[tools/ngrok-auth.js](../../../tools/ngrok-auth.js)

```javascript
require('dotenv').config();
const ngrok = require('ngrok');

async function authenticate() {
  try {
    if (!process.env.NGROK_AUTH_TOKEN) {
      throw new Error('NGROK_AUTH_TOKEN not found in .env file');
    }
    await ngrok.authtoken(process.env.NGROK_AUTH_TOKEN);
    console.log('\x1b[32mNgrok authentication successful!\x1b[0m');
  } catch (error) {
    console.error('\x1b[31mError:', error.message, '\x1b[0m');
    process.exit(1);
  }
}

authenticate();
```

**Użycie:** Autentykacja uruchamiana automatycznie przez skrypt `ngrok:auth` przed każdym tunelem.

### 2. Równoległe Uruchamianie (dev:tunnel)

**Problem:** Potrzeba uruchomić autentykację, serwer dev i ngrok równolegle.

**Rozwiązanie:** Skrypt `dev:tunnel` używa `run-p` do równoległego uruchomienia wszystkich trzech procesów.

[package.json](../../../package.json) linia 9

```json
{
  "dev:tunnel": "run-p ngrok:auth dev ngrok",
  "ngrok": "ngrok http 3000",
  "ngrok:auth": "node tools/ngrok-auth.js"
}
```

**Kolejność wykonania:**

1. `ngrok:auth` — autentykuje ngrok (wymagane przed uruchomieniem tunelu)
2. `dev` — uruchamia Next.js dev server
3. `ngrok` — uruchamia tunnel na porcie 3000

**Szczegóły:** `run-p` (npm-run-all) uruchamia procesy równolegle, `ngrok:auth` musi się wykonać przed `ngrok`.

### 3. Environment Variables Integration

**Problem:** Token ngrok musi być dostępny w środowisku, ale nie powinien być commitowany.

**Rozwiązanie:** Integracja z T3-env (`env.mjs`) i `.env.local` pattern.

[env.mjs](../../../env.mjs) linia 10

```javascript
NGROK_AUTH_TOKEN: z.string().min(1, 'NGROK_AUTH_TOKEN is required for ngrok commands').optional(),
```

**Konfiguracja:**

1. Dodaj token do `.env.local`: `NGROK_AUTH_TOKEN=your-token-here`
2. Token jest optional — nie wymagany jeśli nie używasz ngrok
3. Sprawdzany przez `tools/ngrok-auth.js` przed autentykacją

**Szczegóły:** [../3-environment/technical.md](../3-environment/technical.md#ngrok-tunneling-ngrok_auth_token) — environment variables setup

## Use Cases w projekcie

### Webhook Testing

**Problem:** Zewnętrzne serwisy nie mogą wysyłać webhooków do localhost.

**Rozwiązanie:** Ngrok tunnel udostępnia publiczny URL dla webhooków.

```bash
# Uruchom development z tunelem
yarn dev:tunnel

# Ngrok wyświetli URL: https://abc123.ngrok.io
# Skonfiguruj webhook w zewnętrznym serwisie na ten URL
```

**Integracja z Playwright:**

Przykład użycia `NGROK_URL` w teście E2E:

```typescript
// e2e/webhook-test.spec.ts
import { test, expect } from '@playwright/test';

test('webhook integration test', async ({ page }) => {
  // Pobierz NGROK_URL z environment variable
  const ngrokUrl = process.env.NGROK_URL || 'http://localhost:3000';

  // Użyj ngrok URL w teście
  await page.goto(`${ngrokUrl}/webhook-endpoint`);

  // Test webhook handling
  await expect(page).toHaveText(/webhook received/i);
});
```

**Uruchomienie:**

```bash
# Terminal 1: Uruchom ngrok
yarn dev:tunnel
# Skopiuj wyświetlony URL (np. https://abc123.ngrok.io)

# Terminal 2: Uruchom test z NGROK_URL
NGROK_URL=https://abc123.ngrok.io yarn playwright test e2e/webhook-test.spec.ts
```

**Szczegóły:** [tech-playwright.md](tech-playwright.md) — E2E testing z webhookami

### Mobile Testing

**Problem:** Urządzenia mobilne nie mają dostępu do localhost API.

**Rozwiązanie:** Ngrok URL umożliwia dostęp do lokalnego API z urządzeń mobilnych.

```bash
yarn dev:tunnel
# Użyj wyświetlonego ngrok URL na urządzeniu mobilnym
```

### E2E Testing z Webhookami

**Problem:** E2E testy wymagają integracji z zewnętrznymi webhookami.

**Rozwiązanie:** Setup ngrok przed testami E2E, użycie `NGROK_URL` w testach.

```bash
# Terminal 1: Uruchom ngrok
yarn dev:tunnel

# Terminal 2: Uruchom E2E testy (użyj test:e2e:ui lub playwright test bezpośrednio)
yarn test:e2e:ui
# lub
yarn playwright test
```

## Troubleshooting

### Problem: "NGROK_AUTH_TOKEN not found"

**Przyczyna:** Brak tokenu w `.env.local` lub nieprawidłowa konfiguracja.

**Rozwiązanie:**

```bash
# Sprawdź czy token jest w .env.local
cat .env.local | grep NGROK_AUTH_TOKEN

# Sprawdź czy plik istnieje
ls -la .env.local

# Dodaj token jeśli brakuje
echo "NGROK_AUTH_TOKEN=your-token" >> .env.local
```

**Szczegóły:** [../3-environment/technical.md](../3-environment/technical.md#ngrok-tunneling-ngrok_auth_token)

### Problem: "Tunnel failed to start"

**Przyczyna:** Port 3000 zajęty lub serwer dev nie działa.

**Rozwiązanie:**

```bash
# Sprawdź czy port 3000 jest wolny
lsof -i :3000

# Sprawdź czy serwer dev działa
yarn dev

# Jeśli port zajęty, zatrzymaj proces lub użyj innego portu
```

### Problem: Authentication failed

**Przyczyna:** Nieprawidłowy lub wygasły token.

**Rozwiązanie:**

1. Sprawdź token w [ngrok dashboard](https://dashboard.ngrok.com/get-started/your-authtoken)
2. Pobierz nowy token jeśli wygasł
3. Zaktualizuj `.env.local`

### Debug Mode

```bash
# Uruchom ngrok z debugowaniem
DEBUG=ngrok* yarn ngrok
```

## Projektowe workflow

- **Używaj `dev:tunnel`** — automatyczna autentykacja i równoległe uruchamianie
- **Zamknij tunel po testach** — oszczędza bandwidth
- **Token w `.env.local`** — nie commitowany (`.gitignore`)

**Best practices ogólne:** Zobacz [oficjalną dokumentację ngrok](https://ngrok.com/docs).

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja external testing i test pyramid
- [`technical.md`](technical.md) — workflow testing i integracja narzędzi
- [`reference.md`](reference.md) — kompletna referencja konfiguracji i skryptów
- [`tech-playwright.md`](tech-playwright.md) — E2E testing z webhookami
- [`../1-getting-started/technical.md`](../1-getting-started/technical.md#ngrok-integration) — quick start z ngrok
- [`../3-environment/technical.md`](../3-environment/technical.md#ngrok-tunneling-ngrok_auth_token) — environment variables setup
- [`../3-environment/reference.md`](../3-environment/reference.md) — referencja environment variables
- [`../6-developer-experience/technical.md`](../6-developer-experience/technical.md) — ekosystem DX i external testing
- [`../6-developer-experience/overview.md`](../6-developer-experience/overview.md) — DX philosophy

## Oficjalna dokumentacja

- [ngrok Documentation](https://ngrok.com/docs) — oficjalna dokumentacja ngrok
- [Getting Started with Ngrok](https://ngrok.com/docs/getting-started/) — podstawy ngrok
- [ngrok Dashboard](https://dashboard.ngrok.com/) — zarządzanie tokenami i tunelami
