/*
 * @Description: 插件配置
 * @usage: 配置待加载的插件及加载顺序
 * @Author: xxx
 * @Date: 2020-12-22 15:24:25
 * @LastEditTime: 2023-08-17 17:45:04
 */

export default {
  list: ["TypeormPlugin"], //加载的插件列表,执行顺序按照数组元素顺序
  config: { //插件配置
    // ex:
    TypeormPlugin: {
      //默认配置项
      type: "mysql",
      host: "${mysql_host}",
      port: "${mysql_port}",
      username: "${mysql_user}",
      password: "${mysql_pass}",
      database: "test",
      synchronize: true,
      logging: true,
      entities: [`${process.env.APP_PATH}/model/*`],
      entityPrefix: "lc_", //表前缀
    }
  }
};