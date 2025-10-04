<script setup>
import { ref, onMounted } from 'vue'
import { fetchUserProfile } from '@/services/user'

const name = ref('Carregando...')
const referralCode = ref('Carregando...')
const referralCount = ref(0)
const isLoading = ref(true)
const copyMessage = ref('')

const copyReferralLink = async () => {
  if (
    !referralCode.value ||
    referralCode.value.startsWith('Erro') ||
    referralCode.value.startsWith('Carregando')
  ) {
    copyMessage.value = 'Link inválido para cópia.'
    return
  }

  try {
    await navigator.clipboard.writeText(referralCode.value)
    copyMessage.value = 'Link copiado com sucesso! 🎉'
    setTimeout(() => (copyMessage.value = ''), 3000)
  } catch (err) {
    console.error(err)
    copyMessage.value = 'Falha ao copiar o link. Tente manualmente.'
  }
}

onMounted(async () => {
  const dados = await fetchUserProfile()
  name.value = dados.nome || 'Carregando...'
  referralCode.value = dados.referralCode || 'Carregando...'
  referralCount.value = dados.referralCount || 0
  isLoading.value = false
})
</script>

<template>
  <div class="user-profile">
    <div class="profile-card">
      <div class="profile-image-placeholder">👤</div>

      <h1 v-if="!isLoading">Olá, {{ name }}!</h1>
      <h1 v-else>Carregando Perfil...</h1>

      <div class="referral-info-box">
        <label>Indicações:</label>
        <div v-if="isLoading" class="loading-dots">...</div>
        <div v-else class="referral-count">
          {{ referralCount }}
        </div>
      </div>

      <div class="referral-section">
        <label for="referral-input">Seu Link de Indicação:</label>
        <div class="referral-input-group">
          <input id="referral-input" type="text" :value="referralCode" readonly :class="{ 'loading-input': isLoading }"
            :title="referralCode" />
          <button @click="copyReferralLink" :disabled="isLoading" class="copy-btn">Copiar</button>
        </div>
        <p v-if="copyMessage" class="copy-message">{{ copyMessage }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-profile {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  z-index: 2;
}

.profile-card {
  width: 400px;
  max-width: 90%;
  border-radius: 20px;
  background: #b2cbf2;
  color: #3b3b3b;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 30px;
  gap: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.profile-image-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #92b6f0;
  color: white;
  font-size: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid #cfe1ff;
}

.profile-card h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 500;
  text-align: center;
  color: white;
}

.referral-info-box {
  width: 100%;
  background-color: #92b6f0;
  border-radius: 10px;
  padding: 15px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.referral-info-box label {
  font-size: 0.9rem;
  color: #cfe1ff;
  margin-bottom: 0;
}

.loading-dots {
  font-size: 1.8rem;
  line-height: 1;
  color: white;
}

.referral-count {
  font-size: 2rem;
  font-weight: bold;
  line-height: 1;
  color: white;
}

.referral-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.referral-section label {
  font-size: 1rem;
  font-weight: 500;
  color: white;
}

.referral-input-group {
  display: flex;
  gap: 10px;
  width: 100%;
}

.referral-input-group input {
  flex-grow: 1;
  padding: 15px 15px;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
  background-color: white;
  color: #1e3a8a;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: text;
  word-break: break-all;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.loading-input {
  font-style: italic;
  color: #94a3b8 !important;
}

.copy-btn {
  padding: 15px 20px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
}

.copy-btn:hover:not(:disabled) {
  background: #059669;
}

.copy-btn:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.copy-message {
  font-size: 0.9rem;
  color: #90ee90;
  text-align: center;
  margin: 5px 0 0 0;
}

@media (max-width: 450px) {
  .profile-card {
    padding: 30px 20px;
    gap: 20px;
  }

  .profile-card h1 {
    font-size: 1.6rem;
  }

  .referral-count {
    font-size: 1.8rem;
  }

  .copy-btn {
    padding: 12px 15px;
    font-size: 0.9rem;
  }

  .referral-input-group input {
    padding: 12px 10px;
    font-size: 0.9rem;
  }

  .profile-image-placeholder {
    width: 80px;
    height: 80px;
    font-size: 3rem;
  }
}
</style>
