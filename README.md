# rbsports

## stack

mean stack applicaton

[mongo](https://www.mongodb.com/)  
[express](https://expressjs.com/)  
[angular](https://angular.io/)  
[nodejs](https://nodejs.org/en/)

not using the meanjs template [here](http://meanjs.org/) because of the shared package.json. Would rather have the
flexibility of each component (client, server, shared model, etc... ) having its own set of dependencies, epecially when
larger libraries like angular or express are used. Additionally, that project is using angular js, not angular (2+)

avoiding using something like [lerna](https://lerna.js.org/) to share common package with types and validation as
linking a package is
[pretty straightforward](https://stackoverflow.com/questions/15806241/how-to-specify-local-modules-as-npm-package-dependencies)

## software versions

| software | version | link                                    |
| -------- | ------- | --------------------------------------- |
| node     | 14.15.4 | [link](https://nodejs.org/en/download/) |

TODO: will add more here as project moves along

## es versions and node

express application will be running on node 14. Node 14 fully supports es2020 so this can be used. We may need to use
babel or drop the es version of the shared lib (or not publish the transpiled files? not sure the best way to go about
this).

Source for node 14 support
[here](https://stackoverflow.com/questions/61305578/what-typescript-configuration-produces-output-closest-to-node-js-14-capabilities/61305579#61305579)

## formatting/linting

using a combination of [prettier](https://prettier.io/) and [eslint](https://eslint.org/). Prettier will take care of
code formatting and eslint will take care of static analysis and code quality rules. Prettier reference on why using
both is important [here](https://prettier.io/docs/en/comparison.html).

setting up these for a typescript project requires several packages.

**[eslint](https://github.com/eslint/eslint)**: eslint is a a linting tool for reporting formatting errors and
performing static code analysis.

**[@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser)**:
eslint and typescript both build an AST out of source code. eslint uses a parser to build its AST that supports
javascript syntax ([espree](https://github.com/eslint/espree)) but will not support typescript syntax that is not valid
javascript. This is an alternative parser that can transform typescript code into the AST that eslint expects.

**[@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)**:
rules in eslint are provided via plugin. This plugin contains rules that can be used with typescript that will not crash
ESLint, as some ESLint rules may not support typescript.

**[prettier](https://github.com/prettier/prettier)**: code formatter for typescript (and some other) file types.

**[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)**: prettier and eslint have conflicting
rules, this config turns off all eslint rules that are configurable in prettier so there is no conflicting formatting
config.

**[eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)**: this runs prettier as an eslint rule
and reports prettier issues as eslint issues when eslint is run.

_note_: when extending an .eslint file from a parent directory eslint looks in that parent directory for any plugins
referenced in that file. This means we cannot extend a common .eslint file and install the plugins separatly in each
project. Each framework (express, angular) will likely have its own plugins and recommended style, so these configs are
likely to diverge anyways. If there are any common settings that we want to be able to change in one place, I think the
best way of going about this would be a sibling package with its own dev dependencies that is either referenced as a
plugin or extended from each other package.

## fp-ts

[fp-ts resource](https://rlee.dev/writing/practical-guide-to-fp-ts-part-1)  
[fp-ts validation resource](https://dev.to/gcanti/getting-started-with-fp-ts-either-vs-validation-5eja)
