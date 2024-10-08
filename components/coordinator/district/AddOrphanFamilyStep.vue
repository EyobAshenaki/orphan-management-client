<template>
  <section>
    <h1 class="tw-text-2xl tw-text-emerald-800 tw-mt-8 tw-mb-6">
      Orphan Family
    </h1>

    <v-form ref="form" v-model="valid" class="tw-max-w-[37rem] mt-5">
      <h2 class="tw-text-xl tw-text-emerald-800 tw-mt-4 tw-mb-3">Father</h2>

      <div class="form-control-group">
        <div class="form-control">
          <label class="form-label"> Date of Birth (Optional) </label>
          <custom-date-picker v-model="fatherDateOfBirth" />
        </div>

        <div class="form-control">
          <label class="form-label"> Date of Death </label>
          <custom-date-picker
            v-model="fatherDateOfDeath"
            :rules="[rules.required]"
            required
          />
        </div>
      </div>

      <div class="form-control">
        <label class="form-label"> Cause of Death (Optional) </label>
        <v-text-field
          v-model="fatherCauseOfDeath"
          :rules="[rules.textWithSpaces]"
          class="tw-w-1/2"
          color="teal darken-2"
          dense
          filled
          outlined
        ></v-text-field>
      </div>

      <h2 class="tw-text-xl tw-text-emerald-800 tw-mt-4 tw-mb-3">Mother</h2>

      <div class="form-control-group">
        <div class="form-control">
          <label class="form-label"> First Name </label>
          <v-text-field
            v-model="motherFirstName"
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
            v-model="motherMiddleName"
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
            v-model="motherLastName"
            :rules="[rules.required, rules.name, rules.textWithSpaces]"
            required
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>

        <div class="form-control">
          <label class="form-label"> Date of Birth (Optional) </label>
          <custom-date-picker v-model="motherDateOfBirth" />
        </div>
      </div>

      <div class="form-control">
        <label class="form-label"> Vital Status </label>
        <v-radio-group
          v-model="motherVitalStatus"
          :rules="[rules.required]"
          required
          class="-tw-mt-1"
          row
        >
          <custom-radio
            :class="[isAlive ? 'tw-border-emerald-800' : '']"
            label="Alive"
            value="ALIVE"
          />
          <custom-radio
            :class="[isDeceased ? 'tw-border-emerald-800' : '']"
            label="Deceased"
            value="PASSED_AWAY"
          />
        </v-radio-group>
      </div>

      <div v-if="isAlive" class="form-control">
        <label class="form-label"> Marital Status (Optional) </label>
        <v-radio-group v-model="motherMaritalStatus" class="-tw-mt-1" row>
          <custom-radio
            :class="[isMarried ? 'tw-border-emerald-800' : '']"
            label="Married"
            value="MARRIED"
          />
          <custom-radio
            :class="[isWidow ? 'tw-border-emerald-800' : '']"
            label="Widow"
            value="WIDOWED"
          />
        </v-radio-group>
      </div>

      <div v-if="isDeceased" class="form-control-group">
        <div class="form-control">
          <label class="form-label"> Date of Death (Optional) </label>
          <custom-date-picker v-model="motherDateOfDeath" />
        </div>

        <div class="form-control">
          <label class="form-label"> Cause of Death (Optional) </label>
          <v-text-field
            v-model="motherCauseOfDeath"
            :rules="[rules.textWithSpaces]"
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
          <span class="tw-ml-4"> Back </span>
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
    isAlive() {
      return this.motherVitalStatus === 'ALIVE'
    },

    isDeceased() {
      return this.motherVitalStatus === 'PASSED_AWAY'
    },

    isMarried() {
      return this.motherMaritalStatus === 'MARRIED'
    },

    isWidow() {
      return this.motherMaritalStatus === 'WIDOWED'
    },

    fatherDateOfBirth: {
      get() {
        return this.$store.getters['addOrphan/getOrphanFamily']
          .fatherDateOfBirth
      },
      set(value) {
        this.$store.dispatch('addOrphan/setFatherDateOfBirth', value)
      },
    },

    fatherDateOfDeath: {
      get() {
        return this.$store.getters['addOrphan/getOrphanFamily']
          .fatherDateOfDeath
      },
      set(value) {
        this.$store.dispatch('addOrphan/setFatherDateOfDeath', value)
      },
    },

    fatherCauseOfDeath: {
      get() {
        return this.$store.getters['addOrphan/getOrphanFamily']
          .fatherCauseOfDeath
      },
      set(value) {
        this.$store.dispatch('addOrphan/setFatherCauseOfDeath', value)
      },
    },

    motherFirstName: {
      get() {
        return this.$store.getters['addOrphan/getOrphanFamily'].motherFirstName
      },
      set(value) {
        this.$store.dispatch('addOrphan/setMotherFirstName', value)
      },
    },

    motherMiddleName: {
      get() {
        return this.$store.getters['addOrphan/getOrphanFamily'].motherMiddleName
      },
      set(value) {
        this.$store.dispatch('addOrphan/setMotherMiddleName', value)
      },
    },

    motherLastName: {
      get() {
        return this.$store.getters['addOrphan/getOrphanFamily'].motherLastName
      },
      set(value) {
        this.$store.dispatch('addOrphan/setMotherLastName', value)
      },
    },

    motherDateOfBirth: {
      get() {
        return this.$store.getters['addOrphan/getOrphanFamily']
          .motherDateOfBirth
      },
      set(value) {
        this.$store.dispatch('addOrphan/setMotherDateOfBirth', value)
      },
    },

    motherVitalStatus: {
      get() {
        return this.$store.getters['addOrphan/getOrphanFamily']
          .motherVitalStatus
      },
      set(value) {
        this.$store.dispatch('addOrphan/setMotherVitalStatus', value)
      },
    },

    motherMaritalStatus: {
      get() {
        return this.$store.getters['addOrphan/getOrphanFamily']
          .motherMaritalStatus
      },
      set(value) {
        this.$store.dispatch('addOrphan/setMotherMaritalStatus', value)
      },
    },

    motherDateOfDeath: {
      get() {
        return this.$store.getters['addOrphan/getOrphanFamily']
          .motherDateOfDeath
      },
      set(value) {
        this.$store.dispatch('addOrphan/setMotherDateOfDeath', value)
      },
    },

    motherCauseOfDeath: {
      get() {
        return this.$store.getters['addOrphan/getOrphanFamily']
          .motherCauseOfDeath
      },
      set(value) {
        this.$store.dispatch('addOrphan/setMotherCauseOfDeath', value)
      },
    },
  },

  watch: {
    motherVitalStatus() {
      this.$refs.form.resetValidation()
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
