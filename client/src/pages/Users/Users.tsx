import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Context } from '../../main'
import { Container, Title } from './styles'
import { Table } from 'antd'
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from 'recharts'
import { toLocaleDateString } from '../Profile/Profile'

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
      key: 'updatedAt',
      render: (text: Date) => toLocaleDateString(text)
    }
  ]

  const data = usersStore.users.map((user: any) => {
    return {
      count: user.favorites.length,
      user: user.username
    }
  })

  return (
    <Container>
      <Table columns={columns} dataSource={usersStore.users} />
      <Title>Колличество избранных наборов данных пользователей</Title>
      <BarChart width={1000} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="user" allowDecimals={false} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </Container>
  )
}

export default observer(Users)
