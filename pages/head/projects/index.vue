<template>
  <section>
    <div>
      <projects-table />
    </div>
  </section>
</template>

<script>
import ProjectsTable from '~/components/tables/ProjectsTable.vue';

export default {
  name: 'ProjectsPage',
  components: {
    ProjectsTable
  },
  layout: 'head',
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
