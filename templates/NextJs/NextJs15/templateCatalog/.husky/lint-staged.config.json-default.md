{
  "src/**/*.{js,jsx,ts,tsx}": [
    "prettier --write",
    "eslint --fix --config eslint.config.mjs",
    "jest --bail --findRelatedTests --passWithNoTests"
  ],
  "src/**/*.{json,md,yml}": ["prettier --write"],
  "src/**/*.{css,scss,sass}": ["stylelint --fix"]
}
