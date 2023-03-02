<template>
  <ol class="tw-flex mb-5">
    <li
      v-for="(item, i) in crumbs"
      :key="i"
      class="tw-flex tw-items-center tw-gap-2 tw-ml-2"
    >
      <nuxt-link
        v-slot="{ navigate }"
        :to="item.to"
        custom
        class="tw-font-normal tw-text-sm"
        :class="{ 'tw-text-gray-400': item.disabled }"
      >
        <button :disabled="item.disabled" role="link" @click="navigate">
          {{ item.title }}
        </button>
      </nuxt-link>
      <fa-layers v-if="!item.disabled" class="fa-2xs">
        <fa :icon="['fas', 'chevron-right']" />
      </fa-layers>
    </li>
  </ol>
</template>

<script>
import startCase from 'lodash.startcase'

export default {
  name: 'NewCustomBreadcrumb',
  computed: {
    crumbs() {
      const pathArray = this.$route.path.split('/')
      pathArray.shift()
      const breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        breadcrumbArray.push({
          to: breadcrumbArray[idx - 1]
            ? breadcrumbArray[idx - 1].to + '/' + path
            : '/' + path,
          title: idx === 0 ? 'Home' : startCase(path),
          disabled: idx === pathArray.length - 1,
        })
        return breadcrumbArray
      }, [])
      return breadcrumbs
    },
  },
}
</script>
