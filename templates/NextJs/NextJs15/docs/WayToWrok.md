# How to Work with Template

This document provides detailed instructions on how to work with this template. For a quick start guide, see the [README.md](../README.md).

## Table of Contents

- [Development and Setup](#-development-and-setup)
  - [Installation](#install-the-dependencies)
  - [Update Manager](#run-the-update-with-s-update-manager)
  - [Repository Customization](#set-up-your-repository)
  - [Running Development Server](#run-the-development-server)
- [Optional Features](#optional)
  - [Ngrok Integration](#add-ngrok-token-in-env-file-for-local-development)
  - [Local Preview](#check-local-preview-package)
- [Deployment Workflow](#deployment-workflow)
  - [Pre-release](#pre-release)
  - [Pre-production](#pre-production)
  - [Release](#release)

## 🎯 Development and Setup

To get started with this boilerplate, follow these steps:

1. Install the dependencies:

```bash
yarn install
```

2. Run the update with s-update-manager:

```bash
yarn s-update-manager
```

3. Set up your repository

Replace variables in the `./tools/customize/customize.config.ts` script with your own details to personalize your new package:

```bash
export const config: CustomizeConfig = {
  replacements: [
    {
      placeholder: "{{PLACEHOLDER_FULL_NAME_EXAMPLE}}",
      value: "Sebastian Wesolowski",
      files: [
        "package.json",
        "README.md",
        "./docs/HowToAutoDeploy.md",
        ".github/FUNDING.yml",
      ],
    },
    {
      placeholder: "{{PLACEHOLDER_PAGE_AUTHOR_EXAMPLE}}",
      value: "www.wesolowski.dev",
      files: [".github/FUNDING.yml", "package.json", "LICENSE"],
    },
    ...
```

You can look at an example in `./tools/customize/customize.example.config.ts`

Run script with:

```bash
yarn customize
```

or

```bash
tsx tools/customize/customize.ts
```

4. Optional

- 4.1. Add ngrok token in .env file for local development

  ```bash
   NGROK_AUTH_TOKEN=your_ngrok_token
  ```

  After that, you can run ngrok to expose your local server to the internet:

  ```bash
    yarn dev:tunnel
  ```

  [![ngrok](./.github/assets/ngrok.png)](https://dashboard.ngrok.com/get-started/setup/macos)

5. Run the development server:

```bash
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

7. Check local preview package

Just use `yarn dev:build` and look at the build version on local environment.

## Deployment Workflow

### Pre-release

Pre-release is prepared from feature and dev branches.

- **Source:** Pre-release is prepared from `feature/*` branches or the `dev` branch
- **Trigger:** Each commit to these branches automatically triggers the deployment process
- **Environment:** Versioned link (e.g., `https://feature-name-v1.2.3.domain.com`)
- **Purpose:** Allows testing and verification of new functionalities before incorporating them into the main release
- **Note:** Each version is identifiable by a unique URL containing the feature name and version number

### Pre-production

Pre-production should be created with a pull request to the main branch.

- **Source:** Created via pull request to the `main` branch
- **Trigger:** Pull request automatically generates a test environment
- **Environment:** Defined domain (e.g., `https://pre-prod.domain.com`)
- **Purpose:** Final verification before production release
- **Note:** Allows QA team and other stakeholders to test the complete application in a production-like environment

### Release

Release is created on the main branch and prepared by GitHub Actions.

- **Source:** Each commit on the `main` branch
- **Trigger:** Automatic deployment through GitHub Actions
- **Environment:** Production (e.g., `https://domain.com`)
- **Purpose:** Delivery of the final version of the application to end users
- **Note:** Every commit to the main branch is treated as production-ready and automatically deployed

## Deployment Flow Diagram

feature/* or dev branch ──> Pre-release ──> Pull Request ──> Pre-production ──> Merge to main ──> Release
(versioned URL) (fixed pre-prod URL) (production)

## Benefits of This Approach

1. **Change Isolation:** Each feature is tested separately before merging with the main codebase
2. **Versioning:** Easy identification of test versions through unique URLs
3. **Automation:** The entire deployment process is automated
4. **Quality Control:** Multi-stage process ensures thorough testing before production deployment
5. **Quick Response:** Ability to quickly deploy critical fixes through direct commits to main (hotfixes)

## Notes for the Development Team

- Always create new features in dedicated `feature/*` branches
- Ensure your code passes all tests before creating a pull request
- Monitor deployment statuses in the GitHub Actions panel
- After completing pre-release testing, create a pull request to main to initiate the pre-production process
