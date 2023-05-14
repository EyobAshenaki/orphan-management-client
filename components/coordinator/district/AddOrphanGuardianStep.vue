<template>
  <section>
    <h1 class="tw-text-2xl tw-text-emerald-800 tw-mt-8 tw-mb-6">
      Orphan Guardian
    </h1>

    <v-form ref="form" v-model="valid" class="tw-max-w-[37rem]">
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
          class="tw-w-1/2"
        ></v-select>
      </div>

      <div class="form-control">
        <label class="form-label"> Gender </label>
        <v-radio-group
          v-model="gender"
          :rules="[rules.required]"
          required
          class="-tw-mt-1"
          row
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
          ></v-text-field>
        </div>

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
          ></v-text-field>
        </div>
      </div>

      <div class="form-control-group">
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
          ></v-text-field>
        </div>

        <div class="form-control">
          <label class="form-label"> Date of Birth </label>
          <custom-date-picker
            v-model="dateOfBirth"
            :rules="[rules.required]"
            required
          />
        </div>
      </div>

      <div class="form-control-group">
        <div class="form-control">
          <label class="form-label"> Nationality (Optional) </label>
          <custom-combobox v-model="nationality" :items="countries" />
        </div>

        <div class="form-control">
          <label class="form-label"> Monthly Expense (Optional) </label>
          <v-text-field
            v-model="monthlyExpense"
            type="number"
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>
      </div>

      <div class="form-control-group">
        <div class="form-control">
          <label class="form-label"> Mobile Number (Optional) </label>
          <v-text-field
            v-model="mobileNumber"
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>

        <div class="form-control">
          <label class="form-label"> Telephone Number (Optional) </label>
          <v-text-field
            v-model="telephoneNumber"
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>
      </div>

      <div class="tw-flex tw-justify-between tw-mt-8">
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
import CustomDatePicker from '~/components/global/CustomDatePicker.vue'
import CustomRadio from '~/components/global/CustomRadio.vue'
import * as eastAfricanCountries from '~/helpers/eastAfricanCountries.json'
import * as relationToOrphanOptions from '~/helpers/relationToOrphanOptions.json'

export default {
  name: 'OrphanDetailStep',
  components: {
    ButtonDark,
    CustomRadio,
    CustomDatePicker,
  },

  data() {
    return {
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

    countries() {
      return eastAfricanCountries.default.countries
    },

    isMale() {
      return this.gender === 'M'
    },

    isFemale() {
      return this.gender === 'F'
    },

    relationToOrphan: {
      get() {
        return this.$store.getters['addOrphan/getOrphanGuardian']
          .relationToOrphan
      },
      set(value) {
        this.$store.dispatch('addOrphan/setGuardianRelationToOrphan', value)
      },
    },

    gender: {
      get() {
        return this.$store.getters['addOrphan/getOrphanGuardian'].gender
      },
      set(value) {
        this.$store.dispatch('addOrphan/setGuardianGender', value)
      },
    },

    firstName: {
      get() {
        return this.$store.getters['addOrphan/getOrphanGuardian'].firstName
      },
      set(value) {
        this.$store.dispatch('addOrphan/setGuardianFirstName', value)
      },
    },

    middleName: {
      get() {
        return this.$store.getters['addOrphan/getOrphanGuardian'].middleName
      },
      set(value) {
        this.$store.dispatch('addOrphan/setGuardianMiddleName', value)
      },
    },

    lastName: {
      get() {
        return this.$store.getters['addOrphan/getOrphanGuardian'].lastName
      },
      set(value) {
        this.$store.dispatch('addOrphan/setGuardianLastName', value)
      },
    },

    dateOfBirth: {
      get() {
        return this.$store.getters['addOrphan/getOrphanGuardian'].dateOfBirth
      },
      set(value) {
        this.$store.dispatch('addOrphan/setGuardianDateOfBirth', new Date(value).toISOString())
      },
    },

    nationality: {
      get() {
        return this.$store.getters['addOrphan/getOrphanGuardian'].nationality
      },
      set(value) {
        this.$store.dispatch('addOrphan/setGuardianNationality', value)
      },
    },

    monthlyExpense: {
      get() {
        return this.$store.getters['addOrphan/getOrphanGuardian'].monthlyExpense
      },
      set(value) {
        this.$store.dispatch('addOrphan/setGuardianMonthlyExpense', value)
      },
    },

    mobileNumber: {
      get() {
        return this.$store.getters['addOrphan/getOrphanGuardian'].mobileNumber
      },
      set(value) {
        this.$store.dispatch('addOrphan/setGuardianMobileNumber', value)
      },
    },

    telephoneNumber: {
      get() {
        return this.$store.getters['addOrphan/getOrphanGuardian']
          .telephoneNumber
      },
      set(value) {
        this.$store.dispatch('addOrphan/setGuardianTelephoneNumber', value)
      },
    },
  },

  methods: {
    back() {
      this.$store.dispatch('addOrphan/previousStep')
    },

    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('addOrphan/nextStep')
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
