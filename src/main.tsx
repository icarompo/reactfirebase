import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { db } from './assets/lib/firebase-config.ts'

console.log(db);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
