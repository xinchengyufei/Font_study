// 引入数据服务模块
const studyService = require('../service/study');

const { v4: uuidv4 } = require('uuid');

/**
 * 新增数据接口处理函数
 * @param {Object} ctx - Koa上下文对象
 */
async function addStudyData(ctx) {
  try {
    const { title = '', content = '' } = ctx.request.body;
    if (!title || !content) {
      throw { status: 400, message: 'name或description不能为空' };
    }
    if (title.length > 20) {
      throw { status: 400, message: 'name长度不符合要求' };
    }

    const newData = {
      id: uuidv4(),
      title,
      content,
      time: Date.now(),
    };
    // 调用服务模块的新增数据函数
    await studyService.addStudyData(newData);
    // 封装返回数据格式
    const responseData = {
      code: 201,
      msg: '新增成功',
    };
    // 返回结果
    ctx.body = responseData;
  } catch (error) {
    throw error;
  }
}

/**
 * 数据查询接口处理函数
 * @param {Object} ctx - Koa上下文对象
 */
async function getStudyData(ctx) {
  try {
    const { data = [] } = await studyService.getStudyData();

    const responseData = {
      code: 200,
      msg: '查询成功',
      data,
    };

    ctx.body = responseData;
  } catch (error) {
    throw error;
  }
}

/**
 * 修改数据接口处理函数
 * @param {Object} ctx - Koa上下文对象
 */
async function editStudyData(ctx) {
  try {
    const { id, title , content } = ctx.request.body;

    if (!id || !title || !content) {
      throw { status: 400, message: 'id、name或description不能为空' };
    }

    if (title.length > 20) {
      throw { status: 400, message: 'name长度不符合要求' };
    }

    // 调用服务模块的新增数据函数
    await studyService.editStudyData(id, title , content);

    const responseData = {
      code: 201,
      msg: '修改成功',
    };

    ctx.body = responseData;

  } catch (error) {
    throw error;
  }
}

/**
 * 删除数据接口处理函数
 * @param {Object} ctx - Koa上下文对象
 */
async function delStudyData(ctx) {
  try {
    const { id } = ctx.request.query;
    if (!id) {
      throw { status: 400, message: 'id不能为空' };
    }
    // 调用标签服务模块的删除函数
    const result = await studyService.delStudyData(id);
    // 封装返回数据格式
    const responseData = {
      code: 204,
      msg: '删除成功',
      data: result,
    };
    // 返回结果
    ctx.body = responseData;
  } catch (error) {
    // 处理错误情况
    throw error;
  }
}

// 导出接口处理函数
module.exports = {
  getStudyData,
  addStudyData,
  editStudyData,
  delStudyData,
};
