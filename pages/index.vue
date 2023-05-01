<template>
  <div class="tw-font-bold tw-text-2xl">
    <h1 class="tw-text-center tw-text-4xl tw-font-bold tw-mt-10 tw-mb-4">
      Welcome to CDA's Orphan Management Portal
    </h1>
    <p class="tw-text-center tw-text-xl tw-mb-4">Please login to continue</p>
    <v-form
      ref="loginForm"
      class="tw-mx-auto tw-max-w-lg tw-border tw-rounded tw-p-5 tw-bg-white"
    >
      <v-text-field
        id="email"
        v-model="email"
        label="Email"
        name="email"
        type="email"
        autocomplete="username"
        :rules="[rules.required, rules.email]"
      ></v-text-field>
      <v-text-field
        id="password"
        v-model="password"
        label="Password"
        name="password"
        type="password"
        autocomplete="current-password"
        :rules="[rules.required]"
      ></v-text-field>
      <button-dark @click="login">Login</button-dark>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'default',
  data() {
    return {
      email: '',
      password: '',
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => /.+@.+\..+/.test(value) || 'E-mail must be valid',
      },
    }
  },
  methods: {
    login() {
      if (!this.$refs.loginForm.validate()) return
      const payload = {
        email: this.email,
        password: this.password,
      }

      this.$store.dispatch('auth/setEmail', payload.email)
      this.$store.dispatch('auth/setPassword', payload.password)

      this.$store.dispatch('auth/login').then((user) => {
        if (!user) {
          this.$toaster.showToast({
            content: 'Bad input! Try again.',
            state: 'error',
          })
          return
        }
        this.$router.push(`/${this.$store.getters['auth/userRole']}`)
        this.$toaster.showToast({
          content: 'Successfully logged in!',
          state: 'success',
        })
      })
    },
  },
}
</script>
