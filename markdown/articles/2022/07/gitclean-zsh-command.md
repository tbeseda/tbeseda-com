---
title: gitclean zsh command
published: 2022-07-27 00:01 -0700
edited: 2023-01-08 19:30 -0700
---

```bash
gitclean() {
  git clean -Xdn
  if read -q REPLY\?"Clean these? (Y/y)"; then
    git clean -Xdf
  else
    echo "Still dirty."
  fi
}
```

For more fancy, use "gum":

```bash
gitclean() {
  DIRTY=$(git clean -Xdn | sed 's/Would remove //g')

  gum style \
    --foreground 196 --border thick --border-foreground 88 \
    --margin "1 2" --padding "1 3" "$DIRTY"

  gum confirm "🧹 Delete these?" \
    && git clean -Xdf \
    || echo "Still dirty."
}
```

[gum docs](https://github.com/charmbracelet/gum)
[gist version with preview image](https://gist.github.com/tbeseda/808bb92754161e8032b6cf59fdbc5919)
