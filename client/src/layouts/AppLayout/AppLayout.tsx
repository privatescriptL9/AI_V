import React, { useContext, useState } from 'react'
import { Layout, Menu, Button, Avatar } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ToolOutlined,
  DatabaseOutlined,
  BookOutlined,
  SlidersOutlined,
  TeamOutlined
} from '@ant-design/icons'
import { Outlet, useNavigate } from 'react-router-dom'
import { Container, Header, Logo, LeftBlock, Username } from './styles'
import { observer } from 'mobx-react-lite'
import { Context } from '../../main'

const { Sider, Content } = Layout

function AppLayout() {
  const { store } = useContext(Context)
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  const navLinks =
    store.user.role === 'ADMIN'
      ? [
          {
            key: '3',
            icon: <ToolOutlined />,
            label: 'Админ',
            onClick: () => navigate('/admin')
          },
          {
            key: '4',
            icon: <TeamOutlined />,
            label: 'Пользователи',
            onClick: () => navigate('/users')
          },
          {
            key: '5',
            icon: <DatabaseOutlined />,
            label: 'Наборы данных',
            onClick: () => navigate('/datasets')
          }
        ]
      : [
          {
            key: '3',
            icon: <DatabaseOutlined />,
            label: 'Хранилище данных',
            onClick: () => navigate('/data')
          },
          {
            key: '4',
            icon: <BookOutlined />,
            label: 'Избранное',
            onClick: () => navigate('/favorites')
          }
        ]

  const handleLogout = () => {
    store.logout()
    localStorage.removeItem('token')
  }

  return (
    <Container>
      <Layout style={{ height: '100%' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Logo>AI_V</Logo>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'Профиль',
                onClick: () => navigate('/')
              },
              {
                key: '2',
                icon: <SlidersOutlined />,
                label: 'Настройки',
                onClick: () => navigate('/settings')
              },
              ...navLinks
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed)
              }
            )}
            <LeftBlock>
              <Username>{store.user.username}</Username>
              <Avatar
                shape="square"
                size="large"
                icon={<UserOutlined />}
                src={store.user.avatar_url}
              />
              <Button type="primary" onClick={handleLogout}>
                Выйти
              </Button>
            </LeftBlock>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              overflowY: 'auto'
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Container>
  )
}

export default observer(AppLayout)
