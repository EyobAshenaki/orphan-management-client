<template>
  <v-card class="tw-max-w-3xl">
    <v-card-title>New User</v-card-title>
    <v-card-text class="tw-p-5">
      <v-form ref="userForm">
        <div class="tw-flex tw-flex-row tw-gap-6">
          <v-text-field
            v-model.trim="firstName"
            label="First Name"
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            v-model.trim="middleName"
            label="Middle Name"
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            v-model.trim="lastName"
            label="Last Name"
            :rules="[rules.required]"
          ></v-text-field>
        </div>
        <div class="tw-flex tw-flex-row tw-gap-6">
          <v-menu
            v-model="dateOfBirthMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="dateOfBirth"
                label="Date of Birth"
                :rules="[rules.required]"
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dateOfBirth"
              :rules="[rules.required]"
              no-title
              @input="dateOfBirthMenu = false"
            ></v-date-picker>
          </v-menu>
          <v-select
            v-model="gender"
            label="Gender"
            :rules="[rules.required]"
            :items="genderOptions"
          ></v-select>
          <v-text-field
            v-model="phoneNumber"
            label="Phone Number"
            :rules="[rules.required]"
          ></v-text-field>
        </div>
        <div class="tw-flex tw-flex-row tw-gap-6 tw-mt-3">
          <v-select
            v-model="role"
            class="tw-max-w-xs"
            :items="roleOptions"
            label="Role"
            :rules="[rules.required]"
            required
          ></v-select>
          <v-text-field
            v-model.trim="email"
            class="tw-shrink-0"
            label="Email"
            :rules="[rules.required, rules.email]"
            type="email"
            required
            autocomplete="email"
          ></v-text-field>
          <v-text-field
            v-model="password"
            class="tw-shrink-0"
            label="Password"
            type="password"
            :rules="[rules.required]"
            required
            autocomplete="new-password"
            readonly
            placeholder="Generate Password ➡️"
          >
          </v-text-field>
          <v-btn icon dense class="mt-3" @click="generatePassword">
            <v-tooltip bottom>
              <template #activator="{ on }">
                <fa-layers v-on="on">
                  <fa :icon="['fa', 'key']" />
                </fa-layers>
              </template>
              <span>Generate Password</span>
            </v-tooltip>
          </v-btn>
        </div>
        <div class="tw-flex tw-flex-row tw-gap-6 tw-mt-3">
          <v-btn class="tw-place-self-end" @click.prevent="saveUser"
            >Save</v-btn
          >
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AddUser',

  layout: 'admin',
  data() {
    return {
      roleOptions: [
        { text: 'Head', value: 'HEAD' },
        { text: 'Coordinator', value: 'COORDINATOR' },
        { text: 'Social Worker', value: 'SOCIAL_WORKER' },
      ],
      genderOptions: [
        {
          text: 'Male',
          value: 'M',
        },
        {
          text: 'Female',
          value: 'F',
        },
      ],
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirthMenu: false,
      dateOfBirth: null,
      gender: '',
      phoneNumber: '',
      role: '',
      email: '',
      password: '',
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => /.+@.+\..+/.test(value) || 'E-mail must be valid',
      },
    }
  },
  methods: {
    generatePassword() {
      const length = 16
      const charset =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      let retVal = ''
      for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n))
      }
      this.password = retVal
      // eslint-disable-next-line no-console
      console.debug(this.password)
    },
    saveUser() {
      if (!this.$refs.userForm.validate()) return
      const createUserInput = {
        email: this.email,
        role: this.role,
        password: this.password,
        personalInfo: {
          firstName: this.firstName,
          middleName: this.middleName,
          lastName: this.lastName,
          phoneNumber: this.phoneNumber,
          dateOfBirth: this.dateOfBirth,
          gender: this.gender,
        },
      }
      this.$store.commit('user/SET_USER_INPUT', createUserInput)
      this.$store.dispatch('user/createUser')
    },
  },
}
</script>
