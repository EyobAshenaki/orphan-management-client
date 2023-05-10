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
      <!-- Code -->
      <div v-if="isEditable" class="form-control mt-5">
        <label class="form-label"> Code </label>
        <v-text-field
          v-model="code"
          :rules="[rules.required]"
          required
          color="teal darken-2"
          dense
          filled
          outlined
        ></v-text-field>
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
        >
          <custom-radio
            :class="[gender === 'M' ? 'tw-border-emerald-800' : '']"
            label="Male"
            value="M"
          />
          <custom-radio
            :class="[gender === 'F' ? 'tw-border-emerald-800' : '']"
            label="Female"
            value="F"
          />
        </v-radio-group>
      </div>

      <div class="form-control-group">
        <!-- Name -->
        <div class="form-control">
          <label class="form-label"> Name </label>
          <v-text-field
            v-model="orphanName"
            :rules="[rules.required, rules.name, rules.textWithSpaces]"
            required
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>

        <!-- Father Name -->
        <div class="form-control">
          <label class="form-label"> Father Name </label>
          <v-text-field
            v-model="fatherName"
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
        <!-- Grand Father Name -->
        <div class="form-control">
          <label class="form-label"> Grand Father Name </label>
          <v-text-field
            v-model="grandFatherName"
            :rules="[rules.required, rules.name, rules.textWithSpaces]"
            required
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>

        <!-- Date of Birth -->
        <div v-if="isEditable" class="form-control">
          <label class="form-label"> Date of Birth </label>
          <custom-date-picker
            v-model="dateOfBirth"
            :rules="[rules.required]"
            required
          />
        </div>

        <!-- Age -->
        <div v-else-if="!isEditable" class="form-control">
          <label class="form-label"> Age </label>
          <v-text-field
            v-model="orphanAge"
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>
      </div>

      <div class="form-control-group">
        <!-- Place of Birth -->
        <div class="form-control">
          <label class="form-label"> Place of Birth </label>
          <v-text-field
            v-model="placeOfBirth"
            :rules="[rules.required, rules.textWithSpaces]"
            required
            color="teal darken-2"
            dense
            filled
            outlined
          ></v-text-field>
        </div>

        <!-- Religion -->
        <div class="form-control">
          <label class="form-label"> Religion </label>
          <custom-combobox v-model="religion" :items="religions" />
        </div>
      </div>

      <!-- Spoken Languages -->
      <div class="form-control">
        <label class="form-label"> Spoken Languages </label>
        <custom-combobox
          v-model="spokenLanguages"
          :items="languagesOption"
          :multiple="true"
        />
      </div>

      <!-- Hobbies -->
      <div class="asset-container">
        <label class="form-label"> Hobbies </label>
        <!-- Add new hobby -->
        <div v-if="isHobbyFieldOpen" class="tw-flex tw-items-center tw-gap-2">
          <div class="form-control tw-w-1/2">
            <v-text-field
              v-model="hobbyValue"
              color="teal darken-2"
              dense
              filled
              outlined
            ></v-text-field>
          </div>
          <button-dark @click="addHobby"> Save </button-dark>
          <v-btn
            class="tw-text-sm tw-capitalize tw-text-gray-500 tw-bg-gray-200 tw-ring-1 tw-ring-gray-400"
            :rules="[rules.textWithSpaces]"
            depressed
            :ripple="false"
            @click="closeHobbyField"
          >
            Cancel
          </v-btn>
        </div>

        <div v-else>
          <div class="tw-flex tw-items-center tw-gap-2">
            <div v-if="hobbies">
              <v-chip
                v-for="(hobby, idx) in hobbies"
                :key="idx"
                class="tw-mx-2"
                color="teal darken-3"
                text-color="white"
                close
                @click:close="deleteHobby(hobby)"
              >
                <div
                  class="tw-w-[22px] tw-aspect-square tw-relative tw-rounded-full tw-text-emerald-800 tw-bg-white -tw-ml-1 tw-mr-2"
                >
                  <fa-layers
                    class="tw-absolute tw-top-1/2 tw-left-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2"
                  >
                    <fa
                      class="tw-w-[13px] tw-h-[13px]"
                      :icon="['fa', 'coins']"
                    />
                  </fa-layers>
                </div>
                {{ hobby }}
              </v-chip>
            </div>
            <div v-if="!hobbies" class="form-control tw-w-1/2">
              <v-text-field
                value="None"
                color="teal darken-2"
                dense
                filled
                outlined
              ></v-text-field>
            </div>

            <button-light v-if="isEditable" @click="openHobbyField">
              <fa-layers>
                <fa
                  class="tw-w-4 tw-h-4 tw-text-emerald-800"
                  :icon="['fa', 'plus']"
                />
              </fa-layers>
              <span class="tw-font-medium tw-text-emerald-800 tw-ml-2">
                Add New Hobby
              </span>
            </button-light>
          </div>
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
import CustomCombobox from '~/components/global/CustomCombobox.vue'
import CustomRadio from '~/components/global/CustomRadio.vue'

