{
  "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix", "jest --bail --findRelatedTests"],
  "*.{json,css,md,yml}": ["prettier --write"],
  "*.{css,scss,sass}": ["stylelint --fix"]
}
