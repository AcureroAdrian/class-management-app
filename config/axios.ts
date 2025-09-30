import axios from 'axios'

const API_URL = process.env.EXPO_PUBLIC_API_URL

const customAxios = axios.create({
	baseURL: API_URL,
	timeout: 6000,
})

customAxios.interceptors.request.use(config => {
	config.headers['x-api-key'] = process.env.EXPO_PUBLIC_API_KEY
	return config
})

customAxios.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.code === 'ECONNABORTED' || (typeof error.message === 'string' && error.message.includes('timeout'))) {
			error.message = 'The server is taking too long to respond. Please try again in a minute.'
		}
		return Promise.reject(error)
	}
)

export default customAxios
