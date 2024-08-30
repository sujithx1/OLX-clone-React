import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Context } from './store/Context.tsx'
import { FireBaseContext } from './store/Context.tsx'
import { auth, firestore } from './firebase/config';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <FireBaseContext.Provider value={{auth,firestore}}>
     <Context>

      <App />
     </Context>
    </FireBaseContext.Provider>
  </StrictMode>,
)
