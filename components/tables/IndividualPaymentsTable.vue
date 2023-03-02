<template>
  <table-component
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
    <template #title-button>
      <button-light @click="exportToExcel">
        <span>Export</span>
        <fa-layers class="tw-ml-2">
          <fa :icon="['fa', 'file-export']" />
        </fa-layers>
      </button-light>
    </template>

    <template #top-right>
      <search-field @onSearch="handleSearch($event)" />
      <button-dark @click="editIndividualPayment">
        <fa-layers class="tw-mr-2">
          <fa :icon="showButtonContent.icon" />
        </fa-layers>
        <span>{{ showButtonContent.text }}</span>
      </button-dark>
    </template>

    <template #no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </table-component>
</template>

<script>
import TableComponent from '../global/TableComponent.vue'
export default {
  name: 'IndividualPaymentTable',

  components: {
    TableComponent,
  },

  data() {
    return {
      searchValue: '',
      itemsPerPage: 5,
      singleSelect: true,
      showSelect: false,
      selectedIndividualPayment: null,
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
        { text: 'Deposit in Primary FC', value: 'depositInPrimaryFC' },
        { text: 'Deposit in Secondary FC', value: 'depositInSecondaryFC' },
        { text: 'Gross Deposit in Birr', value: 'grossDepositInBirr' },
        { text: 'Admin Fee in Birr', value: 'adminFreeInBirr' },
        { text: 'Net Payment in Birr', value: 'netPaymentInBirr' },
      ]
    },
    individualPayments() {
      return [
        {
          id: 1,
          orphanName: 'John Doe',
          age: 5,
          gender: 'M',
          guardianName: 'Hambise Gabrasillase Zeleke',
          accountNumber: '100035087534',
          period: 4,
          depositInPrimaryFC: 20000,
          depositInSecondaryFC: 1000,
          grossDepositInBirr: 60000,
          adminFreeInBirr: 3000,
          netPaymentInBirr: 50000,
        },
        {
          id: 2,
          orphanName: 'Abinet Kifle Mosha',
          age: 6,
          gender: 'M',
          guardianName: 'Hambise Gabrasillase Zeleke',
          accountNumber: '1000302719582',
          period: 4,
          depositInPrimaryFC: 20000,
          depositInSecondaryFC: 1000,
          grossDepositInBirr: 60000,
          adminFreeInBirr: 3000,
          netPaymentInBirr: 50000,
        },
        {
          id: 3,
          orphanName: 'Alamnesh Kifle Mosha',
          age: 10,
          gender: 'F',
          guardianName: 'Hambise Gabrasillase Zeleke',
          accountNumber: '1000302719582',
          period: 4,
          depositInPrimaryFC: 20000,
          depositInSecondaryFC: 1000,
          grossDepositInBirr: 60000,
          adminFreeInBirr: 3000,
          netPaymentInBirr: 50000,
        },
        {
          id: 4,
          orphanName: 'Jane Doe',
          age: 13,
          gender: 'F',
          guardianName: 'Hambise Gabrasillase Zeleke',
          accountNumber: '100035087534',
          period: 4,
          depositInPrimaryFC: 20000,
          depositInSecondaryFC: 1000,
          grossDepositInBirr: 60000,
          adminFreeInBirr: 3000,
          netPaymentInBirr: 50000,
        },
        {
          id: 5,
          orphanName: 'Abinet Kifle Mosha',
          age: 6,
          gender: 'M',
          guardianName: 'Hambise Gabrasillase Zeleke',
          accountNumber: '1000302719582',
          period: 4,
          depositInPrimaryFC: 20000,
          depositInSecondaryFC: 1000,
          grossDepositInBirr: 60000,
          adminFreeInBirr: 3000,
          netPaymentInBirr: 50000,
        },
        {
          id: 6,
          orphanName: 'Alamnesh Kifle Mosha',
          age: 10,
          gender: 'F',
          guardianName: 'Hambise Gabrasillase Zeleke',
          accountNumber: '1000302719582',
          period: 4,
          depositInPrimaryFC: 20000,
          depositInSecondaryFC: 1000,
          grossDepositInBirr: 60000,
          adminFreeInBirr: 3000,
          netPaymentInBirr: 50000,
        },
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
  methods: {
    initialize() {
      console.log('Initialize')
    },

    handleSearch(value) {
      this.searchValue = value
    },

    exportToExcel() {
      console.log('Export to excel')
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
