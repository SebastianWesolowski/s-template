name: Playwright Tests
on:
  push:
    branches: [main, master, develop]
    paths-ignore:
      - '**.md'
      - 'docs/**'
  pull_request:
    paths-ignore:
      - '**.md'
      - 'docs/**'
  workflow_dispatch:

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest

    env:
      FORCE_COLOR: true
      NODE_ENV: test

    steps:
      - name: '📝 Checkout'
        uses: actions/checkout@v4

      - name: '📥 Read Node.js version'
        run: echo "node_version=$(cat .github/nodejs.version)" >> $GITHUB_ENV

      - name: '🟢 Setup Node.js ${{ env.node_version }}'
        uses: actions/setup-node@v4
        with:
          node-version: '${{ env.node_version }}'
          cache: 'yarn'

      - name: '📦 Install dependencies'
        run: |
          yarn config set network-timeout 300000
          yarn install --frozen-lockfile

      - name: '🎭 Install Playwright'
        run: yarn playwright:install

      - name: '🤖 Run Playwright tests (headless)'
        run: yarn test:e2e

      - name: '📊 Upload test results'
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
