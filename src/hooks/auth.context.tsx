import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import * as AuthSession from 'expo-auth-session'
import AsyncStorage from '@react-native-async-storage/async-storage'


import { api } from '../services/api'
import  {
    REDIRECT_URI,
    SCOPE,
    RESPONSE_TYPE, 
    CLIENT_ID,
    CDN_IMAGE,
    COLLECTION_USERS,
    COLLECTION_APPOINTMENTS
} from '../configs'

type User = {
    id: string,
    username: string,
    firstname: string,
    avatar: string,
    email: string,
    token: string
}

type AuthContextData = {
    user: User,
    signIn: () => Promise<void>,
    loading: boolean,
    signOut: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextData)

type AuthContextProviderProps = {
    children: ReactNode
}

type AuthResponse = AuthSession.AuthSessionResult & {
    params: {
        access_token?: string,
        error?: string

    }
    type: string
}

export function AuthContextProvider({children}: AuthContextProviderProps) {
    const [user, setUser] = useState<User>({} as User)
    const [loading, setLoading] = useState(false)

    const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

    async function signIn() {
        try {
            setLoading(true)
            const { type, params } = await AuthSession.startAsync({authUrl,}) as AuthResponse
            if (type === 'success' && !params.error) {
                api.defaults.headers.authorization = `Bearer ${params.access_token}`
                const userInfo = await api.get('/users/@me')
                const firstname = userInfo.data.username.split(' ')[0]
                userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`
                const userData = {
                    ...userInfo.data,
                    firstname,
                    token: params.access_token
                }
                await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData))
                setUser(userData)
            }
            
        } catch (error) {
            throw new Error('Não foi possível autenticar.')
        } finally {
            setLoading(false)
        }
    }

    async function signOut() {
        setUser({} as User)
        await AsyncStorage.removeItem(COLLECTION_USERS)
    }


    async function loadStoredUser() {
        const userStorageData = await AsyncStorage.getItem(COLLECTION_USERS)

        if (userStorageData) {
            const userLogged = JSON.parse(userStorageData) as User
            api.defaults.headers.authorization = `Bearer ${userLogged.token}`
            setUser(userLogged)
        }
    }

    // Load Prev User
    useEffect(() => {
        loadStoredUser()
    }, [])


    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                loading,
                signOut                
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}