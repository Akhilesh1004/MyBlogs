import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { URL } from "../url";
import { useEffect } from "react";

export const UserContext = createContext({})

export const UserContextProvider=({children})=>{
    const [user, setUser] = useState(null)
    useEffect(()=>{
        getUser()
    }, [])
    const getUser = async()=>{
        try{
            const res = await axios.get(URL+'/api/user/refetch', {withCredentials:true})
            setUser(res.data)
        }catch(error){
            console.log(error)
        }
    }
    return <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
}