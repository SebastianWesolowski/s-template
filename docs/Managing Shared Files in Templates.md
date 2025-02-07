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

## **3. How to Add New Shared Files**

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

## **4. Managing Files**

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

## **5. Best Practices**

- Use the simple format when possible for better readability
- Use the advanced format only when you need file renaming or exclusions
- Keep shared files modular and focused
- Document any special configurations or requirements
- Use consistent naming conventions across templates

## **6. FAQ**

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

Files are overwritten if they differ from the source. Use `excludeFiles` to prevent overwriting specific files.

---

## **Summary**

✅ **Two formats**: Simple for basic needs, Advanced for more control
✅ **Easy synchronization**: `npm run sync:shared`
✅ **Flexible configuration**: Support for file renaming and exclusions
✅ **Automatic updates**: Can be integrated with git hooks
✅ **Clear feedback**: Detailed logs of all synchronization actions
