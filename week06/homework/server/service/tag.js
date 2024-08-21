const { read, save } = require('../lib/util');
const { v4: uuidv4 } = require('uuid');

const FILE_NAME = 'tags';
const saveTag = data => save(data, FILE_NAME);

/**
 * 添加新标签
 * @param {string} name - 标签名称
 */
async function addTag(name) {
  try {
    const tagList = await read(FILE_NAME);
    const isNameExists = tagList.some(tag => tag.name === name);

    if (isNameExists) {
      throw { status: 400, message: '标签名已存在' };
    }

    const newTag = {
      id: uuidv4(),
      name,
    };

    saveTag([...tagList, newTag]);
    return newTag;
  } catch (error) {
    throw error;
  }
}

/**
 * 获取所有标签
 */
async function getTags() {
  try {
    const data = await read(FILE_NAME);
    return { data: data.reverse() };
  } catch (error) {
    throw error;
  }
}

/**
 * 修改标签
 * @param {string} id - 标签ID
 * @param {string} name - 新标签名称
 */
async function editTag(id, name) {
  try {
    const tagList = await read(FILE_NAME);
    const isNameExists = tagList.some(tag => tag.id === id);

    if (!isNameExists) {
      throw { status: 400, message: '标签不存在' };
    }

    const newTagList = tagList.map(tag => {
      if (tag.id === id) {
        tag.name = name;
      }
      return tag;
    });

    saveTag(newTagList);
  } catch (error) {
    throw error;
  }
}

/**
 * 删除标签
 * @param {string} id - 标签ID
 */
async function delTag(id) {
  try {
    const tagsList = await read(FILE_NAME);
    const isNameExists = tagsList.some(tag => tag.id === id);

    if (!isNameExists) {
      throw { status: 400, message: '标签不存在' };
    }

    const newTagsList = tagsList.filter(tag => tag.id !== id);
    saveTag(newTagsList);
  } catch (error) {
    throw error;
  }
}

/**
 * 批量删除标签 
 * @param  {Array<string>} ids - 标签ID数组
 */
async function delTags(ids) {
  try {
    const tagsList = await read(FILE_NAME);
    const tagsMap = new Map(tagsList.map(tag => [tag.id, tag])); // 创建一个Map，方便查找

    // 验证所有ID是否存在
    const missingIds = ids.filter(id => !tagsMap.has(id))
    if (missingIds.length > 0) {
      throw { status: 400, message: `以下ID的标签不存在: ${missingIds.join(', ')}` };
    }

    const newTagsList = tagsList.filter(tag => !ids.includes(tag.id));
    saveTag(newTagsList);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addTag,
  getTags,
  editTag,
  delTag,
  delTags,
};
