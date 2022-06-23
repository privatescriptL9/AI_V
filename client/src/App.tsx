import { observer } from 'mobx-react-lite'
import { ReactElement, useContext, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout/AppLayout'
import AuthLayout from './layouts/AuthLayout/AuthLayout'
import { Context } from './main'
import AdminPanel from './pages/AdminPanel/AdminPanel'
import DataStore from './pages/DataStore/DataStore'
import Favorites from './pages/Favorites/Favorites'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'
import Loading from './components/Loading/Loading'
import Dataset from './pages/Dataset/Dataset'
import Settings from './pages/Settings/Settings'
import Users from './pages/Users/Users'
import Datasets from './pages/Datasets/Datasets'
import Welcome from './pages/Welcome/Welcome'

function App(): ReactElement | null {
  const { store } = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  if (store.isLoading) {
    return <Loading />
  }

  if (store.isAuth) {
    return (
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          {store.user.role === 'ADMIN' ? (
            <>
              <Route path="admin" element={<AdminPanel />} />
              <Route path="users" element={<Users />} />
              <Route path="datasets" element={<Datasets />} />
            </>
          ) : (
            <>
              <Route path="data" element={<DataStore />} />
              <Route path="data/:id" element={<Dataset />} />
              <Route path="favorites" element={<Favorites />} />
            </>
          )}
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/" element={<AuthLayout />}>
        <Route path="auth" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  )
}

export default observer(App)
