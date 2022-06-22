import { Button, Form, Input, Upload, UploadProps } from 'antd'
import { observer } from 'mobx-react-lite'
import { Container, SubTitle, Title } from './styles'
import { InboxOutlined } from '@ant-design/icons'

const { Dragger } = Upload

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files)
  }
}

function AdminPanel() {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
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
        onFinishFailed={onFinishFailed}
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
              Поддерживается только загрузка одного файла.
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
