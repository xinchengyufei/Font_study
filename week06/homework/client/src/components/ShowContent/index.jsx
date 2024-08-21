import { useState } from 'react'
import { Pagination, Button, Layout, theme, Table, Form, Tag, Popconfirm, Space, Image, Tooltip } from 'antd'
import dayjs from 'dayjs'
import { PlusOutlined } from '@ant-design/icons'
import ClickModal from '../ClickModal'
import useOptions from '@/hooks/useOptions'
import { useSelector } from 'react-redux'
import './index.css'

const { Content } = Layout

export default function ShowContent({paginationChange, addItem, editItem, deleteItem,  data, pageInfo}) {
    // modal显示状态、复用modal是编辑还是添加、 modal的表单以及Table的列
    const [isModalVisible, setIsModalVisible] = useState(false)
    const lang = useSelector((state) => state.language.lang)
    const [mode, setMode] = useState(null)
    const [modalForm] = Form.useForm()
    const { token: { colorBgContainer}, } = theme.useToken()
    const {options,_} = useOptions()
    const columns = [
      {
        title: (lang==='zh'?'编号':'id'),
        key: 'id',
        render: (_, record, index) => index + 1 + (pageInfo.pageNo - 1) * pageInfo.pageSize,
      },
      {
        title: (lang==='zh'?'名称':'name'),
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: (lang==='zh'?'描述':'description'),
        dataIndex: 'description',
        key: 'description',
        render: (description) => {
          const maxLength = 30;
          const truncatedDescription = description.substring(0, maxLength) + (description.length > maxLength ? '...' : '')
          return (
            <Tooltip title={description}>
              <span>{truncatedDescription}</span>
            </Tooltip>
          )
        },
      },
      {
        title: (lang==='zh'?'添加时间':'add time'),
        dataIndex: 'time',
        key: 'time',
        render: (time) => {
          return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
        },
      },
      {
        title: (lang==='zh'?'标签':'tags'),
        key: 'tags',
        dataIndex: 'tags',
        render: (tags) => {
          return tags.map(tagId => {
            const tag = options.find(t => t.id === tagId)
            if (tag) {
              return <Tag color={tag.color || 'blue'} key={tag.id}>{tag.name}</Tag>
            }
            return null
          })
        },
      },
      {
        title: (lang === 'zh'?'图片':'picture'),
        dataIndex: 'url',
        key: 'url',
        render: url => (
          <Image width={50} src={url} preview={false} />
        ),
      },
      {
        title: (lang === 'zh'?'操作':'action'),
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <a onClick={() => actoinEdit(record)}>{lang === 'zh'? '编辑':'edit'}</a>
            <Popconfirm
              title={lang==='zh'?"确定删除？":'Are you sure delete?'}
              onConfirm={() => actoinDelete(record)}
            >
              <a style={{color:"red"}}>{lang === 'zh'? '删除':'delete'}</a>
            </Popconfirm>
          </Space>
        ),
      },
    ]

    // 点击添加数据：弹出modal框
    const onClickleAddItem = () => {
      setMode(null)
      modalForm.resetFields()
      setIsModalVisible(true)
    }
    
    // modal框确认事件，添加和修改复用
    const handleOk = () => {
      modalForm.validateFields().then(values => {
          if(mode){
            const newvalues = {
              id:mode.id,
              ...values,
            }
            editItem(newvalues)
          } else {
            addItem(values)
          }   
          modalForm.resetFields()
          setIsModalVisible(false)
      }).catch(info => {
          console.log('Validate Failed:', info)
      })
    }

    // modal框取消事件
    const handleCancel = () => {
      modalForm.resetFields()
      setIsModalVisible(false)
    }

    // 操作下的编辑事件
    const actoinEdit = (value) => {
      setMode(value)
      modalForm.setFieldsValue(value)
      setIsModalVisible(true)
    }

    // 操作下的删除事件
    const actoinDelete =(value) => {
      deleteItem(value)
    }

    // 分页，点击不同页数和每页数据条数重新获取数据
    const handlePageChange = (page, pageSize) => {
      paginationChange(page, pageSize)
    }
    
    return (
        <Content className='content bottom-content' style={{ background: colorBgContainer }}>
            <div className='add-item to-right'>
                <Button type="primary" icon={ <PlusOutlined /> } onClick={onClickleAddItem}>
                    {lang === 'zh'?'添加数据':'add data'}
                </Button>
            </div>
            <ClickModal modalForm={modalForm} mode={mode} isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} ></ClickModal>
            <Table rowKey="id" bordered={true} columns={columns} dataSource={data} pagination={false}/>
            <div className='anti-pagination to-right'>
                <Pagination current={pageInfo.pageNo} pageSize={pageInfo.pageSize} total={pageInfo.total} onChange={handlePageChange}
                showSizeChanger showQuickJumper size='small' showTotal={(total) => (lang === 'zh'?`共 ${total} 条数据`:`total ${total} data`)}
                />
            </div>
        </Content>
    )
}