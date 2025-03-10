name: Check

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
  check:
    name: Check
    runs-on: ubuntu-latest
    timeout-minutes: 15

    env:
      FORCE_COLOR: true
      NODE_ENV: test

    steps:
      - name: '📝 Checkout'
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

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

      - name: '🔥 Smoke Tests (Storybook)'
        run: |
          yarn build-storybook --quiet
          yarn concurrently -k -s first -n "SB,TEST" -c "magenta,blue" \
            "yarn http-server storybook-static --port 6006 --silent" \
            "yarn wait-on tcp:127.0.0.1:6006 && yarn test:smoke"

      - name: '🔍 Lint check'
        run: yarn lint:check

      - name: '💅 Format check'
        run: yarn lint:prettier:check

      - name: '🧪 Unit & Integration tests'
        run: yarn test:unit
        env:
          CI: true
