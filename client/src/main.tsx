import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.less'
import 'antd/dist/antd.css'
import Store from './store/store'
import DatasetStore from './store/dataset.store'
import UsersStore from './store/users.store'
import CommentStore from './store/comment.store'

interface IStore {
  store: Store
  datasetStore: DatasetStore
  usersStore: UsersStore
  commentStore: CommentStore
}

const store = new Store()
const datasetStore = new DatasetStore()
const usersStore = new UsersStore()
const commentStore = new CommentStore()

export const Context = createContext<IStore>({
  store,
  datasetStore,
  usersStore,
  commentStore
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Context.Provider value={{ store, datasetStore, usersStore, commentStore }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context.Provider>
  </React.StrictMode>
)
