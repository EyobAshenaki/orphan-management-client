<template>
  <v-card class="tw-w-224" elevation="0">
    <v-card-title class="-tw-mb-4">
      New Payment in {{ supportPlanName }}
    </v-card-title>
    <v-card-text class="tw-p-4">
      <v-form ref="paymentForm" @submit.prevent="savePayment">
        <div class="form-group">
          <div class="form-control tw-w-full">
            <label class="form-label">Start date</label>
            <custom-date-picker
              v-model="startDate"
              :rules="[rules.required]"
            ></custom-date-picker>
          </div>

          <div class="form-control tw-w-full">
            <label class="form-label">Period in months</label>
            <v-text-field
              v-model.number="period"
              :rules="[rules.required]"
              type="number"
              min="1"
              max="12"
              outlined
              filled
              dense
              color="teal darken-2"
            ></v-text-field>
          </div>
        </div>
        <div class="form-group">
          <div class="form-control tw-w-3/4">
            <label class="form-info"
              >Select how many currency conversions are needed:</label
            >
            <label class="form-info"
              ><span class="font-weight-bold">None</span> - Payment is made in
              (ETB) Birr</label
            >
            <label class="form-info"
              ><span class="font-weight-bold">One</span> - Payment is made in 1
              foreign currency then directly to ETB</label
            >
            <label class="form-info"
              ><span class="font-weight-bold">Two</span> - Payment is made in 1
              foreign currency then to another foreign currency then to
              ETB</label
            >
          </div>

          <div class="form-control tw-w-1/4">
            <label class="form-label">Currency conversions</label>
            <v-select
              v-model.number="currencyConversions"
              :rules="[rules.required]"
              :items="[
                {
                  text: 'None',
                  value: -1,
                },
                {
                  text: 'One',
                  value: 1,
                },
                {
                  text: 'Two',
                  value: 2,
                },
              ]"
              outlined
              filled
              dense
              item-color="teal darken-2"
              color="teal darken-2"
              @change="handleCurrencyConversionsChange"
            ></v-select>
          </div>
        </div>
        <div
          v-if="currencyConversions === 1 || currencyConversions === 2"
          class="form-group"
        >
          <div class="form-control tw-w-1/3">
            <div class="form-label">Amount in primary foreign currency</div>
            <v-text-field
              v-model.number="grossPaymentInPrimaryForeignCurrency"
              :rules="[rules.required]"
              type="number"
              min="1"
              outlined
              filled
              dense
              color="teal darken-2"
              @change="handleGrossPrimaryForeignCurrencyChange"
            ></v-text-field>
          </div>
          <div class="form-control tw-w-1/3">
            <div class="form-label">Primary foreign currency</div>
            <v-select
              v-model="primaryForeignCurrency"
              :rules="[rules.required]"
              :items="primaryForeignCurrencyOptions"
              outlined
              filled
              dense
              item-color="teal darken-2"
              color="teal darken-2"
            ></v-select>
          </div>
          <div class="form-control tw-w-1/3">
            <div class="form-label">Primary exchange rate</div>
            <v-text-field
              v-model.number="primaryExchangeRate"
              :rules="[rules.required]"
              type="number"
              min="1"
              outlined
              filled
              dense
              color="teal darken-2"
              @change="handlePrimaryExchangeRateChange"
            ></v-text-field>
          </div>
        </div>
        <div v-if="currencyConversions === 2" class="form-group">
          <div class="form-control tw-w-1/3">
            <div class="form-label">Amount in secondary foreign currency</div>
            <v-text-field
              v-model.number="grossPaymentInSecondaryForeignCurrency"
              :rules="[rules.required]"
              type="number"
              min="1"
              outlined
              filled
              dense
              color="teal darken-2"
              readonly
              disabled
              suffix="Calculated"
              @change="handleGrossPaymentInSecondaryForeignCurrencyChange"
            ></v-text-field>
          </div>
          <div class="form-control tw-w-1/3">
            <div class="form-label">Secondary foreign currency</div>
            <v-select
              v-model="secondaryForeignCurrency"
              :rules="[rules.required]"
              :items="secondaryForeignCurrencyOptions"
              outlined
              filled
              dense
              item-color="teal darken-2"
              color="teal darken-2"
            ></v-select>
          </div>
          <div class="form-control tw-w-1/3">
            <div class="form-label">Secondary exchange rate</div>
            <v-text-field
              v-model.number="secondaryExchangeRate"
              :rules="[rules.required]"
              type="number"
              min="1"
              outlined
              filled
              dense
              color="teal darken-2"
              @change="handleSecondaryExchangeRateChange"
            ></v-text-field>
          </div>
        </div>
        <div class="form-group">
          <div class="form-control tw-w-full">
            <div class="form-label">Gross Amount in ETB</div>
            <v-text-field
              v-model.number="grossPaymentInDomesticCurrency"
              :rules="[rules.required]"
              type="number"
              min="1"
              outlined
              filled
              dense
              color="teal darken-2"
              :readonly="currencyConversions !== -1"
              :disabled="currencyConversions !== -1"
              prefix="ETB"
              :suffix="currencyConversions !== -1 ? 'Calculated' : ''"
              @change="handleGrossPaymentInDomesticCurrencyChange"
            ></v-text-field>
          </div>
          <div class="form-control tw-w-full">
            <div class="form-label">
              Admin Fee in ETB ({{ adminFeePercentage }}%)
            </div>
            <v-text-field
              v-model.number="adminFeeInDomesticCurrency"
              :rules="[rules.required]"
              type="number"
              min="1"
              outlined
              filled
              dense
              color="teal darken-2"
              readonly
              disabled
              prefix="ETB"
              suffix="Calculated"
            ></v-text-field>
          </div>
        </div>
        <div class="form-group">
          <div class="tw-w-full tw-flex tw-justify-end">
            <button-dark @click="savePayment">Save</button-dark>
          </div>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import currencies from '~/helpers/currencies.json'
