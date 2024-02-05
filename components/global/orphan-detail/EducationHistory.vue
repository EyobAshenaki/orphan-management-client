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
    <template #progress>
      <v-progress-linear
        background-color="teal lighten-3"
        color="teal darken-2"
        :active="loading"
        :indeterminate="loading"
      ></v-progress-linear>
    </template>
    <template #top>
      <div class="tw-w-full tw-flex tw-justify-between tw-py-5 tw-px-2">
        <header>
          <h1 class="tw-font-medium tw-text-2xl mb-2">Education History</h1>

          <button-light v-if="false" @click="toggleNewRecordDialog">
            <span>Change School</span>
            <fa-layers class="tw-ml-2">
              <fa :icon="['fa', 'plus']" />
            </fa-layers>
          </button-light>

          <button-light v-if="false" @click="toggleNewRecordDialog">
            <span>Change Grade</span>
            <fa-layers class="tw-ml-2">
              <fa :icon="['fa', 'plus']" />
            </fa-layers>
          </button-light>

          <button-light @click="toggleNewRecordDialog">
            <span>Add New Result</span>
            <fa-layers class="tw-ml-2">
              <fa :icon="['fa', 'plus']" />
            </fa-layers>
          </button-light>

          <button-light v-if="false" @click="toggleNewRecordDialog">
            <span>Drop out</span>
            <fa-layers class="tw-ml-2">
              <fa :icon="['fa', 'plus']" />
            </fa-layers>
          </button-light>
        </header>

        <add-educational-result-dialog
          v-if="newRecordDialog"
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
      <v-tooltip v-if="true" top>
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
    </template>
  </v-data-table>
</template>

<script>
import { capitalize, startCase } from 'lodash'
import AddEducationalResultDialog from '~/components/global/dialogs/AddEducationalResultDialog.vue'
import {
  fetchOrphanEducationHistory,
  deleteEducationalRecord
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

const humanizeYearDivision = (yearDivision, currentDivision) => {
  if (currentDivision === 'NONE') return 'N/A'

  const isFirstDivision = currentDivision === 'FIRST'
  const isSecondDivision = currentDivision === 'SECOND'
  const isThirdDivision = currentDivision === 'THIRD'

  return `${
    isFirstDivision
      ? '1st'
      : isSecondDivision
      ? '2nd'
      : isThirdDivision
      ? '3rd'
      : '4th'
  } ${startCase(yearDivision?.toLowerCase())}`
}

export default {
  name: 'EducationHistory',
  components: { AddEducationalResultDialog },
  layout: 'dashboard',
  props: {
    orphanId: {
      type: String,
      required: true
    }
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
          value: 'school'
        },
        {
          text: 'Current Year Division',
          align: 'left',
          value: 'currentDivision'
        },
        {
          text: 'Total Mark',
          align: 'left',
          value: 'totalMark'
        },
        {
          text: 'Number of Subjects',
          align: 'left',
          value: 'numberOfSubjects'
        },
        {
          text: 'Average',
          align: 'left',
          value: 'average'
        },
        {
          text: 'Rank',
          align: 'left',
          value: 'rank'
        },
        {
          text: 'Actions',
          align: 'center',
          value: 'actions'
        }
      ],
      educationalRecords: [],
      newRecordDialog: false
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize() {
      this.loading = true
      this.educationalRecords = []
      try {
        const { schoolHistory } = await fetchOrphanEducationHistory(
          this.orphanId
        )

        schoolHistory?.forEach(
          ({
            name: schoolName,
            type: typeOfSchool,
            yearDivision,
            academicInfo
          }) => {
            const schoolInfo = {
              schoolName,
              typeOfSchool: capitalize(typeOfSchool),
              yearDivision: startCase(yearDivision?.toLowerCase())
            }
            academicInfo?.forEach(
              ({ level, year, numberOfSubjects, academicResults }) => {
                const gradeInfo = {
                  level: humanizeLevel(level),
                  year,
                  numberOfSubjects
                }
                academicResults?.forEach(
                  ({
                    currentDivision,
                    totalMark,
                    average,
                    rank,
                    reportCard
                  }) => {
                    const resultInfo = {
                      currentDivision: humanizeYearDivision(
                        yearDivision,
                        currentDivision
                      ),
                      totalMark: `(${totalMark} / ${numberOfSubjects * 100})`,
                      average:
                        average === computeAverage(totalMark, numberOfSubjects)
                          ? average
                          : computeAverage(totalMark, numberOfSubjects),
                      rank: rank ? humanizeRank(rank) : 'N/A',
                      reportCard
                    }
                    this.educationalRecords.push({
                      ...schoolInfo,
                      ...gradeInfo,
                      ...resultInfo,
                      school: `${capitalize(schoolName)}, (${capitalize(
                        typeOfSchool
                      )}), Level: ${humanizeLevel(level)}, Grade ${capitalize(
                        year
                      )}`
                    })
                  }
                )
              }
            )
          }
        )

        this.educationalRecords = this.educationalRecords.toSorted((a, b) => {
          return +b.year - +a.year
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
        responseType: 'blob'
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
          content: 'Educational record deleted successfully'
        })
        await this.initialize()
      } catch (error) {}
    }
  }
}
</script>
