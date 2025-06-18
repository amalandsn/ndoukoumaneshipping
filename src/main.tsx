
import { createRoot } from 'react-dom/client'
import { LovableProvider } from 'lovable-ui'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <LovableProvider showFloatingButton={false}>
    <App />
  </LovableProvider>
);
