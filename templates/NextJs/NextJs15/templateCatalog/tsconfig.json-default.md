{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Next.js",
  "compilerOptions": {
    "target": "es2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "types": ["node", "jest", "@testing-library/jest-dom"],
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["src/components/*"],
      "@/lib/*": ["src/lib/*"],
      "@/styles/*": ["src/styles/*"],
      "@/utils/*": ["src/utils/*"],
      "@/app/*": ["src/app/*"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ],
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "verbatimModuleSyntax": true,
    "experimentalDecorators": true,
    "tsBuildInfoFile": "./tsconfig.tsbuildinfo"
  },
  "include": ["next-env.d.ts", "@types", "src/**/*.ts", "src/**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules/**"]
}
