[![ThinkKoa](http://thinkkoa.org/img/logo.png)](https://github.com/thinkkoa/koatty)

# Application created by [Koatty](https://github.com/thinkkoa/koatty)

## install dependencies

```shell
yarn install
```

## Migrate data

Edit the project src / db.ts data source configuration and run:

```shell
//macOS used sudo
npm i -g koatty_cli

npm run build && koatty migrate all
```

## start server

```shell
npm start
```


## deploy with pm2

use pm2 to deploy app on production envrioment.

```shell
pm2 startOrGracefulReload pm2.json
```

## API Document

auto create by [apidoc](https://www.npmjs.com/package/apidoc) module.

```shell
npm run doc
```
start server and call `http://localhost:3000/doc/index.html`.

## How to debug

if you use vscode , edit the `.vscode/launch.json` , like this: 
```js
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "TS Program",
            "args": [
                "${workspaceRoot}/src/App.ts"
            ],
            "runtimeArgs": [
                "--nolazy",
                "-r",
                "ts-node/register"
            ],
            "sourceMaps": true,
            "cwd": "${workspaceRoot}",
            "protocol": "inspector",
            "internalConsoleOptions": "neverOpen"
        }
    ]
}
```
Select `TS Program` to debug run. Try to call `http://localhost:3000/` .
