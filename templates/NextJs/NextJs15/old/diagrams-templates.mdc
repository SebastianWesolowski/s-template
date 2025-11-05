---
description: Templates, snippets i real examples z projektu - copy-paste ready kod Mermaid
globs:
alwaysApply: false
---

# Mermaid Diagrams - Templates & Examples

## Templates & Snippets

### Component Architecture Template

```mermaid
classDiagram
    class ComponentName {
        +props: PropsType
        +state: StateType
        +render(): JSX.Element
        +handleEvent(): void
    }
    class ParentComponent {
        +children: ReactNode
        +render(): JSX.Element
    }
    class Service {
        +method(): ReturnType
        +property: PropertyType
    }

    ParentComponent --> ComponentName
    ComponentName --> Service
```

### Build Process Template

```mermaid
stateDiagram-v2
    [*] --> Prebuild
    Prebuild --> Clean
    Prebuild --> CopyAssets
    Clean --> NextBuild
    CopyAssets --> NextBuild
    NextBuild --> Postbuild
    Postbuild --> [*]

    NextBuild --> [*] : Build Error
    Postbuild --> [*] : Postbuild Error
```

### API Interaction Template

```mermaid
sequenceDiagram
    participant C as Client
    participant S as Server
    participant D as Database
    participant E as External API

    C->>S: Request
    S->>D: Query
    D-->>S: Data
    S->>E: External Call
    E-->>S: Response
    S-->>C: Final Response
```

### Project Timeline Template

```mermaid
gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Phase 1
    Task 1    :done,    task1, 2024-01-01, 2024-01-15
    section Phase 2
    Task 2    :active,  task2, 2024-01-16, 2024-02-15
    Task 3    :         task3, 2024-02-16, 2024-02-28
```

## Real Project Examples

### Example 1: Git Workflow (docs/LinearGitHubWorkflow.md)

```mermaid
gitGraph
   commit id: "feat: ✨ [SC-123] init"
   branch feature/SC-123
   checkout feature/SC-123
   commit id: "feat: ✨ [SC-123] implement"
   commit id: "test: 🚨 [SC-123] add tests"
   checkout main
   merge feature/SC-123 tag: "v1.2.0"
   commit id: "chore: 🔧 release"
```

### Example 2: Build Process (techContext.md)

```mermaid
stateDiagram-v2
    [*] --> Prebuild
    Prebuild --> Clean
    Prebuild --> CopyAssets
    Clean --> NextBuild
    CopyAssets --> NextBuild
    NextBuild --> Postbuild
    Postbuild --> Sitemap
    Sitemap --> [*]

    NextBuild --> [*] : Build Error
    Postbuild --> [*] : Sitemap Error
```

### Example 3: Component Architecture (systemPatterns.md)

```mermaid
classDiagram
    class AppLayout {
        +children: ReactNode
        +render(): JSX.Element
    }
    class ThemeProvider {
        +theme: Theme
        +toggleTheme(): void
        +setTheme(theme: Theme): void
    }
    class Analytics {
        +track(event: string): void
        +pageview(): void
    }
    class BasicLayout {
        +header: ReactNode
        +main: ReactNode
        +footer: ReactNode
    }

    AppLayout --> ThemeProvider
    AppLayout --> Analytics
    AppLayout --> BasicLayout
```

### Example 4: User Journey (productContext.md)

```mermaid
journey
    title Developer Onboarding Journey
    section Discovery
      Find template: 5: Developer
      Read documentation: 4: Developer
      Check examples: 5: Developer
    section Setup
      Clone repository: 5: Developer
      Install dependencies: 4: Developer
      Run customize: 3: Developer
    section Development
      Start dev server: 5: Developer
      Create component: 4: Developer
      Write tests: 3: Developer
      Deploy: 4: Developer
```

### Example 5: Technology Stack (techContext.md)

