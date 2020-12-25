import React, { createContext, useState, useContext, useEffect } from 'react'
import jscookie from 'js-cookie';
import Router, {useRouter} from 'next/router';
import api from '../services/api';


const AuthContext = createContext({});

export const AuthProvider = ({Children}) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
        /// get token from cooki
        async function loadUserFromCookie(){
            if(token) {
                api.defaults.headers.Authorization = `Bearer ${token}`
                const  {data: user} = await api.get('auth/endpoint')
                if(user) setUser
            }
            setLoading(false);
        }
        loadUserFromCookie();
    }, [])

    const login = async (username, pw) =>{
        const {data:token} = await api.post('login/endpoint',{username, pw});
        if(token){
            api.defaults.headers.Authorization = `Bearer ${token}`
            const { data: user} = await api.get('profile?');
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
        <AuthProvider value={user, loading, login, logOut}>
            {Children}
        </AuthProvider>
    )
}
