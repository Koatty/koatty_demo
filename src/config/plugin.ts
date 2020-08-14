/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-12 00:07:26
 */
export default {
    // list: ["ApolloPlugin"], //加载的插件列表,执行顺序按照数组元素顺序
    list: [], //
    config: { //插件配置
        "ApolloPlugin": {
            host: 'http://127.0.0.1:8080', //your-config-server-url
            appId: 'test', //your-config-appId
            clusterName: 'default', //cluster-name
            namespace: 'application', //your-config-namespace
            enableUpdateNotification: true, // boolean=true set to false to disable update notification.
            enableFetch: true, //boolean=false set to true to enable the feature
            fetchTimeout: 30000, // number=30000 timeout in milliseconds before the initial fetch or interval fetch result in an FETCH_TIMEOUT error.
            fetchInterval: 3 * 60 * 1000, // number = 3 * 60 * 1000 interval in milliseconds to pull the new configurations.Defaults to 5 minutes.Setting this option to 0 will disable the feature.
            fetchCachedConfig: true // boolean = true whether refresh configurations by fetching the restful API with caches.Defaults to true.If you want to always fetch the latest configurations(not recommend), set the option to false
        }
    }
};