import React from 'react'
import ReactDOM from 'react-dom/client'
import { db } from './assets/lib/firebase-config.ts'
import MainPage from './assets/components/App.tsx';

console.log(db);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>,
)
