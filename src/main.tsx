import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/next"
import './index.css'

import App from './App'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Analytics />
    <App />
    <SpeedInsights />
  </StrictMode>,
)
