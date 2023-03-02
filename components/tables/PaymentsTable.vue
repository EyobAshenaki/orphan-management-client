<template>
  <table-component
    title="Payments"
    :headers="headers"
    :items="payments"
    items-key="name"
    :search="searchValue"
    :items-per-page="itemsPerPage"
    @onDoubleClickRow="generateIndividualPayments($event)"
    @onItemsPerPage="handleItemsPerPage"
  >
    <template #title-button>
      <button-light to="/coordinator/projects/project/addPayment">
        <span>Add Payment</span>
        <fa-layers class="tw-ml-2">
          <fa :icon="['fa', 'plus']" />
        </fa-layers>
      </button-light>
    </template>

    <template #top-right>
      <search-field @onSearch="handleSearch($event)" />
    </template>

    <template #no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </table-component>
</template>

<script>
import TableComponent from '../global/TableComponent.vue'
export default {
  name: 'PaymentTable',

  components: {
    TableComponent,
  },

  data() {
    return {
      searchValue: '',
      itemsPerPage: 5,
    }
  },
  computed: {
    headers() {
      return [
        {
          text: 'Payment Period',
          align: 'start',
          value: 'paymentPeriod',
        },
        {
          text: 'Primary FC',
          value: 'primaryForeignCurrency',
        },
        { text: 'Payment in Primary FC', value: 'paymentInPrimaryFC' },
        { text: 'Primary Exchange Rate', value: 'primaryExchangeRate' },
        {
          text: 'Secondary FC',
          value: 'secondaryForeignCurrency',
        },
        { text: 'Payment in Secondary FC', value: 'paymentInSecondaryFC' },
        { text: 'Secondary Exchange Rate', value: 'secondaryExchangeRate' },
        { text: 'Gross Payment in Birr', value: 'grossPaymentInBirr' },
        { text: 'Admin Fee in Birr', value: 'adminFreeInBirr' },
        { text: 'Net Payment in Birr', value: 'netPaymentInBirr' },
      ]
    },
    payments() {
      return [
        {
          paymentPeriod: '5 years',
          primaryForeignCurrency: 'Japanese Yen',
          paymentInPrimaryFC: 200000,
          primaryExchangeRate: 6,
          secondaryForeignCurrency: 'United States dollar',
          paymentInSecondaryFC: 5000,
          secondaryExchangeRate: 53,
          grossPaymentInBirr: 200000,
          adminFreeInBirr: 10000,
          netPaymentInBirr: 200000,
        },
        {
          paymentPeriod: '5 years',
          primaryForeignCurrency: 'Japanese Yen',
          paymentInPrimaryFC: 200000,
          primaryExchangeRate: 6,
          secondaryForeignCurrency: 'United States dollar',
          paymentInSecondaryFC: 5000,
          secondaryExchangeRate: 53,
          grossPaymentInBirr: 200000,
          adminFreeInBirr: 10000,
          netPaymentInBirr: 200000,
        },
        {
          paymentPeriod: '5 years',
          primaryForeignCurrency: 'Japanese Yen',
          paymentInPrimaryFC: 200000,
          primaryExchangeRate: 6,
          secondaryForeignCurrency: 'United States dollar',
          paymentInSecondaryFC: 5000,
          secondaryExchangeRate: 53,
          grossPaymentInBirr: 200000,
          adminFreeInBirr: 10000,
          netPaymentInBirr: 200000,
        },
        {
          paymentPeriod: '5 years',
          primaryForeignCurrency: 'Japanese Yen',
          paymentInPrimaryFC: 200000,
          primaryExchangeRate: 6,
          secondaryForeignCurrency: 'United States dollar',
          paymentInSecondaryFC: 5000,
          secondaryExchangeRate: 53,
          grossPaymentInBirr: 200000,
          adminFreeInBirr: 10000,
          netPaymentInBirr: 200000,
        },
        {
          paymentPeriod: '5 years',
          primaryForeignCurrency: 'Japanese Yen',
          paymentInPrimaryFC: 200000,
          primaryExchangeRate: 6,
          secondaryForeignCurrency: 'United States dollar',
          paymentInSecondaryFC: 5000,
          secondaryExchangeRate: 53,
          grossPaymentInBirr: 200000,
          adminFreeInBirr: 10000,
          netPaymentInBirr: 200000,
        },
        {
          paymentPeriod: '5 years',
          primaryForeignCurrency: 'Japanese Yen',
          paymentInPrimaryFC: 200000,
          primaryExchangeRate: 6,
          secondaryForeignCurrency: 'United States dollar',
          paymentInSecondaryFC: 5000,
          secondaryExchangeRate: 53,
          grossPaymentInBirr: 200000,
          adminFreeInBirr: 10000,
          netPaymentInBirr: 200000,
        },
        {
          paymentPeriod: '5 years',
          primaryForeignCurrency: 'Japanese Yen',
          paymentInPrimaryFC: 200000,
          primaryExchangeRate: 6,
          secondaryForeignCurrency: 'United States dollar',
          paymentInSecondaryFC: 5000,
          secondaryExchangeRate: 53,
          grossPaymentInBirr: 200000,
          adminFreeInBirr: 10000,
          netPaymentInBirr: 200000,
        },
        {
          paymentPeriod: '5 years',
          primaryForeignCurrency: 'Japanese Yen',
          paymentInPrimaryFC: 200000,
          primaryExchangeRate: 6,
          secondaryForeignCurrency: 'United States dollar',
          paymentInSecondaryFC: 5000,
          secondaryExchangeRate: 53,
          grossPaymentInBirr: 200000,
          adminFreeInBirr: 10000,
          netPaymentInBirr: 200000,
        },
      ]
    },
  },
  methods: {
    initialize() {
      console.log('Initialize')
    },

    handleSearch(value) {
      this.searchValue = value
    },

    generateIndividualPayments(item) {
      this.$emit('onPaymentClick', item)
    },

    handleItemsPerPage(value) {
      // Call the server side pagination here
      console.log(value)
    },
  },
}
</script>
