import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <div className='bg-white text-black dark:text-white dark:bg-slate-800 min-h-screen'>
        <App />
      </div>
    </ThemeProvider>
  </StrictMode>,
)
