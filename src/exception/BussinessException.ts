/*
 * @Description: 业务异常全局处理
 * @Usage: 
 * @Author: richen
 * @Date: 2022-02-14 11:26:20
 * @LastEditTime: 2023-08-15 14:35:51
 */

import { KoattyContext, Exception, ExceptionHandler } from "koatty";

@ExceptionHandler()
export class BussinessException extends Exception {
  async handler(ctx: KoattyContext): Promise<any> {
    ctx.status = this.status;
    ctx.type = "application/json";
    const body: any = ctx.body ? JSON.stringify(ctx.body) : (ctx.body || null);
    switch (ctx.protocol) {
      case "ws":
      case "wss":
        return ctx.websocket.send(body, () => ctx.websocket.emit('finish'));
      case "grpc":
        return ctx.rpc.callback(null, body);
      default:
        return ctx.res.end(`{"code": ${this.code}, "message": "${this.message || ctx.message}", "data": ${body}}`);
    }
  }
}