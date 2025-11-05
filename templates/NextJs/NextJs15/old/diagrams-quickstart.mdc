---
description: 13 typów diagramów Mermaid z perspektywą Full-Stack - szybki dostęp do przykładów
globs:
alwaysApply: false
---

# Mermaid Diagrams - Quick Start (Full-Stack)

## 1. Graph (Flowchart) – Podstawowy przepływ

**Kiedy używać:**
Używaj do przedstawienia prostego przepływu danych lub komunikacji między elementami systemu — np. pokazania, jak klient wysyła żądanie do API, a to komunikuje się z bazą danych. Idealny do szybkiego szkicowania architektury wysokiego poziomu w projektach Full-Stack.

```mermaid
graph TD
    A[Klient] --> B[API]
    B --> C{Baza Danych}
    C -->|Success| D[Response]
    C -->|Error| E[Error Handler]
    D --> A
    E --> A
```

---

## 2. Sequence Diagram – Sekwencja logowania

**Kiedy używać:**
Stosuj, gdy istotna jest kolejność interakcji między usługami lub komponentami — np. proces logowania, płatności czy komunikacja mikroserwisów. Doskonały do obrazowania przepływu żądań w czasie w architekturze Full-Stack.

```mermaid
sequenceDiagram
    participant Klient
    participant Serwer
    participant BazaDanych
    Klient->>Serwer: POST /login
    Serwer->>BazaDanych: SELECT user
    BazaDanych-->>Serwer: Dane użytkownika
    Serwer-->>Klient: JWT Token
```

---

## 3. ER Diagram – Relacje w bazie danych

**Kiedy używać:**
Używaj do projektowania i omawiania struktury relacyjnej bazy danych — np. tabele użytkowników i postów. Pomaga w wizualizacji relacji 1-N, N-M i kluczy obcych w projektach Full-Stack z bazami SQL.

```mermaid
erDiagram
    USERS {
        int id PK
        string name
        string email
        datetime created_at
    }
    POSTS {
        int id PK
        string title
        text content
        int userId FK
        datetime created_at
    }
    USERS ||--o{ POSTS : "pisze"
```

---

## 4. Class Diagram – Struktura klas w NestJS

**Kiedy używać:**
Stosuj do pokazania struktury i zależności między klasami lub modułami w aplikacjach typu NestJS / OOP. Pozwala zobaczyć powiązania między kontrolerami, serwisami i modelami domenowymi.

```mermaid
classDiagram
    class UserController {
        +createUser()
        +getUser()
        +updateUser()
    }
    class UserService {
        +create()
        +findById()
        +update()
    }
    class UserEntity {
        +id: number
        +name: string
        +email: string
    }
    UserController --> UserService
    UserService --> UserEntity
```

---

## 5. State Diagram – Cykl życia zamówienia

**Kiedy używać:**
Idealny do przedstawienia, jak obiekty lub procesy zmieniają stany w czasie — np. cykl życia zamówienia od szkicu do zakończenia. Przydatny w logice biznesowej systemów e-commerce.

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Paid
    Paid --> Shipped
    Shipped --> Delivered
    Delivered --> [*]

    Draft --> Cancelled
    Paid --> Refunded
    Shipped --> Returned
```

---

## 6. Gantt Chart – Harmonogram sprintu

**Kiedy używać:**
Używaj do planowania zadań w czasie, pokazywania harmonogramu sprintów i zależności między etapami projektu Full-Stack. Doskonały do wizualizacji roadmapy zespołu developerskiego.

```mermaid
gantt
    title Plan Sprintu Q1 2025
    dateFormat  YYYY-MM-DD
    section Backend
    API Development    :done,    api1, 2025-01-01, 2025-01-15
    Database Design    :active,  db1, 2025-01-10, 2025-01-20
    section Frontend
    UI Components      :         ui1, 2025-01-15, 2025-01-25
    Integration        :         int1, after api1, 5d
```

---

## 7. Pie Chart – Wykres przychodów SaaS

**Kiedy używać:**
Do pokazania procentowego udziału elementów w całości — np. struktury przychodów, podziału planów abonamentowych czy udziału użytkowników w planach. Idealny do dashboardów analitycznych.

```mermaid
pie title Przychody SaaS Q4 2024
    "Plan Basic" : 45
    "Plan Pro" : 35
    "Plan Enterprise" : 20
```

---

## 8. Mindmap – Struktura funkcjonalności

**Kiedy używać:**
Stosuj do planowania funkcji, burzy mózgów i rozbijania epików na mniejsze zadania. Ułatwia wizualizację hierarchii funkcjonalności lub modułów w aplikacji.

```mermaid
mindmap
  root((Profil Użytkownika))
    - Edycja Danych
      - Podstawowe info
      - Zdjęcie profilowe
      - Preferencje
    - Historia Zamówień
      - Aktywne
      - Zakończone
      - Zwroty
    - Ustawienia
      - Bezpieczeństwo
      - Powiadomienia
