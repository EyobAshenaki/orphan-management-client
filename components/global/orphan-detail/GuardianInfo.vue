<template>
  <section class="tw-bg-white tw-rounded-md tw-p-5">
    <v-form ref="form" v-model="valid" class="tw-max-w-[37rem]">
      <button-light
        v-if="false"
        class="tw-absolute tw-top-11 tw-right-6"
        @click="isEditable = !isEditable"
      >
        <fa-layers class="tw-mr-2">
          <fa :icon="['fa', 'pen-to-square']" />
        </fa-layers>
        <span>Edit</span>
      </button-light>

      <!-- Relation to Orphan -->
      <div class="form-control">
        <label class="form-label"> Relation to Orphan </label>
        <v-select
          v-model="relationToOrphan"
          :items="orphanRelationOptions"
          :rules="[rules.required]"
          required
          :menu-props="{
            bottom: true,
            offsetY: true,
          }"
          item-color="teal darken-3"
          color="teal darken-3"
          dense
          filled
          outlined
          :readonly="!isEditable"
          class="tw-w-1/2"
        ></v-select>
      </div>

      <!-- Gender -->
      <div class="form-control">
        <label class="form-label"> Gender </label>
        <v-radio-group
          v-model="gender"
          :rules="[rules.required]"
          required
          class="-tw-mt-1"
          row
          :readonly="!isEditable"
        >
          <custom-radio
            :class="[isMale ? 'tw-border-emerald-800' : '']"
            label="Male"
            value="M"
          />
          <custom-radio
            :class="[isFemale ? 'tw-border-emerald-800' : '']"
            label="Female"
            value="F"
          />
        </v-radio-group>
      </div>

      <div class="form-control-group">
        <!-- First Name -->
        <div class="form-control">
          <label class="form-label"> First Name </label>
          <v-text-field
            v-model="firstName"
            :rules="[rules.required, rules.name, rules.textWithSpaces]"
            required
            color="teal darken-2"
            dense
            filled
            outlined
            :readonly="!isEditable"
          ></v-text-field>
        </div>

        <!-- Middle Name -->
        <div class="form-control">
          <label class="form-label"> Middle Name </label>
          <v-text-field
            v-model="middleName"
            :rules="[rules.required, rules.name, rules.textWithSpaces]"
            required
            color="teal darken-2"
            dense
            filled
            outlined
            :readonly="!isEditable"
          ></v-text-field>
        </div>
      </div>

      <div class="form-control-group">
        <!-- Last Name -->
        <div class="form-control">
          <label class="form-label"> Last Name </label>
          <v-text-field
            v-model="lastName"
            :rules="[rules.required, rules.name, rules.textWithSpaces]"
            required
            color="teal darken-2"
            dense
            filled
            outlined
            :readonly="!isEditable"
          ></v-text-field>
        </div>

        <!-- Date of Birth -->
        <div v-if="isEditable" class="form-control">
          <label class="form-label"> Date of Birth </label>
          <custom-date-picker
            v-model="dateOfBirth"
            :rules="[rules.required]"
            required
            :readonly="!isEditable"
          />
        </div>

        <!-- Age -->
        <div v-else-if="!isEditable" class="form-control">
          <label class="form-label"> Age </label>
          <v-text-field
            v-model="guardianAge"
            color="teal darken-2"
            dense
            filled
            outlined
            :readonly="!isEditable"
          ></v-text-field>
        </div>
      </div>

      <div class="form-control-group">
        <!-- Nationality -->
        <div class="form-control">
          <label class="form-label"> Nationality (Optional) </label>
          <custom-combobox
            v-model="nationality"
            :items="countries"
            :readonly="!isEditable"
          />
        </div>

        <!-- Monthly Expense -->
        <div class="form-control">
          <label class="form-label"> Monthly Expense (Optional) </label>
          <v-text-field
            v-model="monthlyExpense"
            type="number"
            color="teal darken-2"
            dense
            filled
            outlined
            :readonly="!isEditable"
          ></v-text-field>
        </div>
      </div>

      <div class="form-control-group">
        <!-- Mobile Number -->
        <div class="form-control">
          <label class="form-label"> Mobile Number (Optional) </label>
          <v-text-field
            v-model="mobileNumber"
            color="teal darken-2"
            dense
            filled
            outlined
            :readonly="!isEditable"
          ></v-text-field>
        </div>

        <!-- Telephone Number -->
        <div class="form-control">
          <label class="form-label"> Telephone Number (Optional) </label>
          <v-text-field
            v-model="telephoneNumber"
            color="teal darken-2"
            dense
            filled
            outlined
            :readonly="!isEditable"
          ></v-text-field>
        </div>
      </div>

      <!-- Housing -->
      <h2 class="tw-text-xl tw-text-emerald-800 tw-mt-4 tw-mb-3">Housing</h2>

      <div class="form-control-group">
        <!-- Living Arrangement -->
        <div class="form-control">
          <label class="form-label"> Living Arrangement </label>
          <custom-combobox
            v-model="livingArrangement"
            :items="orphanLivingArrangements"
            :rules="[rules.required]"
            required
          />
        </div>

        <!-- House Type -->
        <div class="form-control">
          <label class="form-label"> House Type </label>
          <v-text-field
            v-model="houseType"
            :rules="[rules.required, rules.name, rules.textWithSpaces]"
            required
            color="teal darken-2"
            dense
            filled
            outlined
            :readonly="!isEditable"
          ></v-text-field>
        </div>
      </div>

      <div v-if="isEditable" class="tw-flex tw-justify-between tw-mt-8">
        <button-dark
          class="tw-bg-red-800 hover:tw-bg-red-700 tw-rounded-lg tw-py-6 tw-px-5"
          @click="back"
        >
          <fa-layers class="fa-lg">
            <fa :icon="['fa', 'arrow-left-long']" />
          </fa-layers>
          <span class="tw-ml-4"> Cancel </span>
        </button-dark>

        <button-dark
          :disabled="!valid"
          class="tw-rounded-lg tw-py-6 tw-px-5"
          @click="submit"
        >
          Continue
          <fa-layers class="fa-lg tw-ml-4">
            <fa :icon="['fa', 'arrow-right-long']" />
          </fa-layers>
        </button-dark>
      </div>
    </v-form>
  </section>
