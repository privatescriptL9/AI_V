import { Container, Header, Time, Username, Wrapper, Body } from './styles'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { useEffect, useState } from 'react'
import UserService from '../../services/UserService'
import { toLocaleDateString } from '../../pages/Profile/Profile'

function Comment({ userId, text, createdAt }: any) {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const response = await UserService.getUserById(userId)
      setUser(response.data)
    }

    fetchUser()
  }, [])

  return (
    <Container>
      <Header>
        <Wrapper>
          <Avatar
            shape="square"
            size="large"
            icon={<UserOutlined />}
            src={user?.avatar_url}
          />
          <Username>{user?.username}</Username>
        </Wrapper>
        <Time>{toLocaleDateString(createdAt)}</Time>
      </Header>
      <Body>{text}</Body>
    </Container>
  )
}

export default Comment
