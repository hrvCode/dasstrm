import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie';
import Router, {useRouter} from 'next/router';
import api from '../services/api';


const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        console.log("lol")
        /// get token from cooki
        async function loadUserFromCookie(){
          const token = Cookies.get('token')
            if(token) {
                api.defaults.headers.Authorization = `${token}`
                const  {data: user} = await api.get('auth/user')
                if(user) setUser
            }
            setIsLoading(false);
        }
        loadUserFromCookie();
    }, [])

    const login = async (username, password) =>{
        const clientId = 'yKSUB9w7TA4J2Vv0asEc3I1aikN0SZirbEj1FPXSkDiMs3CjhXx5ad3Ryi10Xpag';
        const response = await api.post('/loginuser',{username, password, clientId}, {withCredentials: true});
        console.log(Cookies.defaults)
        console.log(Cookies.get("xsrf-token"))
        const {data:token} = response;
        if(token){
            api.defaults.headers.Authorization = `Bearer ${token}`
            const { data: user} = await api.get(`/getuser/${clientId}`);
            setUser(user);
        }
    } 

    const logOut = () => {
        Cookies.remove('auth token');
        setUser(null);
        delete api.defaults.headers.Authorization;
        window.location.pathname = '/'
    }

    return (
        <AuthContext.Provider value={{user, isLoading, login, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