```mermaid
pie title Technology Distribution
    "Next.js 15" : 25
    "React 19" : 20
    "TypeScript" : 15
    "Tailwind CSS" : 15
    "Testing Tools" : 10
    "Build Tools" : 10
    "Other" : 5
```

## Copy-Paste Ready Snippets

### Quick Flowchart

```mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E
```

### Quick Sequence

```mermaid
sequenceDiagram
    participant A as Actor
    participant S as System
    A->>S: Request
    S-->>A: Response
```

### Quick ER Diagram

```mermaid
erDiagram
    ENTITY1 {
        int id PK
        string name
    }
    ENTITY2 {
        int id PK
        string title
        int entity1Id FK
    }
    ENTITY1 ||--o{ ENTITY2 : "relationship"
```

### Quick State Diagram

```mermaid
stateDiagram-v2
    [*] --> State1
    State1 --> State2
    State2 --> [*]
```

### Quick Gantt Chart

```mermaid
gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Section 1
    Task 1    :task1, 2024-01-01, 2024-01-15
    Task 2    :task2, after task1, 5d
```

### Quick Pie Chart

```mermaid
pie title Title
    "Label 1" : 40
    "Label 2" : 30
    "Label 3" : 20
    "Label 4" : 10
```

### Quick Mindmap

```mermaid
mindmap
  root((Root))
    - Branch 1
      - Leaf 1
      - Leaf 2
    - Branch 2
      - Leaf 3
```

### Quick C4 Context

```mermaid
c4Context
    title System Context
    Person(user, "User", "Uses the system")
    System(system, "System", "Main system")
    user -- "Uses" --> system
```

### Quick Block Diagram

```mermaid
block-beta
    A["Component A"]
    B["Component B"]
    C["Component C"]
    A -- "Connects to" --> B
    B -- "Uses" --> C
```

### Quick Git Graph

```mermaid
gitGraph
   commit id: "Initial"
   branch feature
   checkout feature
   commit id: "Feature"
   checkout main
   merge feature
```

### Quick User Journey

```mermaid
journey
    title User Journey
    section Section 1
      Action 1: 5: User
      Action 2: 4: User
    section Section 2
      Action 3: 3: User
```

### Quick Timeline

```mermaid
timeline
    title Timeline
    2024-01-01 : Event 1
    2024-02-01 : Event 2
    2024-03-01 : Event 3
```

## Customization Tips

### 1. Styling

- Używaj `%%{init: {'theme':'dark'}}%%` dla dark theme
- Dodaj `%%{init: {'themeVariables': {'primaryColor': '#ff0000'}}}%%` dla custom colors

### 2. Layout

- `graph TD` - top down
- `graph LR` - left right
- `graph TB` - top bottom
- `graph BT` - bottom top

### 3. Shapes

- `[Rectangle]` - prostokąt
- `(Round)` - okrągły
- `{Diamond}` - diament
- `((Circle))` - koło

### 4. Arrows

- `-->` - strzałka
- `-.->` - przerywana
- `==>` - gruba
- `--o` - z kółkiem
- `--x` - z X

### 5. Labels

- `A -->|label| B` - etykieta na strzałce
- `A --> B : label` - etykieta po dwukropku

## Common Patterns

### Decision Tree

```mermaid
flowchart TD
    A[Start] --> B{Question?}
    B -->|Yes| C[Path A]
    B -->|No| D[Path B]
    C --> E[End A]
    D --> F[End B]
```

### Process Flow

```mermaid
flowchart LR
    A[Step 1] --> B[Step 2]
    B --> C[Step 3]
    C --> D[Step 4]
    D --> E[Complete]
```

### Data Flow

```mermaid
flowchart TD
    A[Input] --> B[Process]
    B --> C[Validate]
    C -->|Valid| D[Output]
    C -->|Invalid| E[Error]
    E --> B
```

### System Architecture

```mermaid
flowchart TB
    subgraph "Frontend"
        A[React App]
        B[Components]
    end
    subgraph "Backend"
        C[API Server]
        D[Database]
    end
    A --> C
    C --> D
```
