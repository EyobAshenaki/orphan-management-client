<template>
  <v-card class="tw-max-w-3xl">
    <v-card-title>New User</v-card-title>
    <v-card-text class="tw-p-5">
      <v-form ref="userForm">
        <div class="tw-flex tw-flex-row tw-gap-6">
          <div class="form-control">
            <label class="form-label">First Name</label>
            <v-text-field
              v-model.trim="firstName"
              :rules="[rules.required]"
              outlined
              filled
              dense
              color="teal darken-2"
            ></v-text-field>
          </div>
          <div class="form-control">
            <label class="form-label">Middle Name</label>
            <v-text-field
              v-model.trim="middleName"
              :rules="[rules.required]"
              outlined
              filled
              dense
              color="teal darken-2"
            ></v-text-field>
          </div>
          <div class="form-control">
            <label class="form-label">Last Name</label>
            <v-text-field
              v-model.trim="lastName"
              :rules="[rules.required]"
              outlined
              filled
              dense
              color="teal darken-2"
            ></v-text-field>
          </div>
        </div>
        <div class="tw-flex tw-flex-row tw-gap-6">
          <div class="form-control">
            <label class="form-label">Date of Birth</label>
            <custom-date-picker v-model="dateOfBirth" />
          </div>

          <div class="form-control">
            <label class="form-label">Gender</label>
            <v-select
              v-model="gender"
              :rules="[rules.required]"
              :items="genderOptions"
              outlined
              filled
              dense
              item-color="teal darken-2"
              color="teal darken-2"
            ></v-select>
          </div>
          <div class="form-control">
            <label class="form-label"> Phone Number </label>
            <v-text-field
              v-model.trim="phoneNumber"
              :rules="[rules.required]"
              outlined
              filled
              dense
              color="teal darken-2"
            ></v-text-field>
          </div>
        </div>
        <div class="tw-flex tw-flex-row tw-gap-6 tw-mt-3">
          <div class="form-control">
            <label class="form-label">Role</label>
            <v-select
              v-model="role"
              class="tw-max-w-xs"
              :items="roleOptions"
              label="Role"
              :rules="[rules.required]"
              required
              outlined
              filled
              dense
              item-color="teal darken-2"
              color="teal darken-2"
            ></v-select>
          </div>

          <div class="form-control">
            <label class="form-label">Email</label>
            <v-text-field
              v-model.trim="email"
              class="tw-shrink-0"
              :rules="[rules.required, rules.email]"
              type="email"
              required
              autocomplete="email"
              outlined
              filled
              dense
              color="teal darken-2"
            ></v-text-field>
          </div>
          <div class="form-control">
            <label class="form-label">Password</label>
            <v-text-field
              v-model="password"
              class="tw-shrink-0"
              type="password"
              :rules="[rules.required]"
              required
              autocomplete="new-password"
              readonly
              placeholder="⬅️ Generate Password"
              outlined
              filled
              dense
              color="teal darken-2"
            >
              <template #prepend-inner>
                <v-btn
                  icon
                  dense
                  class="tw-mt-[-0.375rem] tw-ml-[-0.375rem]"
                  color="teal darken-2"
                  @click="generatePassword"
                >
                  <v-tooltip bottom>
                    <template #activator="{ on }">
                      <fa-layers v-on="on">
                        <fa :icon="['fa', 'key']" />
                      </fa-layers>
                    </template>
                    <span>Generate Password</span>
                  </v-tooltip>
                </v-btn>
              </template>
            </v-text-field>
          </div>
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
import { GraphQLError } from 'graphql'
import { createUser } from '~/services/user.service'

export default {
  name: 'AddUser',

  layout: 'admin',
  data() {
    return {
      roleOptions: [
        { text: 'Head', value: 'HEAD' },
        { text: 'Coordinator', value: 'COORDINATOR' },
        { text: 'Social Worker', value: 'SOCIAL_WORKER' },
        { text: 'Donor', value: 'DONOR' },
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
    async saveUser() {
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
          dateOfBirth: new Date(this.dateOfBirth),
          gender: this.gender,
        },
      }
      try {
        await createUser(createUserInput)
      } catch (error) {
        if (Array.from(error)[0] instanceof GraphQLError) {
          error.forEach((e) => {
            this.$toaster.showToast({
              content: e.message,
              state: 'error',
            })
          })
          // eslint-disable-next-line no-console
        } else console.error(error)
      }
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
</style>
