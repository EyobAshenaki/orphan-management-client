<template>
  <div
    class="tw-max-w-lg tw-flex tw-flex-col tw-grid-flow-col tw-gap-4 tw-p-5 tw-my-5 tw-bg-white tw-border tw-border-gray-500 tw-rounded-md"
  >
    <div
      class="tw-flex tw-justify-center tw-items-center tw-gap-4 tw-rounded-sm tw-py-4 tw-px-2"
    >
      <fa-layers class="fa-4x tw-w-[30%] tw-justify-self-center">
        <fa class="" :icon="['fa', 'user-tie']" />
      </fa-layers>
      <div class="tw-w-[60%] tw-flex tw-flex-col tw-justify-center">
        <span class="tw-text-xl tw-font-bold">{{ user.name }}</span>
        <span class="tw-text-xs tw-text-gray-700">{{ user.email }}</span>
        <span class="tw-text-sm tw-text-gray-700">{{ user.role }}</span>
      </div>
      <!-- todo: work on edit functionality -->
      <!-- * it is now disabled via `v-if="false"` below -->
      <v-btn v-if="false" dense :icon="true">
        <fa-layers class="fa-lg">
          <fa :icon="['fa', 'pen-to-square']" />
        </fa-layers>
      </v-btn>
    </div>

    <div class="tw-flex tw-flex-col tw-gap-3">
      <div class="tw-grid tw-grid-cols-2 tw-gap-2">
        <div class="tw-flex tw-flex-col tw-gap-1">
          <label class="tw-text-sm tw-text-gray-800 tw-font-light">
            Gender
          </label>
          <v-text-field
            :value="user.gender ?? 'N/A'"
            dense
            outlined
            readonly
          ></v-text-field>
        </div>
        <div class="tw-flex tw-flex-col tw-gap-1">
          <label class="tw-text-sm tw-text-gray-800 tw-font-light"> Age </label>
          <v-text-field :value="user.age ?? 'N/A'" dense outlined readonly>
          </v-text-field>
        </div>
      </div>

      <div class="tw-flex tw-flex-col tw-gap-1 -tw-mt-3">
        <label class="tw-text-sm tw-text-gray-800 tw-font-light">
          Phone Number
        </label>
        <v-text-field
          :value="user.phoneNumber ?? 'N/A'"
          dense
          outlined
          readonly
          >{{
        }}</v-text-field>
      </div>
    </div>

    <!-- todo: implement danger zone functionality -->
    <!-- * it is now disabled via `v-if="false"` below -->
    <div
      v-if="false"
      class="tw-p-4 tw-border tw-border-red-400 tw-rounded tw-bg-red-100 tw-shrink"
    >
      <h4 class="tw-font-bold error--text tw-mb-3">Danger zone</h4>
      <div class="tw-grid tw-grid-cols-2 tw-gap-4">
        <v-btn plain class="red--text text--darken-3" outlined>
          <fa-layers class="fa-lg tw-mr-3">
            <fa :icon="['fa', 'lock']" />
          </fa-layers>
          Disable Login</v-btn
        >
        <v-btn plain class="red--text text--darken-3" outlined>
          <fa-layers class="fa-lg tw-mr-3">
            <fa :icon="['fa', 'arrow-rotate-right']" /> </fa-layers
          >Reset Password</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import { calculateAge } from '~/helpers/app.helper'
export default {
  name: 'UserProfileCard',
  props: {
    userProp: {
      type: Object,
      default: () => ({
        id: 'uuid',
        name: 'Khalid Fulani',
        role: 'ADMIN',
        gender: 'F',
        email: 'admin@cdaethi.org',
        phoneNumber: '0922222222',
        age: 33,
      }),
    },
  },
  computed: {
    user() {
      const age = calculateAge(this.userProp.personalInfo.dateOfBirth)
      const retVal = {
        ...this.userProp,
        gender: this.userProp.personalInfo.gender === 'F' ? 'Female' : 'Male',
        age,
        ...this.userProp.personalInfo,
      }
      delete retVal.dateOfBirth
      delete retVal.personalInfo
      return retVal
    },
  },
}
</script>
