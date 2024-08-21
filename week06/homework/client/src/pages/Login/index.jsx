import { Card, Form, Input, Button, Typography, message } from 'antd'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/user'
import { useNavigate } from 'react-router-dom'
import './index.css'

export default function Login() {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async (values) => {
    try {
      await dispatch(fetchLogin(values))
      navigate('/')
      message.success('登录成功！')
    } catch (error) {
      message.error('登录失败！用户名或密码错误')
    }
  }

  return (
    <div className='page-container'>
      <Card className='cardstyle'>
        <h1 className='page-title'>登录</h1>
        <Form form={form} name="login" onFinish={onFinish} initialValues={{ remember: true }} >
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]} >
            <Input size='large' placeholder="用户名" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]} >
            <Input.Password size='large' placeholder="密码" />
          </Form.Item>

          <Form.Item >
            <Button className='button-submit' type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
        <div className='tail-text'>
        <Typography.Link onClick={() => {preventDefault();navigate('/register')}} href="/register">没有账号？去注册{' >'} </Typography.Link>
        </div>
      </Card>
    </div>
  )
}
