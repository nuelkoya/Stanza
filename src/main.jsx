import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {StanzaProvider} from "../src/StanzaContext"

createRoot(document.getElementById('root')).render(
  
    <StanzaProvider>
      <App />
    </StanzaProvider>
  ,
)
