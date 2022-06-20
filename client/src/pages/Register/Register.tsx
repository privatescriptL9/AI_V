import { Button, Form, Input, notification } from 'antd'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../main'

function Register() {
  const navigate = useNavigate()
  const { store } = useContext(Context)
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    const { username, email, password } = values
    const response = await store.register(username, email, password)
    form.resetFields()
    if (response) {
      notification['error']({
        message: 'Ошибка',
        description: response
      })
    } else {
      notification['info']({
        message: 'Информация',
        description: 'Письмо отправленно на электронную почту'
      })
    }
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 13 }}
      initialValues={{ remember: true }}
      form={form}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Имя пользователя"
        name="username"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите свое имя пользователя'
          }
        ]}
      >
        <Input />
      </Form.Item>

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

      <Form.Item
        name="confirm"
        label="Повтор пароля"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Повторите свой пароль'
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject('Пароли не совпадают')
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
        <Button type="link" onClick={() => navigate('/login')}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  )
}

export default observer(Register)
