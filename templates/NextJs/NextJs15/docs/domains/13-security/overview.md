# Bezpieczeństwo Overview

> [!TIP] Źródło tematu: Bezpieczeństwo
> Kanoniczna definicja tematu "Bezpieczeństwo" - security by default, defense in depth, type-safe variables.
> Wystąpienia: [technical.md](technical.md), [reference.md](reference.md)

## Concept

Security w Next.js 15 Template opiera się na zasadzie "Security by Default" - podstawowe zabezpieczenia są wbudowane w konfigurację Next.js od samego początku.

### Core Principles

1. **Security by Default** - bezpieczne domyślne ustawienia Next.js
2. **Defense in Depth** - wielowarstwowa ochrona przez headers
3. **Least Information Disclosure** - minimalizacja ujawnianych informacji

## Problem

Aplikacje Next.js bez odpowiedniej konfiguracji security są narażone na różne ataki i wycieki informacji. Domyślne ustawienia Next.js nie zapewniają pełnej ochrony przed:

- **Clickjacking** - osadzanie strony w iframe i manipulowanie interakcjami użytkownika
- **MIME type sniffing** - przeglądarka próbuje odgadnąć typ pliku, co może prowadzić do wykonań niebezpiecznego kodu
- **Information leakage** - wyciek informacji o strukturze URL i ścieżkach aplikacji przez referrer headers
- **Mixed content** - mieszanie HTTP i HTTPS na stronie, co osłabia bezpieczeństwo
- **Exploit targeting** - ujawnianie informacji o stacku technologicznym (Next.js) ułatwia atakującym wybór odpowiednich exploitów
- **Code vulnerabilities** - brak automatycznego wykrywania potencjalnych problemów bezpieczeństwa w kodzie
- **Configuration errors** - błędy w konfiguracji zmiennych środowiskowych mogą prowadzić do wycieków danych

## Why?

Security jest fundamentem zaufania użytkowników i zgodności z regulacjami. Implementacja "Security by Default" zapewnia:

**Business Value:**

- Ochrona przed atakami i wyciekami danych
- Zgodność z regulacjami bezpieczeństwa (GDPR, OWASP)
- Zwiększenie zaufania użytkowników
- Zmniejszenie ryzyka biznesowego związanego z naruszeniami bezpieczeństwa

**Technical Benefits:**

- Wielowarstwowa ochrona (Defense in Depth) zwiększa odporność na różne typy ataków
- Automatyczne wykrywanie problemów bezpieczeństwa w kodzie przez ESLint
- Type-safe i walidowane zmienne środowiskowe zapobiegają błędom konfiguracji
- Wymuszenie HTTPS zapobiega downgrade attacks

**Integration with Other Domains:**

- **Environment Management** (domena 3) - walidacja zmiennych środowiskowych przez T3 Env + Zod
- **Code Quality** (domena 9) - ESLint security plugin wykrywa problemy bezpieczeństwa w kodzie
- **Performance** (domena 11) - security headers mogą wpływać na performance (np. DNS prefetching)
- **Deployment** (domena 15) - security headers są aplikowane w production build

## Solution

System security w projekcie składa się z sześciu głównych komponentów, które razem zapewniają kompleksową ochronę:

### 1. Security Headers

HTTP nagłówki konfigurowane w `next.config.ts` zapewniają podstawową ochronę przed różnymi atakami:

- **Clickjacking** - `X-Frame-Options: DENY` blokuje osadzanie w iframe
- **MIME type sniffing** - `X-Content-Type-Options: nosniff` wymusza użycie deklarowanego Content-Type
- **Information leakage** - `Referrer-Policy: strict-origin-when-cross-origin` minimalizuje wyciek informacji
- **HTTPS enforcement** - `Strict-Transport-Security` wymusza HTTPS na przyszłe żądania
- **Browser API restrictions** - `Permissions-Policy` kontroluje dostęp do wrażliwych API przeglądarki

Szczegóły: [`tech-security-headers.md`](tech-security-headers.md)

### 2. React Strict Mode

`reactStrictMode: true` w `next.config.ts` zapewnia:

- Wykrywanie problemów bezpieczeństwa w React
- Ostrzeżenia o niebezpiecznych wzorcach
- Lepsze error handling i error boundaries

### 3. Information Hiding

- `poweredByHeader: false` - ukrycie informacji o Next.js w nagłówkach HTTP, co utrudnia atakującym wybór odpowiednich exploitów

### 4. HTTPS Enforcement dla Obrazów

Konfiguracja `images.remotePatterns` wymusza HTTPS dla wszystkich zewnętrznych obrazów, zapobiegając mixed content (HTTP + HTTPS na tej samej stronie).

### 5. ESLint Security Plugin

`eslint-plugin-security` wykrywa potencjalne problemy bezpieczeństwa w kodzie:

- `security/detect-eval-with-expression` - wykrywa użycie `eval()` z dynamicznymi wyrażeniami
- `security/detect-no-csrf-before-method-override` - sprawdza kolejność CSRF protection
- `security/detect-possible-timing-attacks` - wykrywa potencjalne timing attacks
- `security/detect-non-literal-regexp` - wykrywa niebezpieczne regex z dynamicznymi wartościami

Szczegóły: [`../9-code-quality/`](../9-code-quality/)

### 6. Environment Variables Validation

T3 Env z Zod zapewnia type-safe i walidowane zmienne środowiskowe, zapobiegając błędom konfiguracji, które mogą prowadzić do wycieków danych.

Szczegóły: [`../3-environment/`](../3-environment/)

## Capabilities

System security można rozszerzyć i adaptować w następujący sposób:

**Dodatkowe Security Headers:**

- Content Security Policy (CSP) - kontrola zasobów ładowanych przez stronę
- Expect-CT - Certificate Transparency monitoring
- Public Key Pins - pinning certyfikatów (deprecated, ale można użyć dla starszych aplikacji)

**Zaawansowane ESLint Rules:**

- Dodanie więcej reguł z `eslint-plugin-security`
- Konfiguracja custom security rules dla projektu
- Integracja z SonarQube lub podobnymi narzędziami

**Dodatkowe Security Features:**

- Rate limiting dla API routes
- CSRF protection dla form submissions
- XSS protection przez sanitization
- SQL injection prevention (jeśli używana baza danych)
- Authentication i authorization middleware

**Security Monitoring:**

- Integracja z security monitoring tools (np. Sentry Security)
- Logging security events
- Alerting dla podejrzanych aktywności

Szczegóły implementacji: [`technical.md`](technical.md)

## Wystąpienia

- [`technical.md`](technical.md) — szczegóły implementacji security
- [`reference.md`](reference.md) — kompletna techniczna referencja security
- [`tech-security-headers.md`](tech-security-headers.md) — security headers setup
- [`../3-environment/`](../3-environment/) — environment variables validation
- [`../9-code-quality/`](../9-code-quality/) — ESLint security rules
