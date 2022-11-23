import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { atom } from 'jotai'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import 'react-tabs/style/react-tabs.css';


const queryClient = new QueryClient


   

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
