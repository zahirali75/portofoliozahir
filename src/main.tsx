import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Font di-self-host (tanpa CDN, tanpa permintaan ke pihak ketiga).
// Inter Variable tidak punya berkas per-subset: index.css = sumbu berat (wght)
// dan hanya memuat latin + latin-ext, jadi tetap ringan.
import '@fontsource-variable/inter/index.css'
import '@fontsource/instrument-serif/latin.css'

import { App } from './App'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
