echo \[🐶 Husky] Running pre-commit hook...\

# Load environment variables from .env files
# Next.js loads .env files automatically, but git hooks run in bash shell
# This function loads variables from .env files following Next.js priority:
# 1. .env.local (highest priority, all environments)
# 2. .env.development or .env.production (based on NODE_ENV)
# 3. .env (lowest priority, all environments)
load_env_variables() {
    local env_file
    local script_dir
    script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

    # Function to load variables from a .env file
    load_env_file() {
        local file="$1"
        if [ -f "$file" ]; then
            local file_name=$(basename "$file")
            echo "📄 [DEBUG] Loading environment variables from: $file_name"
            # Parse .env file: ignore comments, empty lines, and export variables
            while IFS= read -r line || [ -n "$line" ]; do
                # Skip comments and empty lines
                [[ "$line" =~ ^[[:space:]]*# ]] && continue
                [[ -z "${line// }" ]] && continue

                # Export variable (handle both KEY=value and KEY="value" formats)
                if [[ "$line" =~ ^[[:space:]]*([^#=]+)=(.*)$ ]]; then
                    local key="${BASH_REMATCH[1]// /}"
                    local value="${BASH_REMATCH[2]}"
                    # Remove quotes if present
                    value="${value#\"}"
                    value="${value%\"}"
                    value="${value#\'}"
                    value="${value%\'}"
                    export "$key=$value"
                fi
            done < "$file"
        fi
    }

    # Load in Next.js priority order
    # 1. .env (base, lowest priority)
    load_env_file "$script_dir/.env"

    # 2. .env.development or .env.production (based on NODE_ENV)
    local node_env="${NODE_ENV:-development}"
    if [ "$node_env" = "production" ]; then
        load_env_file "$script_dir/.env.production"
    else
        load_env_file "$script_dir/.env.development"
    fi

    # 3. .env.local (highest priority, overrides everything)
    load_env_file "$script_dir/.env.local"
}

# Load environment variables at the start
load_env_variables

# Get current branch
get_current_branch() {
    git rev-parse --abbrev-ref HEAD
}

# Check if branch is up to date with main
check_main_branch_updates() {
    local current_branch=$1
    echo "🔍 Checking for branch updates..."

    # Fetch all latest changes
    git fetch origin

    # Check if main has commits that dev doesn't have
    behind_commits=$(git rev-list --count $current_branch..origin/main)
    if [ "$behind_commits" -gt 0 ]; then
        echo "ℹ️  Main branch has $behind_commits new commits that are not in your branch! Update your branch before committing."
        echo "ℹ️  [⏩]Run: git stash && git rebase origin/main && git stash pop"
        return 1
    else
        echo "✅ Your branch is up to date with main"
        return 0
    fi
}

# Check if branch is up to date with remote
check_remote_branch_updates() {
    local current_branch=$1
    # Check if remote branch has new commits
    remote_commits=$(git rev-list --count $current_branch..origin/$current_branch 2>/dev/null)
    if [ "$remote_commits" -gt 0 ]; then
        echo "❗ Remote branch has $remote_commits new commits! Pull changes before committing."
        echo "ℹ️  [⏩]Run: git stash && git merge origin/$current_branch && git stash pop"
        return 1
    else
        echo "✅ Your branch is up to date with remote"
        return 0
    fi
}

# Główna funkcja aktualizująca snapshoty testowe przed commitem
# Szczegółowa dokumentacja przypadków użycia znajduje się wewnątrz funkcji.
update_test_snapshots() {
    # ========================================================================
    # Lokalne funkcje pomocnicze (dostępne tylko w kontekście update_test_snapshots)
    # ========================================================================

    # Generuje/aktualizuje snapshoty testowe
    # Uruchamia test:snapshot:generate który tworzy lub aktualizuje snapshoty
    # Zwraca kod wyjścia (0 = sukces, != 0 = błąd)
    generate_snapshots() {
        yarn test:snapshot:generate
        return $?
    }

    # Testuje snapshoty bez aktualizacji
    # Uruchamia test:snapshot:verify który sprawdza czy snapshoty pasują do aktualnego renderowania
    # Zwraca kod wyjścia (0 = sukces, != 0 = błąd)
    test_snapshots() {
        yarn test:snapshot:verify
        return $?
    }

    # Znajduje wszystkie zmienione/nowe pliki snapshot po testach
    # Zwraca listę ścieżek do plików snapshot (nowe, zmienione, usunięte)
    # git status --porcelain pokazuje:
    #   - ?? (nowe pliki)
    #   - M  (zmienione pliki)
    #   - D  (usunięte pliki)
    find_changed_snapshots() {
        git status --porcelain | grep "__snapshots__" | awk '{print $2}'
    }

    # Sprawdza czy plik snapshot jest już w staging area, aby uniknąć duplikatów
    # Argument: ścieżka do pliku snapshot
    # Zwraca: 0 jeśli w stagingu, 1 jeśli nie
    is_in_staging() {
        local file_path="$1"
        git diff --cached --name-only | grep -q "^$file_path$"
        return $?
    }

    # Sprawdza czy plik snapshot jest nowy czy zmieniony
    # Argument: ścieżka do pliku snapshot
    # Zwraca: "new" jeśli nowy, "modified" jeśli zmieniony
    get_snapshot_status() {
        local file_path="$1"
        if git ls-files --error-unmatch "$file_path" >/dev/null 2>&1; then
            echo "modified"
        else
            echo "new"
        fi
    }

    # Dodaje pliki snapshot do stagingu, pomijając te które już są w staging area
    # Argument: lista ścieżek do plików snapshot (jedna na linię)
    # Zwraca: "added_count:skipped_count:new_count:modified_count" (statystyki)
    add_snapshots() {
        local snapshot_files="$1"
        local added_count=0
        local skipped_count=0
        local new_count=0
        local modified_count=0

        if [ -z "$snapshot_files" ]; then
            echo "0:0:0:0"
            return 0
        fi

        while IFS= read -r file; do
            if [ -n "$file" ]; then
                # CASE 5: Snapshot już w stagingu → pomiń (unika duplikatów)
                if is_in_staging "$file"; then
                    skipped_count=$((skipped_count + 1))
                else
                    # CASE 3/4: Nowy lub zaktualizowany snapshot → dodaj do stagingu
                    local status=$(get_snapshot_status "$file")
                    if [ "$status" = "new" ]; then
                        new_count=$((new_count + 1))
                    else
                        modified_count=$((modified_count + 1))
                    fi

                    git add "$file"
                    added_count=$((added_count + 1))
                fi
            fi
        done <<< "$snapshot_files"

        echo "${added_count}:${skipped_count}:${new_count}:${modified_count}"
        return 0
    }

    # Pokazuje szczegółową listę zmian w snapshotach (tryb A - STRICT_RULES=true)
    # Argument: lista ścieżek do plików snapshot (jedna na linię)
    show_snapshot_changes() {
        local snapshot_files="$1"

        if [ -z "$snapshot_files" ]; then
            return 0
        fi

        echo ""
        echo "📋 Snapshot changes added to staging:"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

        while IFS= read -r file; do
            if [ -n "$file" ]; then
                # Sprawdź czy plik jest w stagingu (po add_snapshots)
                if git diff --cached --name-only | grep -q "^$file$"; then
                    local status=$(get_snapshot_status "$file")
                    if [ "$status" = "new" ]; then
                        local lines=$(wc -l < "$file" 2>/dev/null || echo "0")
                        echo "  ✨ New:      $file ($lines lines)"
                    else
                        # Pokaż statystyki zmian dla zmienionych plików
                        local changes=$(git diff --cached --stat "$file" 2>/dev/null | tail -1)
                        if [ -n "$changes" ]; then
                            echo "  ✏️  Modified: $file"
                            echo "     $changes"
                        else
                            echo "  ✏️  Modified: $file"
                        fi
                    fi
                fi
            fi
        done <<< "$snapshot_files"

        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    }

    # Pokazuje kolorowy diff snapshotów w terminalu (tryb B - STRICT_RULES=false)
    # Argument: lista ścieżek do plików snapshot (jedna na linię)
    show_colored_diff() {
        local snapshot_files="$1"

        if [ -z "$snapshot_files" ]; then
            return 0
        fi

        echo ""
        echo "📊 Snapshot changes (colored diff):"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

        while IFS= read -r file; do
            if [ -n "$file" ] && git diff --cached --name-only | grep -q "^$file$"; then
                echo ""
                echo "📄 $file:"
                git diff --cached --color=always "$file" | head -100
                echo ""
            fi
        done <<< "$snapshot_files"

        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    }

    # Pokazuje komendy do wycofania zmian snapshotów (tryb B)
    show_undo_commands() {
        echo ""
        echo "💡 To undo snapshot changes:"
        echo "   git reset HEAD <snapshot_file>           # Unstage specific file"
        echo "   git reset HEAD -- __snapshots__          # Unstage all snapshots"
        echo "   git restore --staged <snapshot_file>     # Alternative unstage"
        echo "   git restore <snapshot_file>              # Discard changes"
    }

    # ========================================================================
    # Główna logika funkcji
    # ========================================================================

    # Główna funkcja aktualizująca snapshoty testowe przed commitem
    #
    # Nowy flow z trybami STRICT_RULES:
    #
    # Zasada: Snapshoty są zawsze generowane przed commitem, potem testowane.
    #
    # Tryb A: STRICT_RULES === true (Tryb ścisły)
    #   - Generuje snapshoty
    #   - Testuje snapshoty
    #   - Jeśli są zmiany → informuje w terminalu
    #   - Dodaje snapshoty do stagingu
    #   - Wymaga review przed commitem
    #
    # Tryb B: STRICT_RULES === false (Tryb szybkiego developmentu)
    #   - Generuje snapshoty
    #   - Testuje snapshoty
    #   - Jeśli są zmiany → pokazuje kolorowy diff w terminalu
    #   - Dodaje automatycznie do stagingu
    #   - Pokazuje komendy do wycofania zmian
    #
    # Tryb C: Snapshoty już w stagingu
    #   - Jeśli snapshoty są już w stagingu → pomija
    #   - Kontynuuje jeśli testy przeszły
    #   - Nie duplikuje snapshotów

    echo "🧪 Generating and testing snapshots..."

    # Krok 1: Generuj snapshoty (zawsze)
    generate_snapshots
    local generate_exit_code=$?

    if [ $generate_exit_code -ne 0 ]; then
        echo "❌ Failed to generate snapshots"
        return 1
    fi

    # Krok 2: Testuj snapshoty (zawsze)
    test_snapshots
    local test_exit_code=$?

    if [ $test_exit_code -ne 0 ]; then
        echo "❌ Snapshot tests failed - fix them before committing"
        return 1
    fi

    # Krok 3: Wykryj zmiany w snapshotach
    echo "📝 Checking for updated snapshots..."
    local changed_snapshots
    changed_snapshots=$(find_changed_snapshots)

    # Krok 4: Obsłuż tryby A/B/C w zależności od STRICT_RULES
    local strict_mode="${STRICT_RULES:-false}"

    # Debug: wylogowanie wartości zmiennej STRICT_RULES
    echo "🔍 [DEBUG] STRICT_RULES environment variable: '${STRICT_RULES:-not set}'"
    echo "🔍 [DEBUG] strict_mode value: '$strict_mode'"

    if [ -n "$changed_snapshots" ]; then
        # Dodaj snapshoty do stagingu (pomijając już w stagingu)
        local stats
        stats=$(add_snapshots "$changed_snapshots")
        local added_count=$(echo "$stats" | cut -d: -f1)
        local skipped_count=$(echo "$stats" | cut -d: -f2)
        local new_count=$(echo "$stats" | cut -d: -f3)
        local modified_count=$(echo "$stats" | cut -d: -f4)

        if [ "$added_count" -gt 0 ]; then
            if [ "$strict_mode" = "true" ]; then
                # Tryb A: STRICT_RULES=true - dodaj do stagingu z review i ZATRZYMAJ commit
                echo ""
                echo "✅ Added $added_count snapshot file(s) to staging"
                if [ "$new_count" -gt 0 ] && [ "$modified_count" -gt 0 ]; then
                    echo "   - $new_count new snapshot(s)"
                    echo "   - $modified_count modified snapshot(s)"
                elif [ "$new_count" -gt 0 ]; then
                    echo "   - $new_count new snapshot(s)"
                elif [ "$modified_count" -gt 0 ]; then
                    echo "   - $modified_count modified snapshot(s)"
                fi

                show_snapshot_changes "$changed_snapshots"

                echo ""
                echo "⚠️  STRICT_RULES=true: Commit stopped for review"
                echo ""
                echo "💡 Review changes before committing:"
                echo "   git diff --cached -- __snapshots__"
                echo "   git status"
                echo ""
                echo "📝 After review, commit again with:"
                echo "   git commit"
                echo ""
                echo "   To unstage snapshot files:"
                echo "   git reset HEAD <snapshot_file>"
                echo "   git reset HEAD -- __snapshots__"
                echo ""

                # Zwróć błąd aby zatrzymać commit
                return 1
            else
                # Tryb B: STRICT_RULES=false - dodaj automatycznie, pokaż diff i undo commands
                echo ""
                echo "✅ Added $added_count snapshot file(s) to staging"
                if [ "$new_count" -gt 0 ] && [ "$modified_count" -gt 0 ]; then
                    echo "   - $new_count new snapshot(s)"
                    echo "   - $modified_count modified snapshot(s)"
                elif [ "$new_count" -gt 0 ]; then
                    echo "   - $new_count new snapshot(s)"
                elif [ "$modified_count" -gt 0 ]; then
                    echo "   - $modified_count modified snapshot(s)"
                fi

                show_colored_diff "$changed_snapshots"
                show_undo_commands
            fi
        fi

        if [ "$skipped_count" -gt 0 ]; then
            # Tryb C: Snapshoty już w stagingu → pominięte
            echo "ℹ️  Skipped $skipped_count snapshot file(s) (already in staging)"
        fi
    else
        # Brak zmian w snapshotach
        echo "ℹ️  No new snapshot files detected"
    fi

    return 0
}

# Check and update tailwind config
check_tailwind_config() {
    # Check if tailwind.config.ts is in staging
    if git diff --cached --name-only | grep -q "tailwind.config.ts"; then
        echo "🎨 Detected changes in tailwind.config.ts - updating VS Code colors..."
        yarn update-vscode-colors
        git add .vscode/settings.json
    fi
}

# Main execution flow
main() {
    current_branch=$(get_current_branch)

    # Skip checks if on main branch
    if [ "$current_branch" = "main" ]; then
        echo "✅ On main branch, skipping update checks"
    else
        # Check updates from main branch
        if ! check_main_branch_updates "$current_branch"; then
            exit 1
        fi

        # Check updates from remote branch
        if ! check_remote_branch_updates "$current_branch"; then
            exit 1
        fi

        # Run husky pre-commit tasks
        yarn husky:pre-commit

        # Update test snapshots
        if ! update_test_snapshots; then
            exit 1
        fi
    fi

    # Check tailwind config changes
    check_tailwind_config

    echo \[🐶 Husky] Done ✅ pre-commit hook...\

    exit 0
}

# Run the main function
main
