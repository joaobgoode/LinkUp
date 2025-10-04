import axios from 'axios'
import { refreshToken } from '@/services/token'

const BACK_END_ADDRESS = import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: BACK_END_ADDRESS,
  withCredentials: true,
})

async function fetchUserProfile() {
  try {
    const response = await api.get('/api/users/me')

    const body = response.data

    const nome = body.nome
    const referralCode = document.location.origin + '/link/' + body.referralCode
    const referralCount = body.referralCodeCount || 0

    return { nome, referralCode, referralCount }
  } catch (error) {
    const res = error.response

    if (res && res.data && res.data.message === 'Token expirado.') {
      const refreshed = await refreshToken()
      if (refreshed) {
        return await fetchUserProfile()
      }
    }

    return {}
  }
}

export { fetchUserProfile }
