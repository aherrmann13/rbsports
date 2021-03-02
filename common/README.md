# common

## split commonjs and esm build

two tsconfigs to generate esm and cjs code. The reason for this is a node app will consume the cjs lib, and a frontend
application will want to consume the esm version for treeshaking.

module property in package.json points to index in es, and main points to the index in lib. The effect of this is any
common js application (runnning with node) will point to the main version. Tools like webpack and rollup can use the
module property, so they can replace the reference in `lib` with the one in `es` automatically and take advantage of the
es style import/export when treeshaking. On the frontent a reference to anything in `es` will also work.

the js in the `es` folder are not technically esm modules because they dont have the `.mjs` extension or
`"type": "module"` in `package.json` but can be interpreted by bundlers as such.
[source](https://gitter.im/nodejs/node?at=603bd8dcd74bbe49e0c4eca5)

## peerDependencies

listing `fp-ts` as a peer dependency so the consuming package can supply the version. This is same setup as
[io-ts](https://github.com/gcanti/io-ts/blob/master/package.json#L42)
