import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Context } from '../../main'
import { Container } from './styles'
import { Table } from 'antd'

function Users() {
  const { usersStore } = useContext(Context)

  useEffect(() => {
    usersStore.getAll()
  }, [])

  const columns = [
    {
      title: 'Имя пользователя',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'Электронная почта',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Дата регистрации',
      dataIndex: 'updatedAt',
      key: 'updatedAt'
    }
  ]

  return (
    <Container>
      <Table columns={columns} dataSource={usersStore.users} />
    </Container>
  )
}

export default observer(Users)
