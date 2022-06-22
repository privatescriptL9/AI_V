import { Button, Form, Input, notification } from 'antd'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '../../main'
import { Container, SubTitle, Title } from './styles'

function Settings() {
  const { store } = useContext(Context)

  const onFinish = (values: any) => {
    store.updateInfo(values.username, values.password)
    notification['success']({
      message: 'Успех',
      description: 'Данные успешно обновлены'
    })
  }

  return (
    <Container>
      <Title>Обновить информацию профиля</Title>
      <Form
        name="basic"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <SubTitle>Сменить имя пользователя</SubTitle>
        <Form.Item name="username">
          <Input />
        </Form.Item>

        <SubTitle>Сменить пароль</SubTitle>
        <Form.Item
          name="password"
          rules={[
            {
              min: 6,
              message: 'Минимум 6 символов'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0 }}>
          <Button type="primary" htmlType="submit">
            Обновить
          </Button>
        </Form.Item>
      </Form>
    </Container>
  )
}

export default observer(Settings)
