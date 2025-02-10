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
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/styles/*": ["./styles/*"],
      "@/app/*": ["./app/*"]
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
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    "**/*.mjs",
    "@types/**/*.d.ts",
    "jest.config.js",
    ".next/types/**/*.ts",
    "eslint.config.mjs",
    "*.config.ts",
    "*.config.js"
  ],
  "exclude": ["node_modules"]
}
