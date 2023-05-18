<template>
  <v-card class="tw-flex tw-flex-col tw-gap-3 tw-max-w-4xl" elevation="0">
    <v-card-title class="-tw-mb-4">New Donor</v-card-title>
    <v-card-text>
      <v-form ref="donorForm" @submit.prevent="saveDonor">
        <div class="tw-flex tw-flex-row tw-gap-3">
          <div class="form-control">
            <label class="form-label"> Company Name </label>
            <v-text-field
              v-model.trim="companyName"
              :rules="[rules.required]"
              outlined
              filled
              dense
              color="teal darken-2"
            ></v-text-field>
          </div>
          <div class="form-control">
            <label class="form-label"> Coordinator </label>
            <v-select
              v-model="coordinatorId"
              :items="coordinatorOptions"
              :rules="[rules.required]"
              outlined
              filled
              dense
              item-color="teal darken-2"
              color="teal darken-2"
            ></v-select>
          </div>
        </div>
        <div class="tw-flex tw-flex-row tw-gap-3">
          <div class="form-control">
            <v-switch v-model="withUserCreate" color="teal darken-2" inset>
              <template #label>
                <label class="form-label">
                  Do you want to create an account for this donor?
                </label>
              </template>
            </v-switch>
          </div>
        </div>
        <v-card v-if="withUserCreate" class="" elevation="0">
          <v-card-title> Donor Account </v-card-title>
          <v-card-text>
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
                  class="tw-max-w-sm"
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
          </v-card-text>
        </v-card>
        <div v-else class="tw-flex tw-flex-row tw-gap-3 tw-max-w-md">
          <div class="form-control">
            <label class="form-label"> User </label>
            <v-select
              v-model="userId"
              :items="donorUserOptions"
              :rules="[rules.required]"
              outlined
              filled
              dense
              item-color="teal darken-2"
              color="teal darken-2"
            ></v-select>
          </div>
        </div>
        <div class="tw-flex tw-flex-row tw-gap-3">
          <div class="tw-w-full tw-flex tw-justify-end">
            <button-dark @click="saveDonor">Save</button-dark>
          </div>
        </div>
      </v-form>
      <post-save-dialog
        v-if="showPostSaveDialog"
        :show="showPostSaveDialog"
        :item-name="donorCompanyName"
        item-type="Donor"
        no-route="/head/donors"
        @redoActionDeclined="showPostSaveDialog = false"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import PostSaveDialog from '~/components/global/dialogs/PostSaveDialog.vue'
import { generatePassword as passGen, fullName  } from '~/helpers/app.helper'
function capitalizeCompanyInitials(companyName) {
  return companyName
    .split(' ')
    .map((word) => {
      if (word === word.toUpperCase()) {
        return word
      }
      return word.charAt(0).toUpperCase()
    })
    .join('')
}
export default {
  name: 'AddDonorPage',
  components: {
    PostSaveDialog,
  },
  layout: 'head',
  data() {
    return {
      companyName: null,
      donorCompanyName: null,
      coordinatorId: null,
      showPostSaveDialog: false,
      withUserCreate: false,
      userId: null,
      roleOptions: [
        {
          text: 'Donor (Donor Representative)',
          value: 'DONOR',
        },
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
      firstName: null,
      middleName: null,
      lastName: null,
      dateOfBirth: null,
      gender: null,
      phoneNumber: null,
      role: null,
      email: null,
      password: null,
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => /.+@.+\..+/.test(value) || 'E-mail must be valid',
      },
    }
  },
  computed: {
    coordinatorOptions() {
      return this.$store.state.head.coordinators.map((coordinator) => {
        return {
          text: fullName(coordinator.user.personalInfo),
          value: coordinator.id,
        }
      })
    },
    donorUserOptions() {
      return this.$store.state.head.donorUsers.map((user) => {
        return {
          text: fullName(user.personalInfo),
          value: user.id,
        }
      })
    },
  },
  mounted() {
    this.$store.dispatch('head/fetchCoordinators', true)
    this.$store.dispatch('head/fetchDonorUsers')
  },
  methods: {
    generatePassword() {
      this.password = passGen()
      // eslint-disable-next-line no-console
      console.debug(this.password)
    },
    async saveDonor() {
      if (!this.$refs.donorForm.validate()) return
      this.donorCompanyName = this.companyName
      const createDonorInput = {
        companyName: this.companyName,
        nameInitials: capitalizeCompanyInitials(this.companyName),
        coordinatorId: this.coordinatorId,
        userId: this.withUserCreate ? undefined : this.userId,
        user: this.withUserCreate
          ? {
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
          : undefined,
      }
      try {
        await this.$store.dispatch('head/createDonor', createDonorInput)
        this.reset()
        this.$router.push('/donors')
      } catch (e) {
        /* empty */
      } // grounding the error
    },
    reset() {
      this.showPostSaveDialog = true
      this.$refs.donorForm.reset()
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
