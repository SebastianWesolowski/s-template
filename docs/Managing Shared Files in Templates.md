# **📖 Documentation: Managing Shared Files in Templates**

## **1. Directory Structure**

```sh
repository/
 ├── shared/                  # Directory for shared elements
 │   ├── github-actions/      # Example of a shared configuration directory
 │   ├── eslint/              # Example files for ESLint
 │   ├── prettier/            # Example files for Prettier
 ├── templates/               # Directory for templates
 │   ├── NextJs/              # Example template
 │   ├── node/                # Another template
 │   ├── startedNpmPackage/   # Another template
 ├── scripts/                 # Scripts for managing synchronization
 │   ├── initShared.ts        # Creates directories and default configuration
 │   ├── syncShared.ts        # Copies shared files to the respective templates
 ├── sync-config.yaml         # Configuration file specifying which files are copied to which templates
 ├── package.json             # npm configuration and scripts
 ├── tsconfig.json            # TypeScript configuration
```

## **2. Configuration Formats**

The `sync-config.yaml` supports two configuration formats depending on your needs:

### **Simple Format**

Use this when you want to copy an entire directory or file without special handling:

```yaml
tools:
  - NextJs/NextJs15
  - node

github-actions:
  - NextJs/NextJs15
  - startetNpmPackage/node
```

### **Advanced Format**

Use this when you need more control over the synchronization:

```yaml
.husky:
  projects:
    - NextJs/NextJs15
    - node
  excludeFiles:
    - lint-staged-with-style.config.json
    - lint-staged.config.json

.husky/lint-staged.config.json:
  projects:
    - node

.husky/lint-staged-with-style.config.json:
  projects:
    - NextJs/NextJs15
  asName: lint-staged.config.json
```

### **Configuration Options:**

- `projects`: List of target templates
- `excludeFiles`: (optional) Files to skip during synchronization
- `asName`: (optional) Alternative name for the destination file
- `copyToRoot`: (optional) Copy contents to template root directory
- `protectFromOverwrite`: (optional) Protect this path from being overwritten by more specific rules

## **3. Processing Order**

Rules in `sync-config.yaml` are processed **in the order they appear in the file**:

- **Order matters**: Rules are processed top-to-bottom as written in YAML
- **General rules first**: Place general rules (fewer path segments) before specific rules
- **Specific rules later**: Specific rules (more path segments) can overwrite files from general rules

**Important**: You must manually ensure the correct order in the YAML file.

**Example:**
```yaml
# ✅ CORRECT ORDER - general before specific
docs/[web]:              # Processed first
  projects: [...]

docs/[web]/domains-lp:   # Processed second, can overwrite docs/[web] files
  projects: [...]
```

**⚠️ Warning**: If you place specific rules before general rules, the overwriting behavior may not work as expected.

## **4. Overwriting Behavior**

By default, specific rules overwrite files from general rules. You can control this behavior:

### **Default Behavior**
- Specific rules automatically overwrite files from general rules
- Files are copied with `overwrite: true`, so existing files are replaced

### **Protect from Overwrite**
Use `protectFromOverwrite: true` in a general rule to prevent specific rules from overwriting:

```yaml
docs/[web]:
  projects:
    - NextJs/NextJs15
    - NextJs/NextJs15-lp
  protectFromOverwrite: true  # Blocks overwriting by docs/[web]/domains-lp

docs/[web]/domains-lp:
  projects:
    - NextJs/NextJs15-lp
  # This rule will be skipped if docs/[web] has protectFromOverwrite: true
```

### **Exclude Files**
Use `excludeFiles` to exclude files from being copied in the general rule:

```yaml
docs/[web]:
  excludeFiles:
    - domains-lp  # Excludes this folder from copying
```

**Note**: `excludeFiles` only prevents copying, it doesn't protect from overwriting by specific rules.

## **5. Differences: syncShared vs cleanShared**

Both scripts process rules in the same order (general → specific), but behave differently:

| Feature | syncShared | cleanShared |
|---------|-----------|-------------|
| **Action** | Copies files | Removes files |
| **Sorting** | General → Specific | General → Specific |
| **Overwriting** | Specific rules overwrite general rules | Specific rules are protected from deletion by general rules |
| **Protection** | `protectFromOverwrite` flag available | Automatic protection for specific rules |

**Example behavior:**

For `docs/[web]` (general) and `docs/[web]/domains-lp` (specific):

- **syncShared**: `docs/[web]` copies files first, then `docs/[web]/domains-lp` overwrites matching files
- **cleanShared**: `docs/[web]` removes files first, but `docs/[web]/domains-lp` files are protected from deletion

## **6. How to Add New Shared Files**

### **🔹 Step 1: Add Files to `shared/`**

Add your file or directory to the `shared/` directory:

```sh
mkdir -p shared/config
touch shared/config/example.config.js
```

### **🔹 Step 2: Configure in `sync-config.yaml`**

Add an entry to `sync-config.yaml` using either format:

```yaml
# Simple format
config/example.config.js:
  - NextJs/NextJs15
  - node

# Or advanced format
config/example.config.js:
  projects:
    - NextJs/NextJs15
    - node
  asName: custom.config.js
```

### **🔹 Step 3: Run Synchronization**

```sh
npm run sync:shared
```

## **7. Managing Files**

### **Preview Changes**

To see what would be synchronized without making changes:

```sh
npm run sync:shared --dry-run
```

### **Automatic Synchronization**

Add to `.husky/pre-commit` for automatic updates:

```sh
npm run sync:shared
```

### **Remove from Synchronization**

1. Remove the entry from `sync-config.yaml`
2. Delete the file/directory from `shared/` if no longer needed
3. Manually remove files from templates if desired

## **8. Best Practices**

- Use the simple format when possible for better readability
- Use the advanced format only when you need file renaming or exclusions
- **Keep general rules before specific rules in YAML file** - this ensures proper overwriting behavior
- Keep shared files modular and focused
- Document any special configurations or requirements
- Use consistent naming conventions across templates

## **9. FAQ**

### ❓ **When should I use the advanced format?**

Use it when you need to:

- Rename files in specific templates
- Exclude certain files from synchronization
- Have different versions of the same file for different templates

### ❓ **Can I sync individual files from a directory?**

Yes, specify the full path in the configuration:

```yaml
config/specific-file.js:
  projects:
    - NextJs/NextJs15
```

### ❓ **What happens to existing files?**

Files are overwritten if they differ from the source. The overwriting behavior follows the processing order:

- General rules copy files first
- Specific rules overwrite files from general rules (if they exist in the same path)
- Use `protectFromOverwrite: true` in a general rule to prevent overwriting by specific rules
- Use `excludeFiles` to exclude files from being copied in the general rule

### ❓ **How does protectFromOverwrite work?**

When a general rule has `protectFromOverwrite: true`, any specific rule that would overwrite files in that path will be skipped. This is useful when you want to ensure that general rule files are never modified by specific rules.

**Example:**
```yaml
docs/[web]:
  projects: [...]
  protectFromOverwrite: true  # Protects all files in docs/[web]

docs/[web]/domains-lp:
  projects: [...]
  # This rule will be skipped - cannot overwrite protected path
```

---

## **Summary**

✅ **Two formats**: Simple for basic needs, Advanced for more control
✅ **Easy synchronization**: `npm run sync:shared`
✅ **Flexible configuration**: Support for file renaming and exclusions
✅ **Automatic updates**: Can be integrated with git hooks
✅ **Clear feedback**: Detailed logs of all synchronization actions
