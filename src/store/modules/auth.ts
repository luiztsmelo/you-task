import type { AuthState, Credentials } from '@/types/auth'
import axios from 'axios'

export default {
  state: () => ({
    isAuthenticated: false,
    loading: false
  }),
  mutations: {
    SET_IS_AUTHENTICATED (state: AuthState, value: boolean) {
      state.isAuthenticated = value
    },
    SET_LOADING (state: AuthState, value: boolean) {
      state.loading = value
    }
  },
  actions: {
    async login ({ commit }, credentials: Credentials) {
      try {
        commit('SET_LOADING', true)

        const res = await axios.post('/login', credentials)

        console.log(res.data.message)

        commit('SET_IS_AUTHENTICATED', true)
      } catch (error) {
        console.error(error)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}
