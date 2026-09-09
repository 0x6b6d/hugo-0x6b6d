# 0x6b6d Hugo Theme

A dark, terminal aesthetic blog theme

## Features

- Monospace headings (Courier New) paired with system-ui body text
- Animated glitch effect on post titles
- Purple-bordered quote/callout boxes (the signature card)
- Reading progress bar on single posts
- Copy-to-clipboard buttons on code blocks
- Animated post card list with stagger
- Tags taxonomy with cloud view
- Scroll-to-top button
- RSS feed
- Pagination
- Responsive down to mobile
- `prefers-reduced-motion` respected

## Installation

```bash
# As a git submodule (recommended)
git submodule add https://github.com/you/0x6b6d themes/0x6b6d

# Or copy the folder
cp -r 0x6b6d-theme themes/0x6b6d
```

Set `theme = "0x6b6d"` in your `hugo.toml`. Copy `hugo.example.toml` as a starting point.

## Content structure

```
content/
  posts/
    my-first-post.md
  about.md
```

### Post front matter

```yaml
---
title: "My Post"
date: 2025-01-01
description: "A short description shown under the title."
tags: ["go", "linux"]
draft: false
---
```

## Customisation

All design tokens are CSS custom properties in `static/css/main.css` under `:root`. Change `--accent` and `--accent-bright` to retheme in seconds.

## Syntax highlighting

Set `[markup.highlight] style = "dracula"` (or any Chroma style) in your `hugo.toml`.  
The code blocks inherit the purple left-border from the theme regardless of highlight style.
