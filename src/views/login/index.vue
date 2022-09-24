<template lang="pug">
.login-view
  .login-container
    Logo(size="42")

    .form-container.mt-12
      v-form(v-model="valid" lazy-validation)
        v-text-field#email-input.mb-2(variant="underlined" v-model="credentials.email" :rules="emailRules" label="E-mail" required)
        v-text-field#password-input(variant="underlined" label="Password" :type="showPassword ? 'text' : 'password'" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" v-model="credentials.password" @click:append-inner="showPassword = !showPassword" @keyup.enter="login" required)

        v-btn#login-btn.mt-8.elevation-3(size="large" block color="primary" :disabled="!valid" :loading="store.state.auth.loading" @click="login") Login
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Logo from '@/components/Logo.vue'

const router = useRouter()
const store = useStore()

const valid = ref(false)

const showPassword = ref(false)

const credentials = reactive({
  email: '',
  password: ''
})

const emailRules = [
  (v: string) => !!v || 'E-mail is required',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
]

const login = async () => {
  await store.dispatch('auth/login', credentials)

  router.push({ name: 'Tasks' })
}
</script>

<style lang="scss" scoped>
.login-view {
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  height: 100vh;

  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  
    .form-container {
      display: flex;
      flex-direction: column;
      width: 320px;
    }
  }
}
</style>
  