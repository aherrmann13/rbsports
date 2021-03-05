# server

## targets

| command      | description                                              |
| ------------ | -------------------------------------------------------- |
| start        | builds app and runs express server locally               |
| docker:build | builds app and builds docker image with app assets       |
| docker:run   | runs the latest docker image build and exposes port 3000 |

## docker resources

nodejs docker instructions [here](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/) based docker setup on
[this medium article](https://betterprogramming.pub/docker-for-node-js-in-production-b9dc0e9e48e0)

## misc notes

dont love the way express is set up where a 'controller' expects certain parameters on the request, but they need to be
specified in the route as well, which could potentially be in a different file

on graceful shutdowns:

seems to be a somewhat complicated problem to solve, express doesnt ship with a nice way to do it. Discussion
[here](https://stackoverflow.com/questions/43003870/how-do-i-shut-down-my-express-server-gracefully-when-its-process-is-killed)
with some library recommendations. Express site itself has examples with 3rd party libraries
[here](https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html).

Out of the ones listed on the express site [http-terminator](https://github.com/gajus/http-terminator) seems like the
one with the least amount of 'extra stuff' like health checks, etc. only handles server shutdown, which is what we need
