import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import React from 'react'
import ReactDOM from 'react-dom/client'
import 'react-tabs/style/react-tabs.css';
import './index.scss'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/homepage'
import NotFound from './pages/404'
import Layout from './components/layout'
import GroupPage from './pages/group'


const queryClient = new QueryClient


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/group/:slug",
        element: <GroupPage />
      }
    ]
  },

]);

   

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
