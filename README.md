tbeseda.com

## Architect

_Deployed to AWS._

`@scheduled` to get GitHub, Letterboxd, and Fortnite stats.

`@tables` to persist stats as "things".

`@http` serves up the main view.

`prefs.arc` enables `livereload` and a `sandbox-startup` script.

`@architect/plugin-lambda-invoker` is available to interactively run scheduled functions.

## Enhance

Still experimental.

### Some conventions

- Enhance'd web components live in `src/views/elements`. File name is pascal cased. Custom elements must be named with 2 words, like `FlipCard` and `<flip-card>`.
- Don't create a custom component just to return a string. Each "card" does some sort of server-side calculation and provides interactivity in the browser (wip).
- `document.mjs` is not a proper component. Just a function that returns a string. So it lives at the views root and isn't capitalized.
- `render.js` combines Enhance, state, and `document()` to return a full HTML document.

### Tools

See [`.extensions.json`](./.vscode/extensions.json) for VS Code recommendations.
