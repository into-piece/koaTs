import * as Koa from "koa";
import * as Router from "koa-router";
const logger = require("koa-logger");
// import {config} from './utils/index'

// 实例化koa
const app = new Koa();
const router = new Router();

app.use(logger());

router.get("/*", async (ctx: any) => {
  ctx.body = "Hello World!";
});

app.use(router.routes());

console.log("Server running on port 8100");

// // 答应一下响应信息
app.use(async (ctx, next) => {
  const start = new Date().getDate();
  let timer: number;
  try {
    await next();
    timer = new Date().getDate();
    const ms = timer - start;
    console.log(`method: ${ctx.method}, url:${ctx.url} - ${ms}ms`);
  } catch (e) {
    timer = new Date().getDate();
    const ms = timer - start;
    console.log(`method: ${ctx.method}, url:${ctx.url} - ${ms}ms`);
  }
});

app.listen(8100);

app.on("error", (error: Error, ctx) => {
  // 项目启动错误
  ctx.body = error;
});