import { calculateAge } from '~/helpers/app.helpers'

import * as ethiopianLanguages from '~/helpers/commonEthiopianLanguages.json'
import * as ethiopianReligions from '~/helpers/commonEthiopianReligions.json'

export default {
  name: 'PersonalInfo',
  components: { ButtonDark, ButtonLight, CustomRadio, CustomCombobox },

  data() {
    return {
      isEditable: false,
      valid: false,
      isHobbyFieldOpen: false,
      hobbyValue: '',
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
    languagesOption() {
      return ethiopianLanguages.default.languages
    },

    religions() {
      return ethiopianReligions.default.religions
    },

    hobbies() {
      return this.$store.getters['addOrphan/getOrphanDetails'].hobbies
    },

    hasHobbies() {
      return this.hobbies && this.hobbies.length > 0
    },

    orphanAge() {
      return calculateAge(this.dateOfBirth)
    },

    code: {
      get() {
        return this.$store.getters['addOrphan/getOrphanDetails'].code
      },
      set(value) {
        this.$store.dispatch('addOrphan/setCode', value)
      },
    },

    gender: {
      get() {
        return this.$store.getters['addOrphan/getOrphanDetails'].gender
      },
      set(value) {
        this.$store.dispatch('addOrphan/setGender', value)
      },
    },

    orphanName: {
      get() {
        return this.$store.getters['addOrphan/getOrphanDetails'].name
      },
      set(value) {
        this.$store.dispatch('addOrphan/setOrphanName', value)
      },
    },

    fatherName: {
      get() {
        return this.$store.getters['addOrphan/getOrphanDetails'].fatherName
      },
      set(value) {
        this.$store.dispatch('addOrphan/setFatherName', value)
      },
    },

    grandFatherName: {
      get() {
        return this.$store.getters['addOrphan/getOrphanDetails'].grandFatherName
      },
      set(value) {
        this.$store.dispatch('addOrphan/setGrandFatherName', value)
      },
    },

    dateOfBirth: {
      get() {
        return this.$store.getters['addOrphan/getOrphanDetails'].dateOfBirth
      },
      set(value) {
        this.$store.dispatch('addOrphan/setDateOfBirth', value)
      },
    },

    placeOfBirth: {
      get() {
        return this.$store.getters['addOrphan/getOrphanDetails'].placeOfBirth
      },
      set(value) {
        this.$store.dispatch('addOrphan/setPlaceOfBirth', value)
      },
    },

    religion: {
      get() {
        return this.$store.getters['addOrphan/getOrphanDetails'].religion
      },
      set(value) {
        this.$store.dispatch('addOrphan/setReligion', value)
      },
    },

    spokenLanguages: {
      get() {
        return this.$store.getters['addOrphan/getOrphanDetails'].spokenLanguages
      },
      set(value) {
        this.$store.dispatch('addOrphan/setSpokenLanguages', value)
      },
    },
  },

  methods: {
    closeHobbyField() {
      this.isHobbyFieldOpen = false
    },

    openHobbyField() {
      this.isHobbyFieldOpen = true
    },

    deleteHobby(hobby) {
      this.$store.dispatch('addOrphan/deleteHobby', hobby)
    },

    addHobby() {
      this.$store.dispatch('addOrphan/addHobby', this.hobbyValue)
      this.hobbyValue = ''
      this.closeHobbyField()
    },

    cancel() {
      // TODO: show confirmation dialog
      // and if confirmed, reset the store and go back to the previous page
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
