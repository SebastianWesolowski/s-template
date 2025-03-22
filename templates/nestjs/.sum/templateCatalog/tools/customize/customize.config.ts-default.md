import { CustomizeConfig } from './type';

export const config: CustomizeConfig = {
  replacements: [
    {
      placeholder: '{{PLACEHOLDER_FULL_NAME}}',
      value: 'Sebastian Wesolowski',
      files: ['package.json', 'README.md', './docs/HowToAutoDeploy.md', '.github/FUNDING.yml'],
    },
    {
      placeholder: '{{PLACEHOLDER_PAGE_AUTHOR}}',
      value: 'www.wesolowski.dev',
      files: ['.github/FUNDING.yml', 'package.json', 'LICENSE'],
    },
    {
      placeholder: '{{PLACEHOLDER_GITHUB_USER}}',
      value: 'SebastianWesolowski',
      files: ['package.json', 'README.md', './docs/HowToAutoDeploy.md', '.github/FUNDING.yml'],
    },
    {
      placeholder: '{{PLACEHOLDER_NODE_VERSION}}',
      value: '20.17.0',
      files: ['package.json', '.nvmrc'],
    },
    {
      placeholder: '>=0.0.0',
      value: '>=20.17.0',
      files: ['package.json'],
    },
    {
      placeholder: 'placeholder-repo-name',
      value: 's-postgres',
      files: ['package.json'],
    },
    {
      placeholder: '{{PLACEHOLDER_REPO_NAME}}',
      value: 's-postgres',
      files: ['package.json', 'tools/addDependency.js', 'README.md', './docs/HowToAutoDeploy.md'],
    },
    {
      placeholder: '{{PLACEHOLDER_NPM_USER}}',
      value: 'sebastian.wesolowski.sw',
      files: ['README.md', './docs/HowToAutoDeploy.md'],
    },
  ],
  cleanupExtensions: ['.mybak'],
};
