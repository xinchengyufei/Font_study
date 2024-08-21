import { Card, Form, Input, Button, Typography, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import './index.css'
import { registerApi } from '@/services/users'

export default function Register() {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const validatePasswords = (_, value) => {
    if (value && value !== form.getFieldValue('password')) {
      return Promise.reject(new Error('两次输入的密码不匹配！'))
    }
    return Promise.resolve()
  }

  const onFinish = async (values) => {
    try {
      const response = await registerApi(values)
      if (response.code === 201) {
        message.success('注册成功！')
        navigate('/login')
      }
    } catch (error) {
      message.error('注册失败！')
    }
  }

  return (
    <div className='page-container'>
      <Card className='cardstyle'>
        <h1 className='page-title'>注册</h1>
        <Form form={form} name="register" onFinish={onFinish} initialValues={{ remember: true }} >
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]} >
            <Input size='large' placeholder="用户名" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]} >
            <Input.Password size='large' placeholder="密码" />
          </Form.Item>

          <Form.Item name="confirmPassword" dependencies={['password']} hasFeedback
            rules={[ { required: true, message: '请再次输入密码！', },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  return validatePasswords(getFieldValue, value);
                },
              }),
            ]}
          >
            <Input.Password size='large' type="password" placeholder="确认密码" />
          </Form.Item>

          <Form.Item >
            <Button className='button-submit' type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
        <div className='tail-text'>
          <Typography.Link onClick={() => {preventDefault();navigate('/register')}} href="/login">已有账号？去登录{' >'} </Typography.Link>
        </div>
      </Card>
    </div>
  )
}