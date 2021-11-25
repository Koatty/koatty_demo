# koatty_demo

Application created by [Koatty](https://github.com/koatty/koatty)


## 项目目录结构

 ```shell
projectName
├── .vscode                       # vscode配置
│   └── launch.json               # node本地调试脚本
├── dist                          # 编译后目录
├── src                           # 项目源代码
│   ├── config
│   │   ├── config.ts             # 框架配置
│   │   ├── db.ts                 # 存储配置
│   │   ├── middleware.ts         # 中间件配置
│   │   ├── plugin.ts             # 插件配置
│   │   └── router.ts             # 路由配置
│   ├── controller                # 控制器
│   │   └── TestController.ts
│   ├── middleware                # 中间件
│   │   ├── JwtMiddleware.ts
│   │   └── ViewMiddleware.ts
│   ├── model                     # 持久层
│   │   └── TestModel.ts
│   ├── plugin                    # 插件
│   │   └── TestPlugin.ts
│   ├── proto                     # pb协议
│   │   └── helloworld.proto
│   ├── resource                  # 用于存放静态数据或白名单等
│   │   └── data.json
│   ├── service                   # service逻辑层
│   │   └── TestService.ts
│   ├── utils                     # 工具函数
│   │   └── index.ts
│   └── App.ts                    # 入口文件
├── static                        # 静态文件目录
│   └── index.html
├── test                          # 测试用例
│   └── index.test.js
├── apidoc.json
├── pm2.json
├── package.json
├── README.md
└── tsconfig.json
 ```

## 启动

```shell
# 安装依赖
npm install

# 启动服务
npm start
```
## 调试

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

## API 文档

使用 [apidoc](https://www.npmjs.com/package/apidoc) 模块自动生成接口文档.
```
npm run doc
```
接口文档地址：http://localhost:3000/doc/index.html


## pm2 部署

use pm2 to deploy app on production envrioment.

```
pm2 startOrGracefulReload pm2.json
```

