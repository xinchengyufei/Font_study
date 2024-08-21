const Router = require('koa-router');
const path = require('path');
const { read } = require('./lib/util');
const { addData, getData, editData, delData } = require('./controller/data');
const { addTag, getTags, editTag, delTag, delTags } = require('./controller/tag');
const { getStudyData, addStudyData, editStudyData, delStudyData, } = require('./controller/study');
const { register, login } = require('./controller/user');
const { setLang, getLang } = require('./controller/lang');
// const { auth } = require('./middleware/auth');

const router = new Router({ prefix: '/api' });

// 用户注册
router.post('/user/register', register);
router.post('/user/login', login);

// 定义学习心得路由
router.post('/study', addStudyData);
router.get('/study', getStudyData);
router.put('/study', editStudyData);
router.delete('/study', delStudyData);

// 定义数据路由
router.post('/data', addData);
router.get('/data', getData);
router.put('/data', editData);
router.delete('/data', delData);

// 定义切换语言接口
router.post('/lang', setLang);
router.get('/lang', getLang);

// 定义标签路由
router.post('/tags', addTag);
router.get('/tags', getTags);
router.put('/tags', editTag);
router.delete('/tags', delTag);
router.post('/tags/allDel', delTags);

// 上传图片
router.post('/upload', ctx => {
  const basename = path.basename(ctx.request.files.avatar.filepath);
  ctx.body = {
    code: 201,
    msg: '上传成功',
    path: `${ctx.origin}/upload/${basename}`,
  };
});

// 下载数据
router.get('/down', async ctx => {
  ctx.body = {
    code: 200,
    msg: '查询成功',
    data: await read(`charts/${ctx.query.frame}`),
  };
});

module.exports = router;
