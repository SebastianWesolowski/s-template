# Reusable workflow for PRs; to eject, you can replace this file with
# https://github.com/{{PLACEHOLDER_GITHUB_USER}}/{{PLACEHOLDER_GITHUB_USER}}/blob/main/.github/workflows/pr.yml
name: Pull Request

on: [pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: '📥 Read Node.js version'
        run: echo "node_version=$(cat .github/nodejs.version)" >> $GITHUB_ENV

      - name: '🟢 Setup Node.js ${{ env.node_version }}'
        uses: actions/setup-node@v4
        with:
          node-version: '${{ env.node_version }}'
          cache: 'yarn'

      - name: '📦 Install dependencies'
        run: yarn install --frozen-lockfile --ignore-scripts

      - name: '🔍 Lint'
        run: yarn lint:check

      - name: '🏗️ Build'
        run: yarn build:prod --if-present

      - name: '🧪 Test'
        run: yarn test:unit
