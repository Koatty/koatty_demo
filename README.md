[![ThinkKoa](http://thinkkoa.org/img/logo.png)](http://thinkkoa.org/koatty)

# Application created by [Koatty](https://github.com/thinkkoa/koatty)

Project includes JWT + CURD authority authentication function

## create database

Execute update.sql file to create the database.

## install dependencies

```
yarn install
```

## start server

```
npm start
```

## deploy with pm2

use pm2 to deploy app on production envrioment.

```
pm2 startOrGracefulReload pm2.json
```

## API Document

auto create by apidoc.

```
npm run doc
```
start server and call `http://localhost:3000/doc/index.html`.

## How to debug

if you use vscode , edit the `.vscode/launch.json` , like this: 
```
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
