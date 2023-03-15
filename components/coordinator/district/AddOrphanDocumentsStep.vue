<template>
  <section>
    <h1 class="tw-text-2xl tw-text-emerald-800 tw-mt-8 tw-mb-6">
      Orphan Documents
    </h1>

    <v-form ref="form" v-model="valid" class="tw-max-w-[37rem]">
      <h2 class="tw-text-xl tw-text-emerald-800 tw-mt-4 tw-mb-3">Orphan</h2>
      <div class="form-control-group">
        <div class="form-control">
          <label class="form-label"> Birth Date Certificate </label>
          <custom-file-input
            :rules="[rules.required]"
            required
            placeholder="Attach Birth Certificate"
            @fileChange="handleFileChange($event, 'orphanBirthCertificate')"
          />
        </div>

        <div class="form-control">
          <label class="form-label"> Portrait Photo </label>
          <custom-file-input
            :rules="[rules.required]"
            required
            placeholder="Attach Portrait Photo"
            @fileChange="handleFileChange($event, 'orphanPortraitPhoto')"
          />
        </div>
      </div>

      <div class="form-control-group">
        <div class="form-control">
          <label class="form-label"> ID (Optional) </label>
          <custom-file-input
            placeholder="Attach ID"
            @fileChange="handleFileChange($event, 'orphanId')"
          />
        </div>

        <div class="form-control">
          <label class="form-label"> Passport (Optional) </label>
          <custom-file-input
            placeholder="Attach Passport"
            @fileChange="handleFileChange($event, 'orphanPassport')"
          />
        </div>
      </div>

      <div class="form-control">
        <label class="form-label"> Report Card (Optional) </label>
        <custom-file-input
          placeholder="Attach Report Card"
          @fileChange="handleFileChange($event, 'orphanReportCard')"
        />
      </div>

      <h2 class="tw-text-xl tw-text-emerald-800 tw-mt-4 tw-mb-3">Father</h2>

      <div class="form-control">
        <label class="form-label"> Death Certificate </label>
        <custom-file-input
          :rules="[rules.required]"
          required
          placeholder="Attach Death Certificate"
          @fileChange="handleFileChange($event, 'fatherDeathCertificate')"
        />
      </div>

      <h2 class="tw-text-xl tw-text-emerald-800 tw-mt-4 tw-mb-3">Guardian</h2>

      <div class="form-control-group">
        <div class="form-control">
          <label class="form-label"> ID </label>
          <custom-file-input
            :rules="[rules.required]"
            required
            placeholder="Attach ID"
            @fileChange="handleFileChange($event, 'guardianId')"
          />
        </div>

        <div class="form-control">
          <label class="form-label">
            Memorandum Of Understanding / MOU (Optional)
          </label>
          <custom-file-input
            placeholder="Attach MOU"
            @fileChange="handleFileChange($event, 'memorandumOfUnderstanding')"
          />
        </div>
      </div>

      <div class="form-control">
        <label class="form-label"> Adoption Certificate (Optional) </label>
        <custom-file-input
          placeholder="Attach Adoption Certificate"
          @fileChange="handleFileChange($event, 'adoptionCertificate')"
        />
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
          Submit
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
import CustomFileInput from '~/components/global/CustomFileInput.vue'
import { handleUrlUpload } from '~/helpers/upload.helper'

export default {
  name: 'OrphanDetailStep',
  components: {
    ButtonDark,
    CustomFileInput,
  },

  data() {
    return {
      document: {
        orphanBirthCertificate: null,
        orphanPortraitPhoto: null,
        orphanId: null,
        orphanPassport: null,
        orphanReportCard: null,
        fatherDeathCertificate: null,
        guardianId: null,
        memorandumOfUnderstanding: null,
        adoptionCertificate: null,
      },
      valid: false,
      rules: {
        required: (value) => !!value || 'Required.',
      },
    }
  },

  methods: {
    handleFileChange(file, field) {
      this.document[field] = file
      console.log(this.document[field])
    },

    back() {
      this.$store.dispatch('addOrphan/previousStep')
    },

    // *** Uncomment this when the backend is ready ***
    async submit() {
      if (this.$refs.form.validate()) {
        const orphanBirthCertificateDocument = this.document
          .orphanBirthCertificate && {
          documentType: 'Birth Certificate',
          documentUrl: await handleUrlUpload(
            this.document.orphanBirthCertificate
          ),
        }

        const orphanIdDocument = this.document.orphanId && {
          documentType: 'ID',
          documentUrl: await handleUrlUpload(this.document.orphanId),
        }

        const orphanPassportDocument = this.document.orphanPassport && {
          documentType: 'Passport',
          documentUrl: await handleUrlUpload(this.document.orphanPassport),
        }

        const orphanReportCardDocument = this.document.orphanReportCard && {
          documentType: 'Report Card',
          documentUrl: await handleUrlUpload(this.document.orphanReportCard),
        }

        const photoPortraitUrl =
          this.document.orphanPortraitPhoto &&
          (await handleUrlUpload(this.document.orphanPortraitPhoto))

        const deathCertificateUrl =
          this.document.fatherDeathCertificate &&
          (await handleUrlUpload(this.document.fatherDeathCertificate))

        const idCardUrl =
          this.document.guardianId &&
          (await handleUrlUpload(this.document.guardianId))

        const memorandumOfUnderstandingUrl =
          this.document.memorandumOfUnderstanding &&
          (await handleUrlUpload(this.document.memorandumOfUnderstanding))

        const adoptionCertificateUrl =
          this.document.adoptionCertificate &&
          (await handleUrlUpload(this.document.adoptionCertificate))

        const orphanDocuments = [
          orphanBirthCertificateDocument,
          orphanIdDocument,
          orphanPassportDocument,
        ]

        const guardianDocumentUrls = {
          idCardUrl,
          memorandumOfUnderstandingUrl,
          adoptionCertificateUrl,
        }

        this.$store.dispatch('addOrphan/addDocumentsToOrphan', orphanDocuments)

        this.$store.dispatch('addOrphan/setOrphanPhoto', photoPortraitUrl)

        this.$store.dispatch(
          'addOrphan/setFatherDeathCertificate',
          deathCertificateUrl
        )

        this.$store.dispatch(
          'addOrphan/setReportCard',
          orphanReportCardDocument
        )

        this.$store.dispatch(
          'addOrphan/addGuardianDocuments',
          guardianDocumentUrls
        )

        const data = await this.$store.dispatch('addOrphan/submitOrphan')

        console.log(data)
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
