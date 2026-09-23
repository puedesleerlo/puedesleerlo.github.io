#!/bin/sh
# Install the pre-commit hook that re-stamps asset URLs before each commit.
cd "$(git rev-parse --show-toplevel)"
cat > .git/hooks/pre-commit <<'HOOK'
#!/bin/sh
python3 tools/stamp_assets.py >/dev/null && git add -u -- '*.html'
HOOK
chmod +x .git/hooks/pre-commit
echo "pre-commit hook installed"
