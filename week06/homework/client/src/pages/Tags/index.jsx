import { useState }  from 'react'
import { Form, Input, Modal, Popconfirm, Space, Button, Layout, theme, Table, Tag, message } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { addTagsApi, deleteTagsApi, changeTagsApi, deleteAllTagsApi } from '@/services/tags'
import useOptions from '@/hooks/useOptions'
import { useSelector } from 'react-redux'
import './index.css'

const { Content } = Layout

const Tags = () => {
  const {options, fetchTags} = useOptions()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [currentTag, setCurrentTag] = useState(null)
  const { token: { colorBgContainer}, } = theme.useToken()
  const lang = useSelector((state) => state.language.lang)

  const columns = [
    {
      title: (lang ==='zh'? '标签':'tag'),
      key: 'tags',
      dataIndex: 'name',
      render: (name, record) => (
        <Tag color={record.color || 'blue'} key={record.id}> {name} </Tag>
      ),
    },
    {
      title: (lang === 'zh'? '操作':'action'),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={()=> actionEdit(record)}>{lang === 'zh'? '编辑':'edit'}</a>
          <Popconfirm
            title={lang==='zh'?"确定删除？":'Are you sure delete?'}
            onConfirm={() => actoinConfirm(record)}
          >
            <a style={{color:"red"}}>{lang === 'zh'? '删除':'delete'}</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys)
    },
  }

  const handleOk = () => {
    form.validateFields().then(values => {
      if (currentTag) {
        const newvalues = {
          id:currentTag.id,
          ...values,
        }
        editItem(newvalues)
      } else {
        addItem(values)
      }
      form.resetFields()
      setIsModalVisible(false)
    })
    .catch(info => {
      console.log('Validate Failed:', info)
    })
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalVisible(false)
  }

  const addItem = async (value)  => {
    try {
      const response = await addTagsApi(value)
      if (response.code === 201) {
        fetchTags()
        message.success('添加数据成功！')
      }
    } catch (error) {
      message.error('添加数据失败:')
    }
  }

  const editItem = async (value) => {
    try {
      const response = await changeTagsApi(value)
      if (response.code === 201) {
        fetchTags()
        message.success('修改数据成功！')
      }
    } catch (error) {
      message.error('修改数据失败:')
    }
  }

  const handleAdd = () => {
    setCurrentTag(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleDelete = async (values) => {
    try {
      const response = await deleteAllTagsApi({ids : values})
      if (response.code === 204) {
        fetchTags()
        message.success('批量删除数据成功！')
      }
    } catch (error) {
      message.error('批量删除数据失败:')
    }
  }

  const actoinConfirm = async (value) => {
    try {
      const response = await deleteTagsApi(value.id)
      if (response.code === 204) {
        fetchTags()
        message.success('删除数据成功！')
      }
    } catch (error) {
      message.error('删除数据失败:')
    }
  }

  const actionEdit = (value) => {
    setCurrentTag(value)
    form.setFieldsValue({name: value.name })
    setIsModalVisible(true)
  }

  return (
    <Content className='content' style={{ background: colorBgContainer }}>
        <div className='add-item to-right'>
          <Button type="primary" className='add-button' icon={ <PlusOutlined /> } onClick={handleAdd}>
              {lang === 'zh'? '添加标签':'add tag'}
          </Button>
          <Button type="primary" danger icon={ <MinusOutlined /> } disabled={!(selectedRowKeys.length > 1)} onClick={() => handleDelete(selectedRowKeys)}>
            {lang === 'zh'? '删除标签':'delete tag'}
          </Button>
          <Modal title={currentTag ? (lang === 'zh'? '修改标签':'edit tag') : (lang === 'zh'? '添加标签':'add tag')}
            open={isModalVisible} onOk={handleOk} onCancel={handleCancel}
          >
            <Form form={form} layout="horizontal" >
              <Form.Item  label={lang === 'zh'? '名称：':'name'} name="name" rules={[ { required: true, message: '* 请输入名称', }, ]} >
                <Input showCount placeholder="请输入名称" maxLength={20} />
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <Table rowKey="id" rowSelection={rowSelection} bordered={true} columns={columns} dataSource={options} pagination={false}/>
    </Content>
  )
}

export default Tags