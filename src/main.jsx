import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/main.sass' 

//Redux
import {Provider} from "react-redux"
import { Store } from './store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store} >
      <App />
    </Provider>
  </React.StrictMode>,
)
