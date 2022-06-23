import { Button, Form, Input, Upload, UploadProps, notification } from 'antd'
import { observer } from 'mobx-react-lite'
import { Container, SubTitle, Title } from './styles'
import { InboxOutlined } from '@ant-design/icons'
import { Context } from '../../main'
import { useContext } from 'react'
import { API_URL } from '../../http'

const { Dragger } = Upload

const dummyRequest = ({}) => {
  setTimeout(() => {}, 0)
}

function AdminPanel() {
  const [form] = Form.useForm()
  const { datasetStore } = useContext(Context)

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    action: `${API_URL}/dataset/uploadArchive`,
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    },
    onChange(info) {
      const accessFileTypes = ['application/zip']
      console.log(info)
      if (!accessFileTypes.includes(String(info.file.type))) {
        notification['error']({
          message: 'Ошибка загрузки',
          description: 'Файл не подходящего формата'
        })
        form.resetFields()
        return false
      }
    },
    onDrop(e) {}
  }

  const onFinish = (values: any) => {
    const { title, description, preview, archive } = values
    datasetStore.addDataset(title, description, preview, archive)
    form.resetFields()
    notification['success']({
      message: 'Успех',
      description: 'Набор данных успешно добавлен'
    })
  }

  return (
    <Container>
      <Title>Загрузить новый набор данных</Title>
      <Form
        name="basic"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
        autoComplete="off"
      >
        <SubTitle>Название</SubTitle>
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Введите название' }]}
        >
          <Input />
        </Form.Item>

        <SubTitle>Описание</SubTitle>
        <Form.Item
          name="description"
          rules={[{ required: true, message: 'Введите описание' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <SubTitle>Ссылка на фотографию</SubTitle>
        <Form.Item
          name="preview"
          rules={[{ required: true, message: 'Введите ссылку на фотографию' }]}
        >
          <Input />
        </Form.Item>

        <SubTitle>Архив</SubTitle>
        <Form.Item
          name="archive"
          rules={[{ required: true, message: 'Загрузите архив' }]}
        >
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Нажмите или перенесите сюда архив чтобы его загрузить
            </p>
            <p className="ant-upload-hint">
              Поддерживается загрузка только одного файла.
            </p>
          </Dragger>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0 }}>
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </Container>
  )
}

export default observer(AdminPanel)