import { fetchSupportPlan } from '~/services/support.service'

function toFixedMoney(value) {
  return value ? +value.toFixed(6) : null
}
export default {
  name: 'AddPaymentPage',
  components: {},
  layout: 'dashboard',
  data() {
    return {
      supportPlan: null,
      startDate: null,
      period: null,
      grossPaymentInPrimaryForeignCurrency: null,
      primaryForeignCurrency: null,
      primaryExchangeRate: null,
      grossPaymentInSecondaryForeignCurrency: null,
      secondaryForeignCurrency: null,
      secondaryExchangeRate: null,
      grossPaymentInDomesticCurrency: null,
      adminFeeInDomesticCurrency: null,
      currencyConversions: -1,
      rules: {
        required: (value) => !!value || 'Required.',
      },
    }
  },
  computed: {
    supportPlanName() {
      return this.supportPlan?.name
    },
    adminFeePercentage() {
      return this.supportPlan?.adminFeePercentage
    },
    primaryForeignCurrencyOptions() {
      return currencies
        .map(
          (x) =>
            `${String(Object.entries(x)).split(',')[0]} (${
              String(Object.entries(x)).split(',')[1]
            })`
        )
        .filter((x) => x !== 'ETB (Ethiopian Birr)')
    },
    secondaryForeignCurrencyOptions() {
      return this.primaryForeignCurrencyOptions.filter(
        (x) => x !== this.primaryForeignCurrency
      )
    },
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize() {
      this.supportPlan = await fetchSupportPlan(this.$route.params.supportPlanId)
    },
    async savePayment() {
      const startDate = new Date(this.startDate)
      if (!this.$refs.paymentForm.validate()) return
      const createPaymentInput = {
        supportPlanId: this.supportPlan?.id,
        startDate: startDate.toISOString(), // todo: add a checker for the date vs the supportPlan dates
        endDate: new Date(
          startDate.getFullYear(),
          startDate.getMonth() + this.period,
          startDate.getDate()
        ).toISOString(), // todo: add a checker for the date vs the supportPlan dates
        grossPaymentInPrimaryForeignCurrency: toFixedMoney(
          this.grossPaymentInPrimaryForeignCurrency
        ),
        primaryForeignCurrency: this.primaryForeignCurrency?.length
          ? this.primaryForeignCurrency.split(' ')[0]
          : null,
        primaryExchangeRate: toFixedMoney(this.primaryExchangeRate),
        grossPaymentInSecondaryForeignCurrency: toFixedMoney(
          this.grossPaymentInSecondaryForeignCurrency
        ),
        secondaryForeignCurrency: this.secondaryForeignCurrency?.length
          ? this.secondaryForeignCurrency.split(' ')[0]
          : null,
        secondaryExchangeRate: toFixedMoney(this.secondaryExchangeRate),
        grossPaymentInDomesticCurrency: toFixedMoney(
          this.grossPaymentInDomesticCurrency
        ), // todo: add a checker for the amount vs the supportPlan totalFund amount
        adminFeeInDomesticCurrency: toFixedMoney(
          this.adminFeeInDomesticCurrency
        ),
        netPaymentInDomesticCurrency: toFixedMoney(
          this.grossPaymentInDomesticCurrency - this.adminFeeInDomesticCurrency
        ),
        paymentPeriodInMonths: this.period,
      }
      try {
        await this.$store.dispatch(
          'coordinator/createPayment',
          createPaymentInput
        )
        this.$toaster.showToast({
          content: 'Payment created successfully',
          state: 'success',
        })
        this.$refs.paymentForm.reset()
        this.$router.push({
          name: 'projects-projectId-supportPlanId',
          params: { supportPlanId: this.$route.params.supportPlanId },
        })
      } catch (e) {
        /* empty */
      }
    },
    handleCurrencyConversionsChange() {
      this.grossPaymentInPrimaryForeignCurrency = ''
      this.primaryForeignCurrency = ''
      this.primaryExchangeRate = ''
      this.grossPaymentInSecondaryForeignCurrency = ''
      this.secondaryForeignCurrency = ''
      this.secondaryExchangeRate = ''
      this.grossPaymentInDomesticCurrency = ''
      this.adminFeeInDomesticCurrency = ''
    },
    handleGrossPrimaryForeignCurrencyChange() {
      if (
        this.currencyConversions === 1 &&
        this.grossPaymentInPrimaryForeignCurrency > 0 &&
        this.primaryExchangeRate > 0
      ) {
        this.grossPaymentInDomesticCurrency = toFixedMoney(
          this.grossPaymentInPrimaryForeignCurrency * this.primaryExchangeRate
        )
      } else if (
        this.currencyConversions === 2 &&
        this.primaryExchangeRate > 0 &&
        this.grossPaymentInPrimaryForeignCurrency > 0
      ) {
        this.grossPaymentInSecondaryForeignCurrency = toFixedMoney(
          this.grossPaymentInPrimaryForeignCurrency * this.primaryExchangeRate
        )
        if (
          this.secondaryExchangeRate > 0 &&
          this.grossPaymentInSecondaryForeignCurrency > 0
        ) {
          this.grossPaymentInDomesticCurrency = toFixedMoney(
            this.grossPaymentInSecondaryForeignCurrency *
              this.secondaryExchangeRate
          )
        }
      }
      this.handleGrossPaymentInDomesticCurrencyChange()
    },
    handlePrimaryExchangeRateChange() {
      this.handleGrossPrimaryForeignCurrencyChange()
    },
    handleGrossPaymentInSecondaryForeignCurrencyChange() {
      if (
        this.currencyConversions === 2 &&
        this.secondaryExchangeRate > 0 &&
        this.grossPaymentInSecondaryForeignCurrency > 0
      ) {
        this.grossPaymentInDomesticCurrency = toFixedMoney(
          this.grossPaymentInSecondaryForeignCurrency *
            this.secondaryExchangeRate
        )

        this.handleGrossPaymentInDomesticCurrencyChange()
      }
    },
    handleSecondaryExchangeRateChange() {
      this.handleGrossPaymentInSecondaryForeignCurrencyChange()
    },
    handleGrossPaymentInDomesticCurrencyChange() {
      if (this.grossPaymentInDomesticCurrency > 0)
        this.adminFeeInDomesticCurrency = toFixedMoney(
          this.grossPaymentInDomesticCurrency * (this.adminFeePercentage / 100)
        )
    },
  },
}
</script>
<style scoped>
.form-group {
  @apply tw-flex tw-gap-3;
}
.form-control {
  @apply tw-w-full tw-flex tw-flex-col tw-gap-1;
}
.form-label {
  @apply tw-text-sm tw-text-gray-800 tw-font-light;
}

.form-info {
  @apply tw-text-xs tw-text-gray-800 tw-font-light;
}
</style>
