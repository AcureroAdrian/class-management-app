import axios from 'axios'

const customAxios = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL,
	timeout: 10000,
})

customAxios.interceptors.request.use(config => {
	config.headers['x-api-key'] = process.env.EXPO_PUBLIC_API_KEY
	return config
})

export default customAxios
