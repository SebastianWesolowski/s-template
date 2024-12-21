{
  "name": "placeholder-repo-name",
  "version": "0.0.0-development",
  "description": "A template for creating npm packages using TypeScript",
  "main": "./lib/index.js",
  "files": [
    "lib/**/*",
    "CHANGELOG.md"
  ],
  "scripts": {
    "build": "run-s build:clean && tsc --project tsconfig.build.json",
    "build:clean": "rm -rf ./lib/",
    "build:prod": "run-s build && cpy 'src/index.json' 'lib' --parents",
    "build:package": "[ -d ./dist ] || mkdir ./dist && npm pack --pack-destination ./dist &&  tar -xvzf \"$(ls -t ./dist/*.tgz | head -n 1)\" -C ./dist/",
    "eslint:check": "eslint --no-error-on-unmatched-pattern './src/**/*.+(js|jsx|ts)'",
    "eslint:fix": "eslint --no-error-on-unmatched-pattern './src/**/*.+(js|jsx|ts)' --fix",
    "husky:commit-msg": "commitlint --edit $GIT_PARAMS",
    "husky:pre-commit": "lint-staged -c ./.husky/lint-staged.config.json",
    "husky:pre-push": "run-s lint:check test:check build:prod",
    "husky:prepare-commit-msg": "exec < /dev/tty && node_modules/.bin/git-cz --hook || true",
    "lint": "run-s lint:fix lint:check",
    "lint:check": "run-s prettier:check eslint:check typescript:check",
    "lint:fix": "run-s prettier:fix eslint:fix",
    "prettier:check": "prettier --check '**/*.{js,jsx,ts,json}'",
    "prettier:fix": "prettier --write '**/*.{js,jsx,ts,json}'",
    "staged:lint:check": "eslint",
    "staged:lint:fix": "eslint --fix",
    "staged:prettier:check": "prettier --check",
    "staged:prettier:fix": "prettier --write",
    "test:check": "jest --coverage",
    "test:watch": "jest --watch",
    "typescript:check": "tsc --noEmit",
    "cm": "cz",
    "prepare": "husky install",
    "prepack": "clean-package",
    "postpack": "clean-package restore"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/PLACEHOLDER_GITHUB_USER/PLACEHOLDER_REPO_NAME.git"
  },
  "license": "MIT",
  "author": {
    "name": "PLACEHOLDER_FULL_NAME",
    "email": "PLACEHOLDER_GITHUB_USER@users.noreply.github.com",
    "url": "https://github.com/PLACEHOLDER_GITHUB_USER"
  },
  "engines": {
    "node": ">=20.17.0"
  },
  "keywords": [
    "boilerplate",
    "template",
    "typescript",
    "vscode",
    "jest",
    "husky",
    "commitizen",
    "semantic-release",
    "codecov"
  ],
  "bugs": {
    "url": "https://github.com/PLACEHOLDER_GITHUB_USER/PLACEHOLDER_REPO_NAME/issues"
  },
  "homepage": "https://github.com/PLACEHOLDER_GITHUB_USER/PLACEHOLDER_REPO_NAME#readme",
  "devDependencies": {
    "@ryansonshine/commitizen": "^4.2.8",
    "@semantic-release/changelog": "^6.0.3",
    "@semantic-release/exec": "^6.0.3",
    "@semantic-release/git": "^10.0.1",
    "@types/jest": "^29.5.12",
    "@types/node": "^12.20.11",
    "@typescript-eslint/eslint-plugin": "^5.57.1",
    "@typescript-eslint/parser": "^5.54.1",
    "clean-package": "^2.2.0",
    "commitizen": "^4.3.0",
    "conventional-changelog-conventionalcommits": "^5.0.0",
    "cpy-cli": "^5.0.0",
    "cross-env": "^7.0.3",
    "dotenv-cli": "^7.3.0",
    "eslint": "8.50.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-import": "^2.27.5",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-prettier": "^3.4.0",
    "git-cz": "^4.9.0",
    "husky": "^6.0.0",
    "jest": "^29.7.0",
    "lint-staged": "^13.2.1",
    "npm-run-all": "^4.1.5",
    "prettier": "^3.2.5",
    "s-prettier": "^1.1.0",
    "semantic-release": "^21.0.1",
    "ts-jest": "29.2.5",
    "ts-node": "^10.2.1",
    "typescript": "5.2.2"
  },
  "config": {
    "commitizen": {
      "path": "git-cz"
    }
  }
}
