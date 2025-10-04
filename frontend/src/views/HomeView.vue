<script setup>
import { ref, computed, onMounted } from 'vue'
import { loginService, registerService } from '@/services/auth'
import {
  validarEmail,
  validarNome,
  validarSenha,
  validarConfirmacaoSenha,
} from '@/utils/validadors'
import { useRouter, useRoute } from 'vue-router'
import { useReferralStore } from '@/stores/referral'

const referralStore = useReferralStore()

const router = useRouter()
const route = useRoute()
const loginSelected = ref(true)

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const showLoginPassword = ref(false)
const showRegisterPassword = ref(false)
const showConfirmPassword = ref(false)

const toggleLoginPassword = () => {
  showLoginPassword.value = !showLoginPassword.value
}
const toggleRegisterPassword = () => {
  showRegisterPassword.value = !showRegisterPassword.value
}
const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const hasMinimumLength = computed(() => password.value.length >= 8)
const hasNumber = computed(() => /\d/.test(password.value))
const hasLetter = computed(() => /[a-zA-Z]/.test(password.value))

const selectLogin = () => {
  loginSelected.value = true
  error.value = ''
}
const selectRegister = () => {
  loginSelected.value = false
  error.value = ''
}

const login = async () => {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Todos os campos são obrigatórios.'
    return
  }

  if (!validarEmail(email.value)) {
    error.value = 'Formato de Email inválido.'
    return
  }

  const res = await loginService(email.value, password.value, router)
  if (res) {
    error.value = res
  }
}

const register = async () => {
  error.value = ''

  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = 'Todos os campos são obrigatórios.'
    return
  }

  if (!validarNome(name.value)) {
    error.value = 'Nome inválido.'
  } else if (!validarEmail(email.value)) {
    error.value = 'Formato de Email inválido.'
  } else if (!validarSenha(password.value)) {
    error.value = 'A senha não atende a todos os requisitos.'
  } else if (!validarConfirmacaoSenha(password.value, confirmPassword.value)) {
    error.value = 'Senhas não conferem.'
  }

  if (error.value) {
    return
  }

  const referralToken = referralStore.hasReferralToken ? referralStore.referralToken : ''
  const res = await registerService(name.value, email.value, password.value, referralToken)

  if (res) {
    error.value = res
    return
  }

  selectLogin()
}

onMounted(() => {
  const origin = route.name
  if (origin === 'link-handler') {
    selectRegister()
  }
})
</script>

<template>
  <div class="home">
    <div class="login">
      <h1>{{ loginSelected ? 'Login' : 'Registro' }}</h1>

      <p v-if="error" class="error-message">{{ error }}</p>

      <div class="form">
        <template v-if="!loginSelected">
          <input type="text" v-model="name" placeholder="Nome" />
          <input type="email" v-model="email" placeholder="Email" />

          <div class="input-wrapper">
            <input :type="showRegisterPassword ? 'text' : 'password'" v-model="password" placeholder="Senha" />
            <button type="button" class="toggle-password-btn" @click="toggleRegisterPassword">
              <font-awesome-icon :icon="showRegisterPassword ? 'eye' : 'eye-slash'" />
            </button>
          </div>
          <div class="password-rules">
            <p :class="{ 'rule-success': hasMinimumLength }">Mínimo de 8 caracteres</p>
            <p :class="{ 'rule-success': hasLetter }">Pelo menos uma letra</p>
            <p :class="{ 'rule-success': hasNumber }">Pelo menos um número</p>
          </div>

          <div class="input-wrapper">
            <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword"
              placeholder="Confirmação de Senha" />
            <button type="button" class="toggle-password-btn" @click="toggleConfirmPassword">
              <font-awesome-icon :icon="showConfirmPassword ? 'eye' : 'eye-slash'" />
            </button>
          </div>

          <button class="action-btn" @click="register">Fazer Registro</button>
        </template>

        <template v-else>
          <input type="email" v-model="email" placeholder="Email" />

          <div class="input-wrapper">
            <input :type="showLoginPassword ? 'text' : 'password'" v-model="password" placeholder="Senha" />
            <button type="button" class="toggle-password-btn" @click="toggleLoginPassword">
              <font-awesome-icon :icon="showLoginPassword ? 'eye' : 'eye-slash'" />
            </button>
          </div>

          <button class="action-btn" @click="login">Entrar</button>
        </template>
      </div>

      <div class="buttons">
        <button class="login-btn" :class="loginSelected ? 'selected' : 'not-selected'" @click="selectLogin">
          Login
        </button>
        <button class="register-btn" :class="loginSelected ? 'not-selected' : 'selected'" @click="selectRegister">
          Registro
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.login {
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background: #b2cbf2;
  color: white;
  display: flex;
  flex-direction: column;
  margin: 0;
  font-family: 'Roboto', sans-serif;
  z-index: 2;
}

.login h1 {
  margin: 0;
  padding: 30px 20px 20px 20px;
  text-align: center;
  font-size: 2rem;
}

.error-message {
  padding: 0 20px;
  color: #f55e53;
  text-align: center;
  font-weight: bold;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px 20px 20px;
}

.input-wrapper {
  position: relative;
  display: flex;
}

.input-wrapper input {
  flex-grow: 1;
  width: 100%;
  padding-right: 45px;
  margin: 0;
}

.toggle-password-btn {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0 15px;
  color: #666;
  font-size: 1rem;
  z-index: 10;
}

input {
  padding: 15px;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
}

.action-btn {
  padding: 15px;
  border-radius: 5px;
  border: none;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  background: #a0bff0;
  color: white;
  margin-top: 10px;
  transition: background 0.2s;
}

.action-btn:hover {
  background: #92b6f0;
}

.password-rules {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: -10px;
  padding-left: 5px;
  font-size: 0.85rem;
}

.password-rules p {
  margin: 0;
  color: grey;
  transition: color 0.3s;
}

.rule-success {
  display: none;
  color: #4ade80 !important;
  font-weight: bold;
}

.buttons {
  display: flex;
  width: 100%;
  margin-top: auto;
}

.login-btn,
.register-btn {
  flex: 1;
  padding: 20px 0;
  font-size: 1.3rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

.login-btn {
  border-radius: 0 0 0 20px;
}

.register-btn {
  border-radius: 0 0 20px 0;
}

.selected {
  background: #b2cbf2;
  color: white;
}

.not-selected {
  background: #92b6f0;
  color: white;
}
</style>
