---
title: A test article
summary: This is just a test and should not be visible in production
# published: 2021-11-21 00:01 -0700
edited: 2023-01-09 16:30 -0700
---

This is a test article. It should not be visible in production.

```arc
@tables
webmentions
  id *String
  targetPath **String
things # misc storage
  key *String

@tables-indexes
webmentions
  targetPath *String
  name mentionsByPath
```
