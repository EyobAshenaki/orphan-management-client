<template>
  <div class="tw-font-bold tw-text-2xl tw-mt-5 tw-antialiased">
    <p
      class="tw-text-center tw-text-4xl tw-font-bold tw-font-serif tw-mt-10 tw-mb-4"
    >
      Welcome to CDA's Orphan Management Portal (OMP)
    </p>
    <v-form
      v-if="nodeTarget === 'production'"
      ref="loginForm"
      class="tw-mx-auto tw-max-w-lg tw-border tw-rounded tw-p-5 tw-bg-white"
    >
      <p
        class="tw-text-center tw-mb-4 tw-italic tw-text-lg tw-font-medium tw-font-sans"
      >
        Please login to continue
      </p>
      <div class="form-control">
        <label class="form-label">Email</label>
        <v-text-field
          id="email"
          v-model="email"
          name="email"
          type="email"
          autocomplete="username"
          outlined
          filled
          dense
          color="teal darken-2"
          :rules="[rules.required, rules.email]"
        ></v-text-field>
      </div>
      <div class="form-control">
        <label class="form-label">Password</label>
        <v-text-field
          id="password"
          v-model="password"
          name="password"
          type="password"
          autocomplete="current-password"
          outlined
          filled
          dense
          color="teal darken-2"
          :rules="[rules.required]"
        ></v-text-field>
      </div>
      <button-dark @click="login">Login</button-dark>
    </v-form>
    <v-card
      v-if="nodeTarget !== 'production'"
      class="tw-mt-3 tw-mx-auto tw-max-w-3xl tw-p-0 tw-bg-amber-50 tw-border-dashed tw-border-emerald-800 tw-rounded-xl"
      elevation="0"
      :loading="loading"
    >
      <template #progress>
        <v-progress-linear
          background-color="teal lighten-3"
          color="teal darken-2"
          :active="loading"
          :indeterminate="loading"
        ></v-progress-linear>
      </template>
      <div class="tw-p-7 tw-font-sans tw-antialiased tw-font-normal">
        <p class="tw-text-4xl">⚠️This is a testing environment⚠️</p>
        <v-divider class="tw-mb-2" />
        <p class="tw-break-keep tw-italic tw-text-lg tw-font-medium">
          You can check and evaluate the application without affecting the main
          data.Therefore any changes you make here will not be reflected on the
          main site. Furthermore, changes you make here could be deleted at any
          time. Yon can login as one of the following users:
        </p>
        <ul class="tw-list-disc tw-list-inside tw-text-lg tw-font-medium">
          <li>Administrator</li>
          <li>Department Head</li>
          <li>Coordinator</li>
          <li>Social Worker (coming soon...)</li>
        </ul>
        <p class="tw-break-keep tw-italic tw-text-lg tw-font-medium">
          Click <a href="http://charity.cdaethi.org">here</a> to go back to the
          main site.
        </p>
        <v-divider class="tw-my-3" />
        <v-form ref="demoLoginForm" @submit.prevent="demoUserLogin">
          <div class="form-control">
            <label class="form-label tw-font-semibold">Select User Type</label>
            <v-select
              v-model="demoUser"
              :items="demoUserOptions"
              :rules="[rules.required]"
              outlined
              filled
              dense
              item-color="teal darken-2"
              color="teal darken-2"
              placeholder="Select User Type"
            >
              <template #selection="{ item }">
                <div class="tw-flex tw-items-center">
                  <span
                    class="tw-mr-2 tw-font-sans tw-font-semibold tw-text-base"
                    >{{ item.text }}</span
                  >
                </div>
              </template>
              <template #item="{ item }">
                <div class="tw-flex tw-items-center">
                  <span
                    class="tw-mr-2 tw-font-sans tw-font-semibold tw-text-base"
                    >{{ item.text }}</span
                  >
                </div>
              </template>
            </v-select>
          </div>

          <button-dark
            :disabled="loading"
            :loading="loading"
            @click="demoUserLogin"
            >Login</button-dark
          >
        </v-form>
      </div>
    </v-card>
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
      loading: false,
      demoUser: null,
      demoUserOptions: [
        {
          text: 'Administrator',
          value: {
            email: 'admin@cdaethi.org',
            password: 'super-secret',
          },
        },
        {
          text: 'Department Head',
          value: {
            email: 'head@cdaethi.org',
            password: 'super-secret',
          },
        },
        {
          text: 'Coordinator',
          value: {
            email: 'coordinator@cdaethi.org',
            password: 'super-secret',
          },
        },
      ],
    }
  },
  computed: {
    nodeTarget() {
      return process.env.TARGET
    },
  },
  mounted() {
    console.log(this.nodeTarget)
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
    demoUserLogin() {
      if (!this.$refs.demoLoginForm.validate()) return
      const payload = this.demoUser
      this.loading = true

      this.$store.dispatch('auth/setEmail', payload.email)
      this.$store.dispatch('auth/setPassword', payload.password)

      this.$store
        .dispatch('auth/login')
        .then((user) => {
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
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
<style scoped>
.form-control {
  @apply tw-w-full tw-flex tw-flex-col tw-gap-1;
}
.form-label {
  @apply tw-text-sm tw-text-gray-800 tw-font-light;
}

.select-item {
  @apply tw-text-sm tw-text-gray-800 tw-font-semibold;
}
</style>
