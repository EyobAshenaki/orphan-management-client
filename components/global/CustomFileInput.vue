<template>
  <v-file-input
    v-model="files"
    color="teal darken-2"
    dense
    filled
    counter
    :multiple="multiple"
    prepend-icon="mdi-paperclip"
    outlined
    :show-size="1000"
    :placeholder="placeholder"
  >
    <template #selection="{ index, text }">
      <v-chip v-if="index < 2" color="teal darken-2" dark label small>
        {{ text }}
      </v-chip>

      <span
        v-else-if="index === 2"
        class="text-overline grey--text text--darken-3 mx-2"
      >
        +{{ files.length - 2 }} File(s)
      </span>
    </template>
  </v-file-input>
</template>

<script>
export default {
  name: 'CustomFileInput',

  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'Select your files',
    },
  },

  data: () => ({
    files: [],
  }),

  watch: {
    files() {
      console.log('files', this.files)
      this.$emit('fileChange', this.files)
    },
  },

  methods: {
    // onFileChange(e) {
    //   const files = e.target.files || e.dataTransfer.files
    //   if (!files.length) return
    //   this.createFile(files[0])
    // },
    // createFile(file) {
    //   const reader = new FileReader()
    //   reader.onload = (e) => {
    //     this.files.push(e.target.result)
    //   }
    //   reader.readAsDataURL(file)
    // },
    // removeFile(index) {
    //   this.files.splice(index, 1)
    // },
  },
}
</script>
