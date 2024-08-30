import { createContext, useState } from "react";
import { ContextProps, PostContextType } from "./ContextTypes";
import { Product } from "../Components/Posts/PostType";
// import {}from 'firebase/auth'

export const PostDetailContext=createContext<PostContextType| null>(null)

export const Post:React.FC<ContextProps>=({children})=>
{
    const [postDetails,setPostDetails]=useState<Product | null>(null)

    return (
        <PostDetailContext.Provider value={{postDetails,setPostDetails}}>
         {children}
        </PostDetailContext.Provider>
    )
}