---
globs: **/*.md
alwaysApply: false
---

# Documentation Formatting Guidelines

## List Numbering

Use numbered lists (1., 2., 3.) for main sections:

- Implementation steps
- Key concepts
- Process stages

## Link Format

Always add a description after a dash:

```markdown
[filename.md](filename.md) — brief link description
[../domain/](../domain/) — related context
```

## Code Block Formatting

### Command Blocks

```bash
# Command
yarn install
```

### Project File Links

**Simple references:**

```markdown
**Details:** See [package.json](../../../package.json)
```

**With code blocks and line numbers:** Link BEFORE code block + separate code block with language tag:

````markdown
[filename.ext](../../../filename.ext) linie 1-57

```js
const config = {
  // code content
};
```
````

**Format rules:**

- Link: `[filename.ext](../../../filename.ext) linie X-Y` (single: `linia X`) - OUTSIDE code block
- Code block: AFTER link, with language tag (` ```js`, ` ```json`, ` ```ts`), NO line numbers in opener
