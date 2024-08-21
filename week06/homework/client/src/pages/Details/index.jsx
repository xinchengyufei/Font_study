import { useEffect, useState } from 'react'
import { message } from 'antd'
import FormContent from '@/components/FormContent'
import ShowContent from '@/components/ShowContent'
import { getDataApi, addDataApi, deleteDataApi, changeDataApi } from '@/services/data'
import './index.css'

const Details = () => {
  // 数据管理页面展示的数据：列表展示的数据，分页的数据以及请求的参数
  const [tableData, setTableData] = useState([])
  const [pageInfo, setPageInfo] = useState({ pageNo: 1, pageSize: 10, total: 0, })
  const [reqData, setReqData] = useState({
    pageNo: 1,
    pageSize : 10,
    name : '',
    tags: '',
    startTime : '',
    endTime : '',
  })

  async function fetchDatas(reqData) {
    const {data} = await getDataApi(reqData)
    setTableData(data.dataInfo)
    setPageInfo({
      ...pageInfo,
      pageNo: data.pageInfo.pageNo,
      pageSize: data.pageInfo.pageSize,
      total: data.pageInfo.total,
    })
  }

  // 用于页面渲染后的数据拉取和请求参数变化后的数据拉取
  useEffect(() => {
    fetchDatas(reqData)
  },[reqData])

  // 数据管理：搜索区域搜索功能
  const handleSearch = (values) => {
    setReqData({
      ...reqData,
      name : values.name === undefined ? '': values.name,
      tags: values.tag === undefined? '' : values.tag,
      startTime : values.date === undefined ? '' : values.date[0].valueOf(),
      endTime : values.date === undefined ? '' : values.date[1].valueOf(),
    })
  }

  const handleReset = () => {
    fetchDatas()
  } 

  // 数据管理：添加数据功能
  const addItem = async (value)  => {
    try {
      const response = await addDataApi(value)
      if (response.code === 201) {
        fetchDatas()
        message.success('添加数据成功!')
      }
    } catch (error) {
      message.error('添加数据失败!')
    }
  }

  // 数据管理：编辑数据
  const editItem = async (value) => {
    try {
      const response = await changeDataApi(value)
      if (response.code === 201) {
        message.success('修改数据成功!')
        fetchDatas()
      }
    } catch (error) {
      message.error('修改数据失败!')
    }
  }

  // 数据管理：删除数据
  const deleteItem = async (value) => {
    try {
      const response = await deleteDataApi(value.id)
      if (response.code === 204) {
        fetchDatas()
        message.success('删除数据成功!')
      }
    } catch (error) {
      message.error('删除数据失败:')
    }
  }
  
  // 数据管理：分页功能
  const paginationChange = (page, pageSize) => {
    setReqData({
      ...reqData,
      pageNo: page,
      pageSize : pageSize,
    })
  }

  return (
      <>
        <FormContent handleSearch={handleSearch} handleReset={handleReset}></FormContent>
        <ShowContent paginationChange={paginationChange} addItem={addItem} editItem={editItem} deleteItem={deleteItem} data={tableData} pageInfo={pageInfo}></ShowContent>
      </>
  )
}

export default Details