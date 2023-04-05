import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserProvider } from './Context/UserContext';
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BackendURL

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
)
