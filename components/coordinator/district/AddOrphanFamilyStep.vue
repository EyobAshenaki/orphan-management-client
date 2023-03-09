<template>
  <section>
    <h1 class="tw-text-2xl tw-text-emerald-800 tw-mt-8 tw-mb-6">
      Orphan Family
    </h1>

    <v-form class="tw-max-w-[37rem] mt-5">
      <h2 class="tw-text-xl tw-text-emerald-800 tw-mt-4 tw-mb-3">Father</h2>

      <div class="form-control-group">
        <div class="form-control">
          <label class="form-label"> Date of Birth </label>
          <custom-date-picker />
        </div>

        <div class="form-control">
          <label class="form-label"> Date of Death </label>
          <custom-date-picker />
        </div>
      </div>

      <div class="form-control">
        <label class="form-label"> Cause of Death </label>
        <v-text-field
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
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>

        <div class="form-control">
          <label class="form-label"> Middle Name </label>
          <v-text-field
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
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>

        <div class="form-control">
          <label class="form-label"> Date of Birth </label>
          <custom-date-picker />
        </div>
      </div>

      <div class="form-control">
        <label class="form-label"> Vital Status </label>
        <v-radio-group v-model="vitalStatus" class="-tw-mt-1" row>
          <custom-radio
            :class="[isAlive ? 'tw-border-emerald-800' : '']"
            label="Enrolled"
            value="enrolled"
          />
          <custom-radio
            :class="[isDeceased ? 'tw-border-emerald-800' : '']"
            label="Drop-out"
            value="dropout"
          />
        </v-radio-group>
      </div>

      <div class="form-control">
        <label class="form-label"> Marital Status </label>
        <v-radio-group v-model="maritalStatus" class="-tw-mt-1" row>
          <custom-radio
            :class="[isMarried ? 'tw-border-emerald-800' : '']"
            label="Enrolled"
            value="enrolled"
          />
          <custom-radio
            :class="[isWidow ? 'tw-border-emerald-800' : '']"
            label="Drop-out"
            value="dropout"
          />
        </v-radio-group>
      </div>

      <div class="form-control-group">
        <div class="form-control">
          <label class="form-label"> Date of Death </label>
          <custom-date-picker />
        </div>

        <div class="form-control">
          <label class="form-label"> Cause of Death </label>
          <v-text-field
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>
      </div>

      <div class="tw-flex tw-justify-end">
        <button-dark class="tw-rounded-lg tw-py-6 tw-px-5" @click="submit">
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
      vitalStatus: '',
      maritalStatus: '',
    }
  },

  computed: {
    isAlive() {
      return this.vitalStatus === 'alive'
    },

    isDeceased() {
      return this.vitalStatus === 'deceased'
    },

    isMarried() {
      return this.maritalStatus === 'married'
    },

    isWidow() {
      return this.maritalStatus === 'widow'
    },
  },

  methods: {
    submit() {
      this.$store.dispatch('addOrphan/setActiveStep', 4)
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
