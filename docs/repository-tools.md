# Repository Tools — Agile AI Foundation

This document records useful Git commands used to inspect the evolution of the Agile AI Foundation documentation and design system layers.

These commands help maintainers understand how the repository evolves over time.

---

## 1. View Refinement Layer Evolution

Shows the commit history of the UX refinement layer.

```bash
git log --follow --oneline --decorate docs/refinement.css
```

Example output:

```
33a9414 refinement(nav): add mobile navigation depth layer (v1.17)
9ab2c11 refinement(header): header vertical rhythm stabilization (v1.16)
7f21b22 refinement(nav): mobile navigation viewport panel (v1.15)
```

---

## 2. View Detailed Changes to Refinement Layer

Displays the exact code changes made to the refinement layer.

```bash
git log -p docs/refinement.css
```

Useful for debugging layout changes.

---

## 3. Generate Refinement Layer Changelog

Creates a simple CHANGELOG based on commit history.

```bash
git log --follow --pretty=format:"- %h | %ad | %s" --date=short docs/refinement.css > CHANGELOG.md
```

Example output:

```
- 33a9414 | 2026-03-09 | refinement(nav): add mobile navigation depth layer (v1.17)
- 9ab2c11 | 2026-03-08 | refinement(header): header vertical rhythm stabilization (v1.16)
```

---

## 4. View Repository Evolution Graph

Shows the full project commit history in a visual graph.

```bash
git log --graph --oneline --decorate --all
```

Example:

```
* 33a9414 refinement(nav): v1.17
* 9ab2c11 refinement(header): v1.16
* 7f21b22 refinement(nav): v1.15
```

---

## 5. Inspect Architecture-Level Changes

To inspect major layout components:

```bash
git log -p docs/shared/header.js
git log -p docs/shared/footer.js
git log -p docs/refinement.css
```

These commands reveal how header, navigation, and footer systems evolved.

---

## 6. Recommended Commit Style

To maintain clean history, use structured commit messages:

```
refinement(nav): improve mobile navigation layout
refinement(header): stabilize header spacing
docs: update governance documentation
```

This enables automated changelog generation.

---

## Notes

These tools are intended for repository maintainers and contributors.
They do not affect the published Agile AI Foundation content.

## Git Aliases

git config --global alias.timeline "log --graph --decorate --oneline --all"

git config --global alias.refinement "log --follow --oneline docs/refinement.css"

## Inspect Line History

View who changed each line of a file.

git blame docs/refinement.css

Alias:

git config --global alias.inspect "blame"

Usage:

git inspect docs/refinement.css

## Inspect Line History

View who changed each line of a file.

git blame docs/refinement.css

Alias:

git config --global alias.inspect "blame"

Usage:

git inspect docs/refinement.css