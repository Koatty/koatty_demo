/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-12-23 13:50:53
 */
export default {
    /*app config*/
    app_port: 3000, // 监听端口
    app_hostname: '', // Hostname
    encoding: 'utf-8', //输出数据的编码

    logs_write: true, // Whether to store logs
    logs_path: process.env.ROOT_PATH + "/logs", // Log file directory
    logs_level: "WARN", // Log storage level, "DEBUG" | "INFO" | "WARN" | "ERROR"

    //RBAC权限配置
    rbac: {
        //默认配置项
        enable_rule: 1, //开启功能权限验证
        enable_data: 1, //开启数据权限验证
        auth_superrole: 1, //超级管理员角色 (无需权限验证)
        data_model_list: ['Group', 'RoleData', 'Role', 'RoleRule', 'User'] //数据权限模型名列表
    },

    //NFS上传配置
    nfs: {
        max_file_size: 20 * 1024 * 1024, //上传文件大小限制，默认20M
        file_allow_type: 'jpg|jpeg|png|gif|xlsx|xls|csv|doc|ppt|mp3|rar|zip', //允许上传的文件类型
        file_save_path: `${process.env.ROOT_PATH}/cache/`
    },

    //Ali OSS配置
    oss: {
        max_file_size: 31 * 1024, //上传文件大小限制，默认30k以内
        file_allow_type: 'jpg|jpeg|png|gif|xlsx|xls|csv|doc|ppt|mp3|rar|zip', //允许上传的文件类型
        ali_access_key: '', //阿里云OSS access_key
        ali_access_secret: '', //阿里云OSS access_secret
        ali_bucket: '', //阿里云OSS bucket
        ali_region: '',
        ali_path: '', //阿里云OSS 保存目录
        ali_url: '' //阿里云OSS url,可以是OSS默认域名，也可以是绑定的自定义域名
    }
};