</template>

<script>
import ButtonDark from '~/components/global/ButtonDark.vue'
import ButtonLight from '~/components/global/ButtonLight.vue'
import CustomDatePicker from '~/components/global/CustomDatePicker.vue'
import CustomRadio from '~/components/global/CustomRadio.vue'

import { calculateAge } from '~/helpers/app.helper'

import * as eastAfricanCountries from '~/helpers/eastAfricanCountries.json'
import * as relationToOrphanOptions from '~/helpers/relationToOrphanOptions.json'
import * as orphanLivingArrangements from '~/helpers/livingArrangements.json'

export default {
  name: 'PersonalInfoTab',
  components: {
    ButtonDark,
    ButtonLight,
    CustomRadio,
    CustomDatePicker,
  },

  data() {
    return {
      isEditable: false,
      valid: false,
      rules: {
        required: (value) => !!value || 'Required.',
        textWithSpaces: (value) =>
          /^[a-zA-Z ]+$/.test(value) ||
          !value ||
          'Only letters and spaces allowed.',
        name(value) {
          return (
            (value && value.length >= 3) ||
            'Name must be at least 3 characters long.'
          )
        },
      },
    }
  },

  computed: {
    orphanRelationOptions() {
      return relationToOrphanOptions.default.relationOptions
    },

    guardianAge() {
      return calculateAge(this.dateOfBirth)
    },

    countries() {
      return eastAfricanCountries.default.countries
    },

    isMale() {
      return this.gender === 'M'
    },

    isFemale() {
      return this.gender === 'F'
    },

    orphanLivingArrangements() {
      return orphanLivingArrangements.default.livingArrangements
    },

    relationToOrphan: {
      get() {
        return this.$store.getters['orphan/orphanGuardian'].relationToOrphan
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_GUARDIAN', {
          relationToOrphan: value,
        })
      },
    },

    gender: {
      get() {
        return this.$store.getters['orphan/orphanGuardian'].gender
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_GUARDIAN', { gender: value })
      },
    },

    firstName: {
      get() {
        return this.$store.getters['orphan/orphanGuardian'].firstName
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_GUARDIAN', {
          firstName: value,
        })
      },
    },

    middleName: {
      get() {
        return this.$store.getters['orphan/orphanGuardian'].middleName
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_GUARDIAN', {
          middleName: value,
        })
      },
    },

    lastName: {
      get() {
        return this.$store.getters['orphan/orphanGuardian'].lastName
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_GUARDIAN', {
          lastName: value,
        })
      },
    },

    dateOfBirth: {
      get() {
        return this.$store.getters['orphan/orphanGuardian'].dateOfBirth
      },
      set(value) {
        this.$store.commit('orphan/setGuardianDateOfBirth', {
          dateOfBirth: new Date(value).toISOString(),
        })
      },
    },

    nationality: {
      get() {
        return this.$store.getters['orphan/orphanGuardian'].nationality
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_GUARDIAN', {
          nationality: value,
        })
      },
    },

    monthlyExpense: {
      get() {
        return this.$store.getters['orphan/orphanGuardian'].monthlyExpense
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_GUARDIAN', {
          monthlyExpense: value,
        })
      },
    },

    mobileNumber: {
      get() {
        return this.$store.getters['orphan/orphanGuardian'].mobileNumber
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_GUARDIAN', {
          mobileNumber: value,
        })
      },
    },

    telephoneNumber: {
      get() {
        return this.$store.getters['orphan/orphanGuardian'].telephoneNumber
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_GUARDIAN', {
          telephoneNumber: value,
        })
      },
    },

    // Housing Details

    livingArrangement: {
      get() {
        return this.$store.getters['orphan/orphanGuardian']
          .orphanLivingArrangement
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_GUARDIAN', {
          orphanLivingArrangement: value,
        })
      },
    },

    houseType: {
      get() {
        return this.$store.getters['orphan/orphanGuardian'].orphanHouseType
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_GUARDIAN', {
          orphanHouseType: value,
        })
      },
    },
  },

  async mounted() {
    await this.initialize()
  },

  methods: {
    async initialize() {
      const orphanId = this.$route.params.orphanId
      await this.$store.dispatch('orphan/fetchOrphanGuardian', orphanId)
    },
    back() {
      this.isEditable = false

      this.$toaster.showToast({
        content: 'Profile Edit Cancelled',
        state: 'error',
      })
    },

    submit() {
      if (this.$refs.form.validate()) {
        this.isEditable = false

        this.$toaster.showToast({
          content: 'Profile Edited successfully',
          state: 'success',
        })
      }
    },
  },
}
</script>

<style scoped>
.form-control {
  @apply tw-w-full tw-flex tw-flex-col tw-gap-1;
}

.form-control-group {
  @apply tw-flex tw-gap-4;
}

.form-label {
  @apply tw-text-sm tw-text-gray-800 tw-font-light;
}
</style>
