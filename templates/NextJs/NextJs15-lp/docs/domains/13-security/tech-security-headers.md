# Security Headers Configuration

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

Security headers to HTTP nagłówki konfigurowane w `next.config.ts`, które pomagają chronić aplikację przed różnymi atakami, takimi jak clickjacking, MIME type sniffing i inne.

## Implementacja w next.config.ts

Security headers są zdefiniowane jako tablica i aplikowane do wszystkich routes przez funkcję `headers()`:

```7:33:next.config.ts
// Security headers configuration
const securityHeaders = [
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];
```

```73:80:next.config.ts
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
```

## Szczegółowy Opis Headers

### 1. Referrer-Policy

**Wartość:** `strict-origin-when-cross-origin`

**Cel:** Kontrola jakich danych referrer są wysyłane z przeglądarki do serwera.

**Zachowanie:**

- Dla samego origin: wysyła pełny URL
- Dla cross-origin HTTPS: wysyła tylko origin (scheme + host)
- Dla cross-origin HTTP: nie wysyła nic

**Security benefit:** Minimalizacja wycieku informacji o ścieżkach URL.

### 2. X-Frame-Options

**Wartość:** `DENY`

**Cel:** Ochrona przed clickjacking - zapobiega osadzaniu strony w iframe.

**Opcje:**

- `DENY` - całkowicie blokuje osadzanie (obecna implementacja)
- `SAMEORIGIN` - pozwala tylko dla samego origin
- `ALLOW-FROM uri` - deprecated

**Security benefit:** Zapobiega atakom polegającym na osadzeniu strony w iframe i nakładaniu elementów UI.

### 3. X-Content-Type-Options

**Wartość:** `nosniff`

**Cel:** Zapobiega MIME type sniffing - przeglądarka nie będzie próbować odgadnąć typu pliku poza deklarowanym Content-Type.

**Security benefit:** Zapobiega atakom polegającym na uploadzie plików z niebezpiecznym typem MIME.

### 4. X-DNS-Prefetch-Control

**Wartość:** `on`

**Cel:** Zezwala na DNS prefetching dla optymalizacji performance.

**Security consideration:** Prefetching może ujawniać informacje o domenach, ale w kontrolowany sposób.

### 5. Strict-Transport-Security (HSTS)

**Wartość:** `max-age=31536000; includeSubDomains`

**Cel:** Wymuszenie HTTPS na wszystkie przyszłe żądania do domeny.

**Parametry:**

- `max-age=31536000` - czas w sekundach (1 rok = 31,536,000 sekund)
- `includeSubDomains` - dotyczy również wszystkich subdomen

**Uwaga:** HSTS działa tylko dla HTTPS. W development (HTTP) header nie ma efektu.

**Security benefit:** Zapobiega downgrade attacks i wymusza szyfrowanie.

### 6. Permissions-Policy

**Wartość:** `camera=(), microphone=(), geolocation=()`

**Cel:** Kontrola dostępu do API przeglądarki.

**Składnia:**

- `camera=()` - całkowicie wyłącza dostęp do kamery
- `microphone=()` - całkowicie wyłącza dostęp do mikrofonu
- `geolocation=()` - całkowicie wyłącza dostęp do geolokalizacji

**Security benefit:** Zapobiega nieautoryzowanemu dostępowi do wrażliwych API przeglądarki.

## Ukrycie X-Powered-By

```55:55:next.config.ts
  poweredByHeader: false,
```

**Cel:** Ukrycie informacji o technologii (Next.js) w nagłówkach HTTP.

**Security benefit:** Minimalizacja ujawniania informacji o stacku technologicznym, co utrudnia atakującym wybór odpowiednich exploitów.

## Weryfikacja Headers

Aby sprawdzić, czy headers są poprawnie ustawione:

1. Otwórz DevTools w przeglądarce
2. Przejdź do zakładki Network
3. Załaduj stronę
4. Sprawdź nagłówki odpowiedzi w zakładce Headers

**Spodziewane headers:**

- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-DNS-Prefetch-Control: on`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja security headers
- [`technical.md`](technical.md) — ogólna implementacja security
- [`next.config.ts`](../../../next.config.ts) — Next.js security config (reference)
