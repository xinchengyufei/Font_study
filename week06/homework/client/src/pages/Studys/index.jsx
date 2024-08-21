import { useEffect, useState } from 'react'
import { Form, Input, Modal, Button, Layout, theme, Card, List, Space, Popconfirm, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { getStudyApi, addStudyApi, changeStudyApi, deleteStudyApi } from '@/services/study'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './index.css'

const { Content } = Layout

const Study = () => {
  const { token: { colorBgContainer}, } = theme.useToken()
  const [markdownText, setMarkdownText] = useState('')
  const lang = useSelector((state) => state.language.lang)
  const [studyForm] = Form.useForm()
  const [mode, setMode] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [studyData, setStudyData] = useState([])

  const fetchStudy = async () => {
    const res = await getStudyApi()
    setStudyData(res.data)
  }

  useEffect(() => {
    fetchStudy()
  }, [])

  const handleMarkdownChange = (event) => {
    setMarkdownText(event.target.value)
  }

  const handleAdd = () => {
    setMode(null)
    setMarkdownText('')
    studyForm.resetFields()
    setIsModalVisible(true)
  }

  const handleOk = () => {
    studyForm.validateFields().then(values => {
      if (mode) {
        const newvalues = {
          id:mode.id,
          ...values,
        }
        editItem(newvalues)
      } else {
        addItem(values)
      }
      studyForm.resetFields()
      setMarkdownText('')
      setIsModalVisible(false)
    }).catch(info => {
      console.log('Validate Failed:', info)
    })
  }

  const handleCancel = () => {
    studyForm.resetFields()
    setIsModalVisible(false)
  }

  const addItem = async (value)  => {
    try {
      const response = await addStudyApi(value)
      if (response.code === 201) {
        fetchStudy()
        message.success('添加成功！')
      }
    } catch (error) {
      message.error('添加数据失败:')
    }
  }

  const editItem = async (value) => {
    try {
      const response = await changeStudyApi(value)
      if (response.code === 201) {
        fetchStudy()
        message.success('修改成功！')
      }
    } catch (error) {
      message.error('修改数据失败:')
    }
  }

  const actoinConfirm = async (value) => {
    try {
      const response = await deleteStudyApi(value.id)
      if (response.code === 204) {
        fetchStudy()
        message.success('删除成功！')
      }
    } catch (error) {
      message.error('删除数据失败:')
    }
  }

  const actionEdit = (value) => {
    setMode(value)
    studyForm.setFieldsValue(value)
    setMarkdownText(value.content)
    setIsModalVisible(true)
  }

  return (
    <Content className='content' style={{ background: colorBgContainer }}>
      <div className='add-item to-right'>
        <Button type="primary" className='add-button' icon={ <PlusOutlined /> } onClick={handleAdd}>
            {lang === 'zh'? '添加心得':'add think'}
        </Button>
        <Modal title={mode ? (lang === 'zh'? '修改心得':'edit think') : (lang === 'zh'? '添加心得':'add think')}
          open={isModalVisible} onOk={handleOk} onCancel={handleCancel}
        >
          <Form form={studyForm} layout="horizontal" >
            <Form.Item  label={lang === 'zh'? '标题：':'title：'} name="title" rules={[ { required: true, message: '* 请输入标题', }, ]} >
              <Input showCount placeholder="请输入标题：" maxLength={20} />
            </Form.Item>
            <Form.Item label={lang === 'zh'? '心得：':'think：'}  name="content"
                rules={[ { required: true, message: '* 请输入心得内容', }, ]}
            >
                <Input.TextArea showCount rows={10} cols={80} value={markdownText} onChange={handleMarkdownChange} placeholder="请填写你的心得，支持MarkDown语法" />
            </Form.Item>
            <div>
              <span>{lang === 'zh'? '内容预览':'Content Preview'}</span>
              <ReactMarkdown children={markdownText} remarkPlugins={[remarkGfm]} />
            </div>
          </Form>
        </Modal>
      </div>
      <List itemLayout="vertical"  dataSource={studyData} pagination={{ pageSize: 4, }}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title}>
              <ReactMarkdown children={item.content} remarkPlugins={[remarkGfm]} />
              <div className='to-right'>
                <span className='text-time'>{lang === 'zh'? '更新时间：':'update time：'}{ dayjs(item.time).format('YYYY-MM-DD HH:mm:ss') }</span>
                <Space size="middle">
                  <a onClick={()=> actionEdit(item)}>{lang === 'zh'? '编辑':'edit'}</a>
                  <Popconfirm
                    title={lang==='zh'?"确定删除？":'Are you sure delete?'}
                    onConfirm={() => actoinConfirm(item)}
                  >
                    <a style={{color:"red"}}>{lang === 'zh'? '删除':'delete'}</a>
                  </Popconfirm>
                </Space>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </Content>
  )
}

export default Study