import axios from 'axios'
import { refreshToken } from './token'

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
})

async function checkAuth() {
  try {
    const response = await api.get('/api/users/me')
    return response.data
  } catch (error) {
    const res = error.response

    if (res && res.data && res.data.message === 'Token expirado.') {
      const refreshed = await refreshToken()
      if (refreshed) {
        return await checkAuth()
      }
    }

    console.error('Erro ao verificar login', error)
    return null
  }
}

async function loginService(email, password, router) {
  try {
    await api.post('/api/login', { email, password })
    router.push('/perfil')
    return ''
  } catch (error) {
    const res = error.response
    if (res && res.data) {
      return res.data.message || 'Erro ao fazer login'
    }

    console.error(error)
    return 'Erro de conexão com o servidor'
  }
}

async function registerService(nome, email, password, referralToken) {
  try {
    const body = {
      nome,
      email,
      password,
    }
    if (referralToken) {
      body.referralToken = referralToken
    }

    await axios.post(`${BACKEND_URL}/api/register`, body)

    return ''
  } catch (error) {
    const res = error.response
    if (res && res.data) {
      return res.data.message || 'Erro ao registrar usuário'
    }

    console.error(error)
    return 'Erro de conexão com o servidor'
  }
}

async function logoutService(router) {
  try {
    await api.post('/api/logout')

    router.push('/')
    return ''
  } catch (error) {
    const res = error.response
    if (res && res.data) {
      return res.data.message || 'Erro ao fazer logout'
    }

    console.error(error)
    return 'Erro de conexão com o servidor'
  }
}

export { checkAuth, loginService, registerService, logoutService }
