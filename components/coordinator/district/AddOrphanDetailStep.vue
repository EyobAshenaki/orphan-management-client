<template>
  <section>
    <h1 class="tw-text-2xl tw-text-emerald-800 tw-mt-8 tw-mb-6">
      Orphan Details
    </h1>

    <v-form ref="form" v-model="valid" class="tw-max-w-[37rem]">
      <div class="form-control mt-5">
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

        <div class="form-control">
          <label class="form-label"> Religion (Optional) </label>
          <custom-combobox v-model="religion" :items="religions" />
        </div>
      </div>

      <div class="form-control">
        <label class="form-label"> Spoken Languages (Optional) </label>
        <custom-combobox
          v-model="spokenLanguages"
          :items="languagesOption"
          :multiple="true"
        />
      </div>

      <div class="asset-container">
        <div v-if="isHobbyFieldOpen" class="tw-flex tw-items-center tw-gap-2">
          <div class="form-control tw-w-1/2">
            <label class="form-label"> Hobbies (Optional) </label>
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

            <button-light @click="openHobbyField">
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

      <div class="tw-flex tw-justify-between tw-mt-8">
        <v-dialog
          v-model="cancelConfirmDialog"
          persistent
          :overlay="false"
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <v-card-title class="text-h5"
              >Confirm cancellation. Are you you sure?</v-card-title
            >
            <v-divider />
            <v-card-text
              >If you cancel orphan registration all the data in the form will
              be lost.</v-card-text
            >
            <v-card-actions>
              <v-spacer />
              <button-dark
                color="red darken-1"
                text
                @click="cancelConfirmDialog = false"
              >
                No
              </button-dark>
              <button-light
                color="green darken-1"
                text
                class="hover:tw-bg-red-700 hover:tw-text-white"
                @click="
                  cancelConfirmDialog = false
                  cancel()
                "
              >
                Yes
              </button-light>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <button-dark
          class="tw-bg-red-800 hover:tw-bg-red-700 tw-rounded-lg tw-py-6 tw-px-5"
          @click="showCancelConfirmDialog"
        >
          <fa-layers class="fa-lg">
            <fa :icon="['fa', 'xmark']" />
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
import CustomCombobox from '~/components/global/CustomCombobox.vue'
import CustomRadio from '~/components/global/CustomRadio.vue'

import * as ethiopianLanguages from '~/helpers/commonEthiopianLanguages.json'
import * as ethiopianReligions from '~/helpers/commonEthiopianReligions.json'

export default {
  name: 'OrphanDetailStep',
  components: { ButtonDark, CustomRadio, CustomCombobox },

  data() {
    return {
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
      cancelConfirmDialog: false,
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

    showCancelConfirmDialog() {
      this.cancelConfirmDialog = true
    },

    cancel() {
      this.$store.dispatch('addOrphan/clearForm')
      this.$router.back()
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
