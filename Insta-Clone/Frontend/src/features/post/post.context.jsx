import {  useState } from "react";
import { createContext } from "react";

export const PostContext = createContext()

export const PostContexProvider = ({children}) =>{
    const [loading,setLoading] = useState(false)
    const [post,setPost] = useState(null)
    const [feed,setFeed] = useState(null)
    
    
    return(
        <PostContext.Provider value={{loading,setLoading,feed,setFeed,post,setPost}}>
            {children}
        </PostContext.Provider>
    )
}


