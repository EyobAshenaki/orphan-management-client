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
      <fa-layers v-if="!item.disabled">
        <fa class="tw-w-2.5 tw-h-2.5" :icon="['fas', 'chevron-right']" />
      </fa-layers>
    </li>
  </ol>
</template>

<script>
import startCase from 'lodash.startcase'
import isUUID from 'validator/lib/isUUID'

// const removeIdFromStringEnd = (str) => {
//   const strArray = str.split('')
//   const lastChar = [
//     strArray[strArray.length - 2],
//     strArray[strArray.length - 1],
//   ]
//   if (lastChar[0] === 'I' && lastChar[1] === 'd') {
//     strArray.pop()
//     strArray.pop()
//     return strArray.join('')
//   }
//   return str
// }

export default {
  name: 'NewCustomBreadcrumb',
  computed: {
    crumbs() {
      const pathArray = this.$route.path.split('/')
      // const currentPath = Object.keys(route.params).find(param=>route.name.split('-')[route.name.split('-').length-1].includes(param))
      // const currentPathNameArray = this.$route.name.split('-')
      // const currentPath = currentPathNameArray[currentPathNameArray.length - 1]
      // console.log({
      //   pathArray,
      //   currentPathArray: currentPathNameArray,
      //   currentPathTitle: (removeIdFromStringEnd(currentPath)),
      // })
      // console.log({ name: this.$route.name, path: this.$route.path })
      pathArray.shift()
      // todo: reimplement this with route names instead of paths
      const breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        // console.log({ breadcrumbArray, path, idx });
        breadcrumbArray.push({
          to: breadcrumbArray[idx - 1]
            ? breadcrumbArray[idx - 1].to + '/' + path
            : '/' + path,
          title:
            idx === 0
              ? 'Home'
              : isUUID(path)
              ? path // startCase(removeIdFromStringEnd(currentPath)) // String(path).split('-')[0]
              : startCase(path),
          disabled: idx === pathArray.length - 1,
        })
        return breadcrumbArray
      }, [])
      return breadcrumbs
    },
  },
}
</script>
