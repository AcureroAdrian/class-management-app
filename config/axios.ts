import axios from 'axios'

const customAxios = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL,
	timeout: 6000,
})

customAxios.interceptors.request.use(config => {
	config.headers['x-api-key'] = process.env.EXPO_PUBLIC_API_KEY
	return config
})

customAxios.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
			error.message = 'The server is taking too long to respond. Please try again in a minute.'
		}
		return Promise.reject(error)
	}
)

export default customAxios
