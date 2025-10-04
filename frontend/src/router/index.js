import { createRouter, createWebHistory } from 'vue-router'
import { useReferralStore } from '@/stores/referral'
import { checkAuth } from '@/services/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/link/:token',
      name: 'link-handler',
      component: () => import('@/views/HomeView.vue'),
      beforeEnter: (to, from, next) => {
        const referralStore = useReferralStore()
        const token = to.params.token
        if (token) {
          referralStore.setReferralToken(token)
        }
        next()
      },
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('@/views/PerfilView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authRoutes = ['home', 'link-handler']

  if (authRoutes.includes(to.name)) {
    try {
      const user = await checkAuth()

      if (user) {
        return next('/perfil')
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (to.meta.requiresAuth) {
    try {
      const user = await checkAuth()
      if (user) {
        next()
      } else {
        next('/')
      }
    } catch (err) {
      console.error(err)
      next('/')
    }
  } else {
    next()
  }
})

export default router
