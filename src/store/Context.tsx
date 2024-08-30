import React, { createContext, useState } from "react";

// import { auth, firestore } from './firebase/config'; // Import your Firebase services
import { AuthContextType, ContextProps, FireBaseContextType } from "./ContextTypes";
import { User  } from "firebase/auth/web-extension";



  export const FireBaseContext = createContext<FireBaseContextType | null>(null);

  export const AuthContext=createContext<AuthContextType |null>(null)

 export const Context:React.FC<ContextProps>=({children})=>{

  const [user,setUser]=useState< User| null >(null)
  return (
    <AuthContext.Provider value={{user,setUser}}>
      {children}
    </AuthContext.Provider>
  )
  

}

