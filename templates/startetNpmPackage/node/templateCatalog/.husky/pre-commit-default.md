echo \[🐶 Husky] Running pre-commit hook...\

# Get current branch
current_branch=$(git rev-parse --abbrev-ref HEAD)

# Check if we're not on main branch
if [ "$current_branch" != "main" ]; then
    echo "🔍 Checking for branch updates..."

# Fetch all latest changes
    git fetch origin

# Check if main has commits that dev doesn't have
    behind_commits=$(git rev-list --count $current_branch..origin/main)
    if [ "$behind_commits" -gt 0 ]; then
        echo "ℹ️  Main branch has $behind_commits new commits that are not in your branch! Update your branch before committing."
        echo "ℹ️  [⏩]Run: git stash && git merge origin/main && git stash pop"
        exit 1
    else
        echo "✅ Your branch is up to date with main"
    fi

# Check if remote branch has new commits
    remote_commits=$(git rev-list --count $current_branch..origin/$current_branch 2>/dev/null)
    if [ "$remote_commits" -gt 0 ]; then
        echo "❗ Remote branch has $remote_commits new commits! Pull changes before committing."
        echo "ℹ️  [⏩]Run: git stash && git merge origin/$current_branch && git stash pop"
        exit 1
    else
        echo "✅ Your branch is up to date with remote"
        yarn husky:pre-commit
    fi
fi

echo \[🐶 Husky] Done ✅ pre-commit hook...\

exit 0
