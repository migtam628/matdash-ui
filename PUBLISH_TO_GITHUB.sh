#!/usr/bin/env bash
set -euo pipefail

REPO="migtam628/matdash-ui"
REMOTE="https://github.com/${REPO}.git"

if ! command -v git >/dev/null 2>&1; then
  echo "git is required." >&2
  exit 1
fi

if [ ! -d .git ]; then
  git init
fi

git add .
if ! git diff --cached --quiet; then
  git commit -m "chore: initialize MatDash UI v0.2.0"
fi

git branch -M main
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE"
else
  git remote add origin "$REMOTE"
fi

echo "Pushing to $REMOTE"
git push -u origin main
