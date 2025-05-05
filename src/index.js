// File: src/index.js
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import store from './store'
import { ClientProvider } from './context/ClientContext' // 🧠 Make sure this path matches your file structure

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ClientProvider>
      <App />
    </ClientProvider>
  </Provider>
)
