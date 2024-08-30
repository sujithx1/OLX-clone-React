

import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore'; 
import React, { ReactNode } from 'react';
import { Product } from '../Components/Posts/PostType';
import { User } from 'firebase/auth/web-extension';

// export interface User{
//     id:string;
//     phone:string;
//     username:string;
// }


export interface FireBaseContextType {
    auth: Auth;
    firestore: Firestore;
  }
  
  export interface AuthContextType{
        user: User | null;
        setUser:React.Dispatch<React.SetStateAction<User | null >>

  }

  export interface ContextProps{
    children:ReactNode
    
  }
  export interface PostContextType{
    postDetails:Product | null;
    setPostDetails:React.Dispatch<React.SetStateAction<Product|null>>
  }