import { Button, Form, Input, notification } from 'antd'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../main'

function Login() {
  const navigate = useNavigate()
  const { store } = useContext(Context)
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    const { email, password } = values
    const response = await store.login(email, password)
    if (response) {
      notification['error']({
        message: 'Ошибка',
        description: response
      })
    }
    form.resetFields()
    navigate('/')
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 13 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      form={form}
      autoComplete="off"
    >
      <Form.Item
        label="Эл. Почта"
        name="email"
        hasFeedback
        rules={[{ required: true, message: 'Пожалуйста введите свою почту' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        hasFeedback
        rules={[{ required: true, message: 'Пожалуйста введите свой пароль' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
        <Button type="link" onClick={() => navigate('/auth/register')}>
          Регистрация
        </Button>
      </Form.Item>
    </Form>
  )
}

export default observer(Login)
