---
title: I use exa instead of ls
published: 2021-11-21 00:01 -0700
edited: 2023-01-08 19:30 -0700
---

https://the.exa.website/

My exa aliases (in ~/.zshrc):

```
alias ll="exa --all --header --icons --long"
```

```
alias lt="ll --tree --level=3 --git-ignore --ignore-glob='.git|node_modules'"
```

I spent a lot of time reading the command line options doc, tweak as needed :)

https://the.exa.website/docs/command-line-options
