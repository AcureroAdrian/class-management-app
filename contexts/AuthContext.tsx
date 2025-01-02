import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import parseJwt from '@/shared/parseJwt'

type TLevel = 'novice' | 'beginner' | 'intermediate' | 'elite'

interface IUser {
	_id: string
	name: string
	lastName: string
	email: string
	level: TLevel
	dateOfBirth: string
	age: number
	avatar?: string
	isAdmin: boolean
	createdAt: string
}

interface IAuthState {
	userInfo?: IUser
	token: string | null
	authenticated: boolean | null
}

interface IAuthPros {
	authState?: IAuthState
	isLoading?: boolean
	onRegister?: (
		name: string,
		lastName: string,
		email: string,
		password: string,
		dateOfBirth: Date | null,
		level: TLevel,
	) => Promise<any>
	onLogin?: (email: string, password: string) => Promise<any>
	onLogout?: () => Promise<any>
}

const TOKEN_KEY = 'myToken'
export const API_URL = 'http://192.168.100.38:8000'
export const AuthContext = createContext<IAuthPros>({})

export const useAuth = () => {
	return useContext(AuthContext)
}

export const AuthProvider = ({ children }: any) => {
	const [authState, setAuthState] = useState<IAuthState>({
		token: null,
		authenticated: null,
	})
	const [loadingLocalToken, setLoadingLocalToken] = useState(false)

	useEffect(() => {
		const loadToken = async () => {
			setLoadingLocalToken(true)
			const token = await SecureStore.getItemAsync(TOKEN_KEY)

			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

			if (token) {
				const userData = parseJwt(token)
				setAuthState({
					userInfo: userData,
					token,
					authenticated: true,
				})
			}

			setLoadingLocalToken(false)
		}

		loadToken()
	}, [])

	const register = async (
		name: string,
		lastName: string,
		email: string,
		password: string,
		dateOfBirth: Date,
		level: TLevel,
	) => {
		try {
			const result = await axios.post(`${API_URL}/api/auth/register`, {
				name,
				lastName,
				email,
				password,
				dateOfBirth,
				level,
			})
			const token = result.data.token

			if (token) {
				const userData = parseJwt(token)
				setAuthState({
					userInfo: userData,
					token: result.data.token,
					authenticated: true,
				})

				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

				await SecureStore.setItemAsync(TOKEN_KEY, token)
			}
		} catch (error: any) {
			const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message
			return { error: true, message: errorMessage }
		}
	}
	const login = async (email: string, password: string) => {
		try {
			const result = await axios.post(`${API_URL}/api/auth/login`, { email, password })
			const token = result.data.token

			if (token) {
				const userData = parseJwt(token)
				setAuthState({
					userInfo: userData,
					token: result.data.token,
					authenticated: true,
				})

				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

				await SecureStore.setItemAsync(TOKEN_KEY, token)
			}

			return token
		} catch (error: any) {
			const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message
			return { error: true, message: errorMessage }
		}
	}
	const logout = async () => {
		await SecureStore.deleteItemAsync(TOKEN_KEY)

		axios.defaults.headers.common['Authorization'] = ''

		setAuthState({
			token: null,
			authenticated: false,
		})
	}

	const value = {
		authState,
		isLoading: loadingLocalToken,
		onRegister: register,
		onLogin: login,
		onLogout: logout,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
