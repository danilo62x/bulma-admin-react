import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './i18n'
import './assets/styles/app.scss'
import { registerSW } from 'virtual:pwa-register'

registerSW({ immediate: true })

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
