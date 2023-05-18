<template>
  <table-component
    :loading="loading"
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
      <button-light
        :to="`/projects/project/add-payment?=supportPlanId=${$route.query.supportPlanId}`"
      >
        <span>Add Payment</span>
        <fa-layers class="tw-ml-2">
          <fa :icon="['fa', 'plus']" />
        </fa-layers>
      </button-light>
    </template>

    <template #top-right>
      <search-field @onSearch="handleSearch($event)" />
    </template>

    <template #actions="{ item }">
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <fa-layers
            class="tw-mx-auto tw-text-emerald-800"
            v-bind="attrs"
            v-on="on"
            @click="generateIndividualPayments(item)"
          >
            <fa :icon="['fa', 'money-bill-transfer']" transform="grow-8" />
          </fa-layers>
        </template>
        <span>Individual Payments</span>
      </v-tooltip>
    </template>

    <template #paymentPeriodInMonths="{ item }">
      {{ item.paymentPeriodInMonths }} months
    </template>

    <template #no-data>
      <button-dark @click="initialize"> Reset </button-dark>
    </template>
  </table-component>
</template>

<script>
import TableComponent from '../global/TableComponent.vue'
import { fetchPayments } from '~/services/support.service'
export default {
  name: 'PaymentTable',

  components: {
    TableComponent,
  },

  data() {
    return {
      searchValue: '',
      itemsPerPage: 5,
      loading: false,
      payments: [],
    }
  },
  computed: {
    headers() {
      return [
        {
          text: 'Start Date',
          align: 'start',
          value: 'startDate',
        },
        {
          text: 'Payment Period',
          value: 'paymentPeriodInMonths',
        },
        {
          text: 'Primary FC',
          value: 'primaryForeignCurrency',
        },
        {
          text: 'Payment in Primary FC',
          value: 'grossPaymentInPrimaryForeignCurrency',
        },
        { text: 'Primary Exchange Rate', value: 'primaryExchangeRate' },
        {
          text: 'Secondary FC',
          value: 'secondaryForeignCurrency',
        },
        {
          text: 'Payment in Secondary FC',
          value: 'grossPaymentInSecondaryForeignCurrency',
        },
        { text: 'Secondary Exchange Rate', value: 'secondaryExchangeRate' },
        {
          text: 'Gross Payment in ETB',
          value: 'grossPaymentInDomesticCurrency',
        },
        { text: 'Admin Fee in ETB', value: 'adminFeeInDomesticCurrency' },
        { text: 'Net Payment in ETB', value: 'netPaymentInDomesticCurrency' },
        { text: 'Actions', value: 'actions' },
      ]
    },
  },
  async mounted() {
    this.loading = true
    await this.initialize()
  },
  methods: {
    async initialize() {
      try {
        this.payments = (
          await fetchPayments(this.$route.query.supportPlanId)
        ).map((payment) => ({
          ...payment,
          startDate: new Date(payment?.startDate).toLocaleDateString(),
        }))
      } catch (error) {
        /* empty */
      } finally {
        this.loading = false
      }
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
