/*
 * @Description: 配置数据
 * @Usage: 静态配置数据信息
 * @Author: xxx
 * @Date: 2020-12-22 15:24:25
 * @LastEditTime: 2023-08-18 16:43:58
 */
export default {
  /*app config*/
  app_port: 3000, // Listening port
  app_host: "", // Hostname
  protocol: "http", // Server protocol 'http' | 'https' | 'http2' | 'grpc' | 'ws' | 'wss'
  open_trace: true, // Full stack debug & trace, default: false
  http_timeout: 10, // HTTP request timeout time(seconds)
  key_file: "", // HTTPS certificate key
  crt_file: "", // HTTPS certificate crt
  encoding: "utf-8", // Character Encoding

  logs_level: "info", // Level log is printed to the console, "debug" | "info" | "warning" | "error"
  logs_path: "./logs", // Log file directory
  // sens_fields: ["password"] // Sensitive words
};