<template>
  <section class="tw-bg-white tw-rounded-md tw-p-5">
    <button-light
      class="tw-absolute tw-top-11 tw-right-6"
      @click="isEditable = !isEditable"
    >
      <fa-layers class="tw-mr-2">
        <fa :icon="['fa', 'pen-to-square']" />
      </fa-layers>
      <span>Edit</span>
    </button-light>

    <v-form ref="form" v-model="valid" class="tw-max-w-[37rem]">
      <!-- Father -->
      <h2 class="tw-text-xl tw-text-emerald-800 tw-mt-4 tw-mb-3">Father</h2>

      <div class="form-control-group">
        <div class="form-control">
          <label class="form-label"> Date of Birth (Optional) </label>
          <custom-date-picker
            v-model="fatherDateOfBirth"
            :readonly="!isEditable"
          />
        </div>

        <div class="form-control">
          <label class="form-label"> Date of Death </label>
          <custom-date-picker
            v-model="fatherDateOfDeath"
            :rules="[rules.required]"
            required
            :readonly="!isEditable"
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
          :readonly="!isEditable"
        ></v-text-field>
      </div>

      <!-- Mother -->
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
            :readonly="!isEditable"
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
            :readonly="!isEditable"
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
            :readonly="!isEditable"
          ></v-text-field>
        </div>

        <div class="form-control">
          <label class="form-label"> Date of Birth (Optional) </label>
          <custom-date-picker
            v-model="motherDateOfBirth"
            :readonly="!isEditable"
          />
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
          :readonly="!isEditable"
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
        <v-radio-group
          v-model="motherMaritalStatus"
          class="-tw-mt-1"
          row
          :readonly="!isEditable"
        >
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
          <custom-date-picker
            v-model="motherDateOfDeath"
            :readonly="!isEditable"
          />
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
            :readonly="!isEditable"
          ></v-text-field>
        </div>
      </div>

      <div v-if="isEditable" class="tw-flex tw-justify-between tw-mt-8">
        <button-dark
          class="tw-bg-red-800 hover:tw-bg-red-700 tw-rounded-lg tw-py-6 tw-px-5"
          @click="cancel"
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
          Confirm
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

export default {
  name: 'OrphanDetailStep',
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
        return this.$store.getters['orphan/orphanFamily'].fatherDateOfBirth
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_FAMILY', {
          fatherDateOfBirth: value,
        })
      },
    },

    fatherDateOfDeath: {
      get() {
        return this.$store.getters['orphan/orphanFamily'].fatherDateOfDeath
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_FAMILY', {
          fatherDateOfDeath: value,
        })
      },
    },

    fatherCauseOfDeath: {
      get() {
        return this.$store.getters['orphan/orphanFamily'].fatherCauseOfDeath
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_FAMILY', {
          fatherCauseOfDeath: value,
        })
      },
    },

    motherFirstName: {
      get() {
        return this.$store.getters['orphan/orphanFamily'].motherFirstName
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_FAMILY', {
          motherFirstName: value,
        })
      },
    },

    motherMiddleName: {
      get() {
        return this.$store.getters['orphan/orphanFamily'].motherMiddleName
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_FAMILY', {
          motherMiddleName: value,
        })
      },
    },

    motherLastName: {
      get() {
        return this.$store.getters['orphan/orphanFamily'].motherLastName
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_FAMILY', {
          motherLastName: value,
        })
      },
    },

    motherDateOfBirth: {
      get() {
        return this.$store.getters['orphan/orphanFamily'].motherDateOfBirth
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_FAMILY', {
          motherDateOfBirth: value,
        })
      },
    },

    motherVitalStatus: {
      get() {
        return this.$store.getters['orphan/orphanFamily'].motherVitalStatus
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_FAMILY', {
          motherVitalStatus: value,
        })
      },
    },

    motherMaritalStatus: {
      get() {
        return this.$store.getters['orphan/orphanFamily'].motherMaritalStatus
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_FAMILY', {
          motherMaritalStatus: value,
        })
      },
    },

    motherDateOfDeath: {
      get() {
        return this.$store.getters['orphan/orphanFamily'].motherDateOfDeath
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_FAMILY', {
          motherDateOfDeath: value,
        })
      },
    },

    motherCauseOfDeath: {
      get() {
        return this.$store.getters['orphan/orphanFamily'].motherCauseOfDeath
      },
      set(value) {
        this.$store.commit('orphan/MODIFY_ORPHAN_FAMILY', {
          motherCauseOfDeath: value,
        })
      },
    },
  },

  watch: {
    motherVitalStatus() {
      this.$refs.form.resetValidation()
    },
  },

  async mounted() {
    await this.initialize()
  },

  methods: {
    async initialize() {
      const orphanId = this.$route.params.id
      await this.$store.dispatch('orphan/fetchOrphanFamily', orphanId)
    },
    cancel() {
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
