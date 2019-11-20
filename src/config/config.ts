/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-12 14:21:58
 */
export default {
    /*app config*/
    app_port: 3000, // 监听端口
    app_hostname: '', // Hostname
    encoding: 'utf-8', //输出数据的编码

    logs: true, //是否存储日志
    logs_path: process.env.ROOT_PATH + '/logs', //存储日志文件目录
    logs_level: ['warn', 'error'], //日志存储级别, 'info', 'warn', 'error', 'success' or custom type

    rbac: {
        //默认配置项
        enable_rule: 1, //开启功能权限验证
        enable_data: 1, //开启数据权限验证
        auth_superrole: 1, //超级管理员角色 (无需权限验证)
        data_model_list: ['Group', 'RoleData', 'Role', 'RoleRule', 'User'] //数据权限模型名列表
    }
};