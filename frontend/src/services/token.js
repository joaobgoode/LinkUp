import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
})

async function refreshToken() {
  try {
    await api.post('/api/refresh')

    return true
  } catch (err) {
    console.error('Erro ao atualizar token:', err)
    return false
  }
}

export { refreshToken }
