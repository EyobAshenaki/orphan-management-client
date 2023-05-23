<template>
  <table-component
    :loading="loading"
    title="Individual Payments"
    :headers="headers"
    :items="individualPayments"
    items-key="id"
    :search="searchValue"
    :items-per-page="itemsPerPage"
    :single-select="singleSelect"
    :show-select="showSelect"
    @onItemsPerPage="handleItemsPerPage"
    @onSelectedItemChange="handleSelectedItemChange($event)"
  >
    <template v-if="individualPayments.length > 0" #title-button>
      <button-light @click="exportToExcel">
        <span>Export</span>
        <fa-layers class="tw-ml-2">
          <fa :icon="['fa', 'file-export']" />
        </fa-layers>
      </button-light>
    </template>

    <template #top-right>
      <search-field @onSearch="handleSearch($event)" />
      <button-dark v-if="false" @click="editIndividualPayment">
        <fa-layers class="tw-mr-2">
          <fa :icon="showButtonContent.icon" />
        </fa-layers>
        <span>{{ showButtonContent.text }}</span>
      </button-dark>
    </template>

    <template #age="{ item }">
      {{ item ? calculateAge(item.orphan.dateOfBirth) : '' }}
    </template>
    <template #gender="{ item }">
      {{ item ? item.orphan.gender : '' }}
    </template>

    <template #accountNumber="{ item }">
      {{ item ? item.orphan.accountNumber : '' }}
    </template>

    <template #period="{ item }">
      {{ item ? item.payment.paymentPeriodInMonths : '' }} months
    </template>

    <template #no-data>
      <button-dark @click="distribute"> Distribute </button-dark>
    </template>
  </table-component>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { utils, writeFile } from 'xlsx'
