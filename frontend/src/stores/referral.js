import { defineStore } from 'pinia'

export const useReferralStore = defineStore('referral', {
  state: () => ({
    referralToken: null,
  }),
  actions: {
    setReferralToken(token) {
      this.referralToken = token
      localStorage.setItem('referral_token', token)
    },
    clearReferralToken() {
      this.referralToken = null
      localStorage.removeItem('referral_token')
    },
  },
  getters: {
    hasReferralToken: (state) => !!state.referralToken,
  },
})
