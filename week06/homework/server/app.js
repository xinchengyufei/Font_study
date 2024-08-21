const Koa = require('koa');
const path = require('path');
const { koaBody } = require('koa-body');
const serve = require('koa-static');
const koajwt = require('koa-jwt');
const { JWT_SECRET } = require('./config/config.default');

const routes = require('./router');

const app = new Koa();

const UPLOADDIR = 'upload';

// 全局异常处理
process.on('uncaughtException', (err, origin) => {
  console.log(`Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*'); // 允许任何域名发起的请求
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // 允许的 HTTP 方法
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With'); // 允许的请求头
  ctx.set('Access-Control-Max-Age', 3600); // 预检请求的有效期，单位是秒

  // 如果是预检请求，则直接返回 200 OK
  if (ctx.request.method === 'OPTIONS') {
    ctx.status = 200;
  } else {
    await next();
  }
});

// 静态资源目录，
app.use(serve('../client/dist'));
app.use(require('koa-mount')(`/${UPLOADDIR}`, serve(UPLOADDIR)));

app.use(
  koaBody({
    multipart: true,
    formidable: {
      keepExtensions: true,
      maxFieldsSize: 10 * 1024 * 1024,
      uploadDir: path.resolve(__dirname, UPLOADDIR),
    },
  })
);

// 统一接口错误处理
app.use(async (ctx, next) => {
  try {
    await next();
    // 洋葱模型，成功 last
    if (ctx.response.status === 404 && !ctx.response.body) {
      ctx.throw(404);
    }
  } catch (error) {
    // #3
    // 洋葱模型，失败 last
    const { url = '' } = ctx.request;
    const { status = 500, message } = error;
    if (url.startsWith('/api')) {
      ctx.status = typeof status === 'number' ? status : 500;
      ctx.body = {
        msg: message,
      };
    }
  }
});

app.use(koajwt({ secret: JWT_SECRET }).unless({ path: [/\/user\//] }));

// 加载数据路由
app.use(routes.routes());

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
