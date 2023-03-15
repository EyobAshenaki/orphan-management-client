<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        :label="label"
        :rules="rules"
        color="teal darken-2"
        dense
        filled
        outlined
        readonly
        v-bind="attrs"
        v-on="on"
      >
        <template #append>
          <fa-layers
            class="-tw-ml-3 tw-mr-2 tw-mt-[3px]"
            :class="[menu ? 'tw-text-emerald-800' : 'tw-text-gray-500']"
          >
            <fa class="tw-w-5 tw-h-5" :icon="['fa', 'calendar-days']" />
          </fa-layers>
        </template>
      </v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      :active-picker.sync="activePicker"
      :max="
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      "
      min="1950-01-01"
      color="teal darken-2"
      @change="save"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'CustomDatePicker',

  props: {
    label: {
      type: String,
      default: '',
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    activePicker: null,
    date: null,
    menu: false,
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
    date(val) {
      this.$emit('input', val)
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date)
    },
  },
}
</script>
