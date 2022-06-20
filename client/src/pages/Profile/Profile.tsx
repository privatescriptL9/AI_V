import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Avatar, Button, Upload, UploadProps, notification } from 'antd'
import { Context } from '../../main'
import {
  Container,
  TopContainer,
  Info,
  AvatarContainer,
  ChangeAvatar
} from './styles'
import { UserOutlined } from '@ant-design/icons'
import { UploadOutlined } from '@ant-design/icons'
import { API_URL } from '../../http'

export function toLocaleDateString(date: Date) {
  return new Date(date).toLocaleDateString('ru-ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })
}

function Profile() {
  const { store } = useContext(Context)

  const props: UploadProps = {
    name: 'file',
    maxCount: 1,
    action: `${API_URL}/user/changeAvatar`,
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    },
    fileList: [],
    async onChange(info) {
      const accessFileTypes = ['image/jpeg', 'image/png']

      if (accessFileTypes.includes(String(info.file.type))) {
        notification['success']({
          message: 'Успех',
          description: `${info.file.name} успешно загружен`
        })

        await store.checkAuth()
        location.reload()
      } else {
        notification['error']({
          message: 'Ошибка загрузки',
          description: 'Файл не подходящего формата'
        })
      }
    }
  }

  return (
    <Container>
      <TopContainer>
        <AvatarContainer>
          <Avatar
            shape="square"
            size={250}
            icon={<UserOutlined />}
            src={store.user.avatar_url}
          />
          <ChangeAvatar>
            <Upload {...props}>
              <Button type="dashed" icon={<UploadOutlined />}>
                Загрузить
              </Button>
            </Upload>
          </ChangeAvatar>
        </AvatarContainer>
        <Info>
          <div>
            Дата регистрации: {toLocaleDateString(store.user.createdAt)}
          </div>
          <div>Электронная почта: {store.user.email}</div>
          <div>Имя пользователя: {store.user.username}</div>
        </Info>
      </TopContainer>
    </Container>
  )
}

export default observer(Profile)
