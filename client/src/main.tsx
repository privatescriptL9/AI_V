import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.less'
import 'antd/dist/antd.css'
import Store from './store/store'
import DatasetStore from './store/dataset.store'

interface IStore {
  store: Store
  datasetStore: DatasetStore
}

const store = new Store()
const datasetStore = new DatasetStore()

export const Context = createContext<IStore>({
  store,
  datasetStore
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Context.Provider value={{ store, datasetStore }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context.Provider>
  </React.StrictMode>
)