```

---

## 9. C4 Diagram – Kontekst systemu

**Kiedy używać:**
Do formalnego, wielopoziomowego dokumentowania architektury — od kontekstu po komponenty. Szczególnie przydatny w dużych systemach Full-Stack, by jasno pokazać, kto i jak korzysta z aplikacji.

```mermaid
c4Context
    title System Context for E-commerce Platform
    Person(customer, "Klient", "Kupuje produkty online")
    Person(admin, "Administrator", "Zarządza sklepem")
    System(ecommerce, "Platforma E-commerce", "Sklep internetowy z API")
    System_Ext(payment, "System Płatności", "Przetwarzanie płatności")
    System_Ext(warehouse, "Magazyn", "Zarządzanie zapasami")

    customer -- "Kupuje" --> ecommerce
    admin -- "Zarządza" --> ecommerce
    ecommerce -- "Przetwarza płatności" --> payment
    ecommerce -- "Sprawdza dostępność" --> warehouse
```

---

## 10. Block Diagram – Architektura wysokiego poziomu

**Kiedy używać:**
Użyteczny do przedstawienia nowoczesnej architektury systemowej — np. przepływu między klientem, serwerem i bazą w architekturze mikroserwisowej lub chmurowej.

```mermaid
block-beta
    A["Frontend<br/>(React/Next.js)"]
    B["API Gateway<br/>(Load Balancer)"]
    C["Microservices<br/>(Node.js/NestJS)"]
    D["Database<br/>(PostgreSQL)"]
    E["Cache<br/>(Redis)"]

    A -- "HTTP/HTTPS" --> B
    B -- "REST/GraphQL" --> C
    C -- "SQL" --> D
    C -- "Key-Value" --> E
```

---

## 11. Git Graph – Historia repozytorium

**Kiedy używać:**
Do wizualizacji historii Git — branchy, merge'y i strategii rozwoju (np. Git Flow). Pomaga w edukacji nowych członków zespołu i dokumentacji procesu CI/CD.

```mermaid
gitGraph
   commit id: "Initial commit"
   branch feature/user-auth
   checkout feature/user-auth
   commit id: "feat: add login"
   commit id: "feat: add register"
   checkout main
   merge feature/user-auth
   commit id: "chore: release v1.0.0"
   branch feature/payment
   checkout feature/payment
   commit id: "feat: add payment"
```

---

## 12. User Journey – Podróż użytkownika

**Kiedy używać:**
Do mapowania całej ścieżki użytkownika — od rejestracji po zakup. Świetny do UX-owego spojrzenia na produkt Full-Stack i planowania punktów styku użytkownika z systemem.

```mermaid
journey
    title Podróż Klienta E-commerce
    section Rejestracja
      Nowy użytkownik trafia na stronę: 5: Użytkownik
      Przegląda produkty: 4: Użytkownik
      Rejestruje konto: 3: Użytkownik
    section Zakup
      Dodaje do koszyka: 5: Użytkownik
      Przechodzi do checkout: 4: Użytkownik
      Dokonuje płatności: 3: Użytkownik
      Otrzymuje potwierdzenie: 5: System
```

---

## 13. Timeline – Oś czasu projektu

**Kiedy używać:**
Do przedstawienia chronologii zdarzeń — np. roadmapy produktu, etapów wdrożenia czy historii aktualizacji. Pozwala łatwo komunikować postęp projektu Full-Stack.

```mermaid
timeline
    title Roadmapa E-commerce Platform Q1-Q2 2025
    2025-01-01 : Start Development
    2025-01-15 : MVP Backend API
    2025-02-01 : Frontend Integration
    2025-02-15 : Payment Integration
    2025-03-01 : Testing Phase
    2025-03-15 : Beta Release
    2025-04-01 : Production Launch
```

---

## Szybki wybór diagramu

| Chcesz pokazać...   | Użyj diagramu... | Przykład              |
| ------------------- | ---------------- | --------------------- |
| Przepływ danych     | Graph/Flowchart  | Klient → API → DB     |
| Interakcje w czasie | Sequence Diagram | Logowanie użytkownika |
| Strukturę bazy      | ER Diagram       | Tabele users/posts    |
| Architekturę klas   | Class Diagram    | NestJS controllers    |
| Zmiany stanów       | State Diagram    | Cykl życia zamówienia |
| Harmonogram         | Gantt Chart      | Plan sprintu          |
| Procenty/udziały    | Pie Chart        | Przychody SaaS        |
| Planowanie          | Mindmap          | Struktura funkcji     |
| Kontekst systemu    | C4 Diagram       | E-commerce platform   |
| Architekturę        | Block Diagram    | Mikroserwisy          |
| Historię Git        | Git Graph        | Branch strategy       |
| UX flow             | User Journey     | Podróż klienta        |
| Chronologię         | Timeline         | Roadmapa projektu     |
