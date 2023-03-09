<template>
  <section>
    <h1 class="tw-text-2xl tw-text-emerald-800 tw-mt-8 tw-mb-6">
      Orphan Guardian
    </h1>

    <v-form class="tw-max-w-[37rem]">
      <div class="form-control">
        <label class="form-label"> Relation to Orphan </label>
        <v-select
          :items="orphanRelationOptions"
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
        <v-radio-group v-model="gender" class="-tw-mt-1" row>
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

      <div class="form-control-group">
        <div class="form-control">
          <label class="form-label"> Nationality </label>
          <custom-combobox :items="countries" />
        </div>

        <div class="form-control">
          <label class="form-label"> Monthly Expense </label>
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
          <label class="form-label"> Mobile Number </label>
          <v-text-field
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>

        <div class="form-control">
          <label class="form-label"> Telephone Number </label>
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
      gender: '',
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
  },

  methods: {
    submit() {
      this.$store.dispatch('addOrphan/setActiveStep', 5)
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
