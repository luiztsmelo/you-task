import axios from 'axios'

export default {
  state: () => ({
    isAuthenticated: false,
    loading: false
  }),
  mutations: {
    SET_IS_AUTHENTICATED (state, value: boolean) {
      state.isAuthenticated = value
    },
    SET_LOADING (state, value: boolean) {
      state.loading = value
    }
  },
  actions: {
    async login ({ commit }, credentials) {
      try {
        commit('SET_LOADING', true)

        /* await axios.post('', credentials) */

        await new Promise(resolve => setTimeout(resolve, 3000))

        commit('SET_IS_AUTHENTICATED', true)
      } catch (error) {
        console.error(error)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}
