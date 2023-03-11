<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title class="text-h5">
          {{ itemType }} Saved Successfully
        </v-card-title>
        <v-card-text
          >You have successfully saved {{ itemName }} {{ itemType }}. Do you
          want to add another one?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <button-light :to="noRoute">No, go back </button-light>
          <button-dark @click="$emit('redoActionDeclined')">
            Yes, Add another one
          </button-dark>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'PostSaveDialog',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    noRoute: {
      type: String,
      default: '/',
    },
    itemType: {
      type: String,
      default: '',
    },
    itemName: {
      type: String,
      default: '',
    },
  },
  computed: {
    dialog: {
      get() {
        return this.show
      },
      set(value) {
        this.$emit('update:show', value)
      },
    },
  },
}
</script>
