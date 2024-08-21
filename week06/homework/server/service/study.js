const { read, save } = require('../lib/util');

const FILE_NAME = 'study';

/**
 * 新增数据函数
 * @param {object} newStudyData - 新数据对象
 */
async function addStudyData(newStudyData) {
  try {
    const dataList = await read(FILE_NAME);
    save([...dataList, newStudyData], FILE_NAME);
  } catch (error) {
    throw error;
  }
}

/**
 * 获取所有心得
 */
/* eslint-disable */  
async function getStudyData() {
  try {
    // 读取data.json文件中的数据
    const studyDataList = await read(FILE_NAME);
    // 返回查询结果
    return { data: studyDataList.reverse() };
  } catch (error) {
    throw error;
  }
}

/**
 * 修改数据函数
 * @param {string} id - 数据ID
 * @param {string} title - 标题
 * @param {string} content - 心得内容
 */
/* eslint-disable */  
async function editStudyData(id, title, content ) {
  try {
    const studyDataList = await read(FILE_NAME);
    const isDataExists = studyDataList.some(data => data.id === id);

    if (!isDataExists) {
      throw { status: 400, message: '数据不存在' };
    }

    const newDataList = studyDataList.map(data => {
      if (data.id === id) {
        data.title = title;
        data.content = content;
        data.time = Date.now();
      }
      return data;
    });

    save(newDataList, FILE_NAME);
  } catch (error) {
    throw error;
  }
}

/**
 * 删除数据函数
 * @param {string} id - 数据ID
 */
async function delStudyData(id) {
  try {
    const studyDataList = await read(FILE_NAME);

    const isDataExists = studyDataList.some(data => data.id === id);
    if (!isDataExists) {
      throw { status: 400, message: '数据不存在' };
    }
    const newDataList = studyDataList.filter(data => data.id !== id);
    save(newDataList, FILE_NAME);
  } catch (error) {
    throw error;
  }
}

// 导出数据查询服务函数
module.exports = {
  getStudyData,
  addStudyData,
  editStudyData,
  delStudyData,
};
