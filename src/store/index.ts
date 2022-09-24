import { createStore } from 'vuex'

import authModule from './modules/auth'
import taskModule from './modules/task'

const store = createStore({
  modules: {
    auth: {
      namespaced: true,
      ...authModule
    },
    task: {
      namespaced: true,
      ...taskModule
    }
  }
})

export default store
