import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPage from './LoginPage.jsx'
import Register  from './Register.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <LoginPage /> */}

    
    <Register/>
  </StrictMode>,
)