import TableComponent from '../global/TableComponent.vue'
import {
  fetchIndividualPayments,
  fetchSupportPlan,
  createManyIndividualPayments,
} from '~/services/support.service'
import { calculateAge, fullName, orphanFullName } from '~/helpers/app.helper'
export default {
  name: 'IndividualPaymentTable',

  components: {
    TableComponent,
  },

  props: {
    paymentId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      searchValue: '',
      itemsPerPage: 5,
      loading: false,
      singleSelect: true,
      showSelect: false,
      selectedIndividualPayment: null,
      individualPayments: [],
      payment: null,
      supportPlan: null,
    }
  },
  computed: {
    headers() {
      return [
        {
          text: 'Orphan Name',
          align: 'start',
          value: 'orphanName',
        },
        {
          text: 'Age',
          value: 'age',
        },
        { text: 'Gender', value: 'gender' },
        { text: 'Guardian Name', value: 'guardianName' },
        {
          text: 'Account Number',
          value: 'accountNumber',
        },
        { text: 'Period', value: 'period' },
        {
          text: `Total in ${this.payment?.primaryForeignCurrency ?? 'N/A'}`,
          value: 'grossDepositInPrimaryForeignCurrency',
        },
        {
          text: `Total in ${this.payment?.secondaryForeignCurrency ?? 'N/A'}`,
          value: 'grossDepositInSecondaryForeignCurrency',
        },
        {
          text: 'Total in ETB',
          value: 'grossDepositInDomesticCurrency',
        },
        { text: 'Admin Fee in ETB', value: 'adminFeeInDomesticCurrency' },
        { text: 'Net Payment in ETB', value: 'netDepositInDomesticCurrency' },
      ]
    },

    showButtonContent() {
      return {
        text: this.showSelect ? 'Save' : 'Edit',
        icon: this.showSelect
          ? ['far', 'floppy-disk']
          : ['far', 'pen-to-square'],
      }
    },
  },
  mounted() {
    this.loading = true
    this.initialize()
  },
  methods: {
    calculateAge,
    orphanFullName,
    fullName,
    async initialize() {
      try {
        const supportPlan = await fetchSupportPlan(
          this.$route.params.supportPlanId
        )
        this.supportPlan = supportPlan
        const payment = supportPlan.payments.find(
          (p) => p.id === this.paymentId
        )
        this.payment = payment

        this.individualPayments = (
          await fetchIndividualPayments(this.paymentId)
        ).map((idp) => ({
          ...idp,
          orphanName: orphanFullName(idp.orphan),
          guardianName: fullName(idp.orphan.guardian),
        }))
      } catch (error) {
        /* empty */
      } finally {
        this.loading = false
      }
    },
    async distribute() {
      this.loading = true
      try {
        const supportPlan = await fetchSupportPlan(
          this.$route.params.supportPlanId
        )
        this.supportPlan = supportPlan
        const payment = supportPlan.payments.find(
          (p) => p.id === this.paymentId
        )
        this.payment = payment

        const { _count_orphans: countOrphans, orphans } = supportPlan
        const newIndividualPaymentsTabularData = orphans.map((orphan) => {
          const {
            paymentPeriodInMonths,
            adminFeeInDomesticCurrency,
            grossPaymentInDomesticCurrency,
            grossPaymentInPrimaryForeignCurrency,
            grossPaymentInSecondaryForeignCurrency,
            netPaymentInDomesticCurrency,
            id: paymentId,
          } = payment
          const {
            name,
            father,
            dateOfBirth,
            gender,
            guardian,
            accountNumber,
            id: orphanId,
          } = orphan
          return {
            orphanId,
            orphan: {
              name,
              father,
              gender,
              dateOfBirth,
              guardian,
              accountNumber,
            },
            payment: { paymentPeriodInMonths },
            adminFeeInDomesticCurrency:
              adminFeeInDomesticCurrency / countOrphans,
            grossDepositInDomesticCurrency:
              grossPaymentInDomesticCurrency / countOrphans,
            grossDepositInPrimaryForeignCurrency:
              grossPaymentInPrimaryForeignCurrency / countOrphans,
            grossDepositInSecondaryForeignCurrency:
              grossPaymentInSecondaryForeignCurrency / countOrphans,
            netDepositInDomesticCurrency:
              netPaymentInDomesticCurrency / countOrphans,
            paymentId,
          }
        })

        this.individualPayments = newIndividualPaymentsTabularData.map(
          (individualPayment) => ({
            ...individualPayment,
            orphanName: orphanFullName(individualPayment.orphan),
            guardianName: fullName(individualPayment.orphan.guardian),
          })
        )
        // todo: enable customizing the individual payments
        // |--   beyond equal distribution of the payment
        // |--   and show details of the payment,
        // |--   like the gross payment, the admin fee, etc.
        // |--   and show the net payment
        // |--   and show the total amount of the payment
        // |--   when the user deducts a certain amount from a specific orphan's either
        // |--   gross payment (primary or secondary foreign currency or domestic currency)
        // |--   since only one of the gross payments can be deducted based on the payment type

        const newIndividualPaymentsCreateInput =
          newIndividualPaymentsTabularData.map((individualPayment) => {
            const {
              orphanId,
              paymentId,
              adminFeeInDomesticCurrency,
              grossDepositInDomesticCurrency,
              grossDepositInPrimaryForeignCurrency,
              grossDepositInSecondaryForeignCurrency,
              netDepositInDomesticCurrency,
            } = individualPayment
            return {
              orphanId,
              paymentId,
              adminFeeInDomesticCurrency,
              grossDepositInDomesticCurrency,
              grossDepositInPrimaryForeignCurrency,
              grossDepositInSecondaryForeignCurrency,
              netDepositInDomesticCurrency,
            }
          })
        await this.saveIndividualPayments(newIndividualPaymentsCreateInput)
      } catch (error) {
        /* empty */
      } finally {
        this.loading = false
      }
    },
    async saveIndividualPayments(individualPayments) {
      this.loading = true
      try {
        const response = await createManyIndividualPayments(individualPayments)
        if (Array.isArray(response)) {
          this.$toaster.showToast({
            content: 'Individual payments saved successfully',
            state: 'success',
          })
          this.initialize()
        } else {
          this.$toaster.showToast({
            content: 'Failed to save individual payments',
            state: 'error',
          })
        }
      } catch (error) {
        this.$toaster.showToast({
          content: 'Failed to save individual payments',
          state: 'error',
        })
      } finally {
        this.loading = false
      }
    },

    handleSearch(value) {
      this.searchValue = value
    },

    exportToExcel() {
      const workbook = utils.book_new()
      const projectNumber = this.supportPlan?.project?.number
      const startDate = new Date(this.payment?.startDate).toDateString()
      const endDate = new Date(this.payment?.endDate).toDateString()
      const exportHeading = [
        ['Charity and Development Association (CDA)'],
        [`Payment Sheet For Orphans Project #${projectNumber}`],
        [`Donor: ${this.supportPlan?.donor.nameInitials}`],
        [this.bankName ?? 'Cooperative Bank of Oromia (CBO)'],
        [`Payment from ${startDate} to ${endDate}`],
      ]
      const allDistrictsArray = this.individualPayments
        .map((idp) => {
          return idp.orphan
        })
        .reduce((acc, orphan) => {
          return acc.includes(orphan?.village.district.name)
            ? acc
            : [...acc, orphan?.village.district.name]
        }, [])
      allDistrictsArray.forEach((districtName) => {
        // get zoneName for each district
        const zonesAggregate = this.individualPayments
          .map((idp) => {
            return idp.orphan
          })
          .map((orphan) =>
            orphan.village.district.name === districtName
              ? orphan.village.district.zone.name
              : ''
          )
        const zoneName = Array.from(new Set(zonesAggregate).values()).find(
          (x) => x !== ''
        )
        const villageNames = this.individualPayments
          .map((idp) => {
            return idp.orphan
          })
          .reduce(
            (acc, orphan) =>
              acc.includes(orphan.village.name) ||
              orphan.village.district.name !== districtName
                ? acc
                : `${acc}${acc === '' ? '' : ','} ${orphan.village.name}`,
            ''
          )
        const exportHeader = [
          `Zone: ${zoneName}`,
          null,
          `District: ${districtName}`,
          null,
          `Village: ${villageNames}`,
          null,
          'Date___________',
          null,
        ]
        const idpsInDistrict = this.individualPayments.filter((idp) => {
          return idp.orphan.village.district.name === districtName
        })
        const exportBody = idpsInDistrict.map((idp) => [
          idp.orphanName,
          idp.guardianName,
          idp.orphan.accountNumber,
          idp.payment.paymentPeriodInMonths,
          idp.grossDepositInPrimaryForeignCurrency,
          idp.grossDepositInSecondaryForeignCurrency,
          idp.grossDepositInDomesticCurrency,
          idp.adminFeeInDomesticCurrency,
          idp.netDepositInDomesticCurrency,
        ])
        const exportFull = [
          ...exportHeading,
          exportHeader,
          this.headers
            .map((header) => header.text)
            .filter((header) => !['Age', 'Gender'].includes(header)),
          ...exportBody,
          [
            'Total',
            null,
            null,
            null,
            idpsInDistrict.reduce(
              (sum, val) => sum + val.grossDepositInPrimaryForeignCurrency,
              0
            ),
            idpsInDistrict.reduce(
              (sum, val) => sum + val.grossDepositInSecondaryForeignCurrency,
              0
            ),
            idpsInDistrict.reduce(
              (sum, val) => sum + val.grossDepositInDomesticCurrency,
              0
            ),
            idpsInDistrict.reduce(
              (sum, val) => sum + val.adminFeeInDomesticCurrency,
              0
            ),
            idpsInDistrict.reduce(
              (sum, val) => sum + val.netDepositInDomesticCurrency,
              0
            ),
          ],
        ]

        const worksheet = utils.aoa_to_sheet(exportFull)
        // handle merge
        worksheet['!merges'] = [
          { s: { r: 0, c: 0 }, e: { r: 0, c: 8 } },
          { s: { r: 1, c: 0 }, e: { r: 1, c: 8 } },
          { s: { r: 2, c: 0 }, e: { r: 2, c: 8 } },
          { s: { r: 3, c: 0 }, e: { r: 3, c: 8 } },
          { s: { r: 4, c: 0 }, e: { r: 4, c: 8 } },
          { s: { r: 5, c: 0 }, e: { r: 5, c: 1 } },
          { s: { r: 5, c: 2 }, e: { r: 5, c: 3 } },
          { s: { r: 5, c: 4 }, e: { r: 5, c: 5 } },
          { s: { r: 5, c: 6 }, e: { r: 5, c: 8 } },
          {
            s: { r: exportFull.length - 1, c: 0 },
            e: { r: exportFull.length - 1, c: 3 },
          },
        ]

        // sets the width of columns
        worksheet['!cols'] = [
          { wpx: 150 }, // A
          { wpx: 150 }, // B
          { wpx: 100 }, // C
          { wpx: 40 }, // D
          { wpx: 100 }, // E
          { wpx: 100 }, // F
          { wpx: 100 }, // G
          { wpx: 100 }, // H
          { wpx: 100 }, // I
        ]

        utils.book_append_sheet(workbook, worksheet, districtName)
      })

      const allZonesString = this.individualPayments
        .map((idp) => idp.orphan)
        .reduce(
          (acc, orphan) =>
            acc.includes(orphan.village.district.zone.name)
              ? acc
              : [...acc, orphan.village.district.zone.name],
          []
        )
        .join(', ')

      writeFile(
        workbook,
        `OPS - ${
          this.supportPlan.name
        } - ${allZonesString} Zone - ${Intl.DateTimeFormat('en-US', {
          dateStyle: 'short',
        })
          .format(new Date(this.payment?.startDate))
          .replaceAll('/', '-')}.xlsx`,
        {
          cellStyles: true,
          bookType: 'xlsx',
        }
      )
    },

    editIndividualPayment() {
      if (!this.showSelect) {
        // Handle the API calls to fetch the data necessary for the edit form
        // Add a loading state on the table while fetching the data
        // Remove loading state when the data is fetched and show the edit form
      } else {
        // Handle validation before submitting the form like
        //  -- checking if the user has selected an individual payment to edit
        //  -- checking if the user has filled all the required fields
        //  -- checking if the user has filled the fields with the correct data type and value the can add up to the total amount
        if (this.selectedIndividualPayment === null) {
          // this.$toast.error('Please select an item to edit')
          console.warn('Please select an item to edit')
          return
        }
        console.log('Edit Individual Payment: ', this.selectedIndividualPayment)
      }
      this.showSelect = !this.showSelect
    },

    handleSelectedItemChange(item) {
      this.selectedIndividualPayment = item
    },

    handleItemsPerPage(value) {
      // Since we are using server side pagination, we can't use -1 to show all items just the elements we fetched
      // if (value === -1) this.itemsPerPage = this.projects.length
      if (value === -1) this.itemsPerPage = 8
      else this.itemsPerPage = value
    },
  },
}
</script>
