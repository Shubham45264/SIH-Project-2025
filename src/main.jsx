import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'   // ✅ this loads your App.jsx
import './index.css'          // ✅ this loads Tailwind

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
