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
          {store.user.role === 'ADMIN' ? (
            <Route path="admin" element={<AdminPanel />} />
          ) : (
            <>
              <Route path="data" element={<DataStore />} />
              <Route path="data/:id" element={<Dataset />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="settings" element={<Settings />} />
            </>
          )}
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  )
}

export default observer(App)
