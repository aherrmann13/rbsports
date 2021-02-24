# server

## targets

| command | description            |
| ------- | ---------------------- |
| start   | runs express server    |
| lint    | runs eslint on project |

## misc notes

`"type": "module"` in package.json so js files will be interpreted as module. source
[here](https://stackoverflow.com/questions/58384179/syntaxerror-cannot-use-import-statement-outside-a-module). This can
be removed if we add a webpack target to run server or something along these lines. running 'node' in the same folder as
the package.json runs the server as the project currently stands

`.eslintrc.cjs` instead of `.eslintrc.js` becuase `"type": "module"` in package.json

dont love the way express is set up where a 'controller' expects certain parameters on the request, but they need to be
specified in the route as well, which could potentially be in a different file
