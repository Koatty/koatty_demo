/*
 * @Description: 中间件配置
 * @usage: 配置待加载的中间件及加载顺序
 * @Author: xxx
 * @Date: 2020-12-22 15:24:25
 * @LastEditTime: 2023-11-08 15:35:20
 */

export default {
  list: ["StaticMiddleware", "ViewMiddleware"], //加载的中间件列表
  config: { //中间件配置
    // 静态服务器中间件默认未开启
    // StaticMiddleware: false,
    // 需要开启请修改为:
    StaticMiddleware: {
      cache: true
    },
    ViewMiddleware: {
      root: `${process.env.ROOT_PATH}/view`, // 模板目录
      opts: {
        autoRender: false,
        extension: 'html',
        map: {
          html: "ejs",
        },
        options: {
          cache: false,
        }
      }
    },
  }
};