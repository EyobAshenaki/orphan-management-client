<template>
  <v-data-table
    :loading="loading"
    :items="educationalRecords"
    :items-per-page="itemsPerPage"
    :items-key="'id'"
    :headers="headers"
    :search="searchValue"
    dense
    group-by="school"
    class="hover:tw-cursor-pointer px-6"
  >
    <template #top>
      <div class="tw-w-full tw-flex tw-justify-between tw-py-5 tw-px-2">
        <header>
          <h1 class="tw-font-medium tw-text-2xl mb-2">Education History</h1>

          <button-light @click="toggleNewRecordDialog">
            <span>Add New Result</span>
            <fa-layers class="tw-ml-2">
              <fa :icon="['fa', 'plus']" />
            </fa-layers>
          </button-light>
        </header>
        <add-educational-result-dialog
          :new-record-dialog="newRecordDialog"
          :orphan-id="orphanId"
          @update:newRecordDialog="
            toggleNewRecordDialog()
            initialize()
          "
        />
      </div>
    </template>
    <template #item.actions="{ item }">
      <v-tooltip top>
        <template #activator="{ on }">
          <fa-layers
            class="tw-ml-4"
            @click="downloadReportCard(item)"
            v-on="on"
          >
            <fa
              :icon="['fa', 'download']"
              class="hover:tw-text-emerald-500 tw-text-gray-500"
            />
          </fa-layers>
        </template>
        <span>Download Report Card</span>
      </v-tooltip>
      <!-- todo: enable when feature is implemented -->
      <v-tooltip v-if="false" top>
        <template #activator="{ on }">
          <fa-layers class="tw-ml-4" @click="editResult(item)" v-on="on">
            <fa
              :icon="['fa', 'pen']"
              class="hover:tw-text-sky-500 tw-text-gray-500"
            />
          </fa-layers>
        </template>
        <span>Edit Result</span>
      </v-tooltip>
      <v-tooltip top>
        <v-dialog
          v-model="deleteResultConfirmDialog"
          persistent
          :overlay="false"
          max-width="560px"
          transition="dialog-transition"
        >
          <v-card class="tw-bg-white">
            <v-card-title
              class="tw-text-2xl mt-n3 tw-sticky tw-top-0 tw-z-40 tw-bg-gray-100"
              >Confirm record deletion. Are you you sure?</v-card-title
            >
            <v-divider />
            <v-card-text class="pa-3 mt-3 tw-text-lg"
              >If you delete this record you can
              <span class="tw-font-semibold tw-text-lg">NOT</span> reverse this
              action and the data be lost permanently.</v-card-text
            >
            <v-divider />
            <v-card-actions
              class="tw-sticky tw-bottom-0 tw-z-40 tw-bg-gray-100"
            >
              <v-spacer />
              <button-dark
                color="red darken-1"
                small
                @click="deleteResultConfirmDialog = false"
              >
                No
              </button-dark>
              <button-light
                color="green darken-1"
                text
                class="hover:tw-bg-red-700 hover:tw-text-white"
                @click="
                  deleteResultConfirmDialog = false
                  deleteResult(itemIdToDelete)
                "
              >
                Yes
              </button-light>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <template #activator="{ on }">
          <fa-layers
            class="tw-ml-4"
            @click="showDeleteResultConfirmDialog(item)"
            v-on="on"
          >
            <fa
              :icon="['fa', 'trash']"
              class="hover:tw-text-red-500 tw-text-gray-500"
            />
          </fa-layers>
        </template>
        <span>Delete Result</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
import { capitalize, startCase } from 'lodash'
import AddEducationalResultDialog from '~/components/global/dialogs/AddEducationalResultDialog.vue'
import {
  fetchOrphanEducationHistory,
  deleteEducationalRecord,
} from '~/services/orphan.service'

const humanizeLevel = (level) => {
  switch (level) {
    case 'RELIGIOUS_EDUCATION':
      return 'Religious Education'
    case 'PRE_SCHOOL':
      return 'Pre-School'
    case 'PRIMARY_ELEMENTARY':
      return 'Primary/Elementary'
    case 'JUNIOR':
      return 'Junior'
    case 'HIGH_SCHOOL':
      return 'High School'
    case 'UNDERGRADUATE':
      return 'Undergraduate'
    case 'POSTGRADUATE':
      return 'Postgraduate'
    case 'OTHER':
      return 'Other'
    case 'NONE':
      return 'None'
    default:
      return 'N/A'
  }
}

const computeAverage = (totalMark, numberOfSubjects) => {
  return +(totalMark / numberOfSubjects).toFixed(2)
}

