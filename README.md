# rbsports

## stack

mean stack applicaton

[mongo](https://www.mongodb.com/)  
[express](https://expressjs.com/)  
[angular](https://angular.io/)  
[nodejs](https://nodejs.org/en/)

not using the meanjs template [here](http://meanjs.org/) because of the shared package.json. Would rather
have the flexibility of each component (client, server, shared model, etc... ) having its own set of
dependencies, epecially when larger libraries like angular or express are used. Additionally, that
project is using angular js, not angular (2+)

avoiding using something like [lerna](https://lerna.js.org/) to share common package with types and
validation as linking a package is pretty straightforward [source](https://stackoverflow.com/questions/15806241/how-to-specify-local-modules-as-npm-package-dependencies)
