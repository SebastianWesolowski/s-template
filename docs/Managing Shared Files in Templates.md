
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
----------

## **2. How to Add a New Shared Directory or File?**

### **🔹 Step 1: Add a File or Directory to `shared/`**

In the `shared/` directory, add a new file or directory.

#### **✅ Example**: Adding a new directory `shared/vitest/`

```sh
mkdir -p shared/vitest
echo "{}" > shared/vitest/vitest.config.js
```

----------

### **🔹 Step 2: Register the File/Directory in `sync-config.yaml`**

Open `sync-config.yaml` and add a new entry specifying which templates the file/directory should be copied to.

#### **✅ Example**: Adding `shared/vitest/vitest.config.js` to the `NextJs` and `node` templates

```yaml
vitest/vitest.config.js:
  - NextJs
  - node`
```

Each entry in the `sync-config.yaml` file contains:

-   **Path to the directory or file** inside `shared/`
-   **List of templates** to which this element will be copied

----------

### **🔹 Step 3: Run Synchronization**

To copy new files to the selected templates, run the script:

```sh
npm run sync:shared
```

----------

## **3. How to Remove a File or Directory from Synchronization?**

If you want to **remove a file from synchronization**, follow these steps:

1.  **Remove the entry from `sync-config.yaml`**
2.  **Delete the file/directory from `shared/` (if no longer needed)**
3.  **Run synchronization again**

```sh
npm run sync:shared
```

This **does not remove** files already copied to templates – if you want to delete them, do it manually.

----------

## **4. How to Preview Which Files Will Be Copied?**

If you want to preview before synchronization, add the `--dry-run` option (we can add this functionality to the script).

```sh
npm run sync:shared --dry-run
```

----------

## **5. Automatic Synchronization Before Commit**

You can add automatic synchronization before committing to GitHub. In the `.husky/pre-commit` file, add:

```sh
npm run sync:shared
```

This ensures that the files are updated before each commit.

----------

## **6. Frequently Asked Questions (FAQ)**

### ❓ **Can I copy an entire directory?**

Yes! In `sync-config.yaml`, specify the directory name:

```yaml
github-actions:
  - NextJs
  - node`
```
This will copy the entire `shared/github-actions/` directory to `templates/NextJs/` and `templates/node/`.

### ❓ **What if I manually modify a file in the template?**

Synchronization will **overwrite** the file during the next run.

### ❓ **Can I exclude certain files from a directory?**

For now, **everything is copied**. We can add support for `.syncignore` if needed.

----------

## **Summary**

✅ **Adding files** → Place them in `shared/` and update `sync-config.yaml`
✅ **Synchronization** → `npm run sync:shared`
✅ **Removal** → Remove the entry from `sync-config.yaml`, delete the file manually
✅ **Automatic synchronization** → Add to `pre-commit`