const humanizeRank = (rank) => {
  const rankString = rank?.toString()
  const lastDigit =
    rankString?.length > 0 ? +rankString[rankString?.length - 1] : 0

  return lastDigit === 1
    ? `${rankString}st`
    : lastDigit === 2
    ? `${rank}nd`
    : lastDigit === 3
    ? `${rankString}rd`
    : `${rank}th`
}

const humanizeYearDivision = (yearDivision, semester, quarter) => {
  if (yearDivision === 'SEMESTER')
    return semester === 'FIRST'
      ? '1st Semester'
      : semester === 'SECOND'
      ? '2nd Semester'
      : 'N/A'
  else if (yearDivision === 'QUARTER')
    return quarter === 'FIRST'
      ? '1st Quarter'
      : quarter === 'SECOND'
      ? '2nd Quarter'
      : quarter === 'THIRD'
      ? '3rd Quarter'
      : quarter === 'FOURTH'
      ? '4th Quarter'
      : 'N/A'
  else return 'N/A'
}

export default {
  name: 'EducationHistory',
  components: { AddEducationalResultDialog },
  layout: 'dashboard',
  props: {
    orphanId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      searchValue: '',
      itemsPerPage: -1,
      loading: false,
      headers: [
        {
          text: 'School',
          align: 'left',
          value: 'school',
        },
        {
          text: 'Current Year Division',
          align: 'left',
          value: 'currentYearDivision',
        },
        {
          text: 'Total Mark',
          align: 'left',
          value: 'totalMark',
        },
        {
          text: 'Number of Subjects',
          align: 'left',
          value: 'numberOfSubjects',
        },
        {
          text: 'Average',
          align: 'left',
          value: 'average',
        },
        {
          text: 'Rank',
          align: 'left',
          value: 'rank',
        },
        {
          text: 'Actions',
          align: 'center',
          value: 'actions',
        },
      ],
      educationalRecords: [],
      newRecordDialog: false,
      deleteResultConfirmDialog: false,
      itemIdToDelete: null,
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize() {
      this.loading = true

      try {
        const { educationalRecords } = await fetchOrphanEducationHistory(
          this.orphanId
        )

        this.educationalRecords = educationalRecords?.map((record) => {
          const {
            schoolName,
            level,
            typeOfSchool,
            year,
            yearDivision,
            quarter,
            semester,
            totalMark,
            numberOfSubjects,
            average,
            rank,
          } = record

          return {
            ...record,
            typeOfSchool: capitalize(typeOfSchool),
            level: humanizeLevel(level),
            yearDivision: startCase(yearDivision?.toLowerCase()),
            currentYearDivision: humanizeYearDivision(
              yearDivision,
              semester,
              quarter
            ),
            totalMark: `(${totalMark} / ${numberOfSubjects * 100})`,
            average:
              average === computeAverage(totalMark, numberOfSubjects)
                ? average
                : computeAverage(totalMark, numberOfSubjects),
            rank: rank ? humanizeRank(rank) : 'N/A',
            school: `${capitalize(schoolName)}, (${capitalize(
              typeOfSchool
            )}), Level: ${humanizeLevel(level)}, Grade ${capitalize(year)}`,
          }
        })
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    toggleNewRecordDialog() {
      this.newRecordDialog = !this.newRecordDialog
    },
    async downloadReportCard(item) {
      const response = await this.$axios({
        url: item?.reportCard?.documentUrl,
        method: 'GET',
        responseType: 'blob',
      })
      const link = document.createElement('a')
      const fileExtension = item?.reportCard?.documentUrl
        .split('/')
        .pop()
        .split('.')
        .pop()
      link.href = URL.createObjectURL(new Blob([response.data]))
      const orphan = this.$store.getters['orphan/orphanPersonal']
      const fullName = `${orphan?.name} ${orphan?.fatherName} ${orphan?.grandFatherName}`
      link.download = `${fullName}-${item.schoolName}-${item.year}-${item.level}-${item.currentYearDivision}-report-card.${fileExtension}`
      link.click()
    },
    editResult(item) {
      // todo: implement edit result
      console.log('editing: ', { item })
    },
    showDeleteResultConfirmDialog(item) {
      this.deleteResultConfirmDialog = true

      this.itemIdToDelete = item.id
    },

    async deleteResult(id) {
      try {
        await deleteEducationalRecord(id)

        this.$toaster.showToast({
          state: 'success',
          content: 'Educational record deleted successfully',
        })
        await this.initialize()
      } catch (error) {}
    },
  },
}
</script>
