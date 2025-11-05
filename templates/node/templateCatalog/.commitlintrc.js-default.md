/** @type {import('cz-git').UserConfig} */
const pkg = require('./package.json');
const issueTag = pkg.config?.issueTag || 'SC';

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['breaking', 'chore', 'ci', 'clean', 'config', 'docs', 'feat', 'fix', 'refactor', 'release', 'test'],
    ],
    'header-max-length': [2, 'always', 128],
    'header-min-length': [2, 'always', 3],
  },
  prompt: {
    alias: { fd: 'docs: fix typos' },
    messages: {
      type: "Select the type of change that you're committing:",
      subject: 'Write a short, imperative mood description of the change:\n',
      breaking: 'List any breaking changes:\n',
      footer: 'Write issue number, ' + issueTag + ' prefix will be added automatically:\n',
      confirmCommit: 'Are you sure you want to proceed with the commit above?',
    },
    types: [
      { value: 'feat', name: 'feat:     ✨ A new feature', emoji: '✨' },
      { value: 'fix', name: 'fix:      🐛 A bug fix', emoji: '🐛' },
      { value: 'docs', name: 'docs:     📚️ Documentation only changes', emoji: '📚️' },
      { value: 'style', name: 'style:    💄 Changes that do not affect the meaning of the code', emoji: '💄' },
      {
        value: 'refactor',
        name: 'refactor: ♻️ A code change that neither fixes a bug nor adds a feature',
        emoji: '♻️',
      },
      { value: 'perf', name: 'perf:     ⚡ A code change that improves performance', emoji: '⚡' },
      {
        value: 'test',
        name: 'test:     🚨 Adding missing tests or correcting existing tests',
        emoji: '🚨',
      },
      {
        value: 'build',
        name: 'build:    📦 Changes that affect the build system or external dependencies',
        emoji: '📦',
      },
      { value: 'ci', name: 'ci:       🎡 Changes to our CI configuration files and scripts', emoji: '🎡' },
      { value: 'chore', name: "chore:    🔧 Other changes that don't modify src or test files", emoji: '🔧' },
      { value: 'revert', name: 'revert:   ⏪ Reverts a previous commit', emoji: '⏪' },
    ],
    useEmoji: true,
    emojiAlign: 'center',
    useAI: false,
    aiNumber: 1,
    themeColorCode: '',
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: ['scope', 'customScope', 'body', 'breaking', 'footerPrefix'],
    customIssuePrefixAlign: 'bottom',
    emptyIssuePrefixAlias: 'skip',
    customIssuePrefixAlias: 'custom',
    allowCustomIssuePrefix: false,
    allowEmptyIssuePrefix: true,
    confirmColorize: true,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: '',
    formatMessageCB: ({ defaultMessage, footer }) => {
      if (!footer) {
        return defaultMessage;
      } else {
        const lines = defaultMessage.split('\n');
        lines.pop();
        return lines.join('\n') + '\n' + issueTag + '-' + footer.replace(/\s/g, '');
      }
    },
  },
};
