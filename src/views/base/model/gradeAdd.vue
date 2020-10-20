<template>
  <grade-detail :is-edit="true" />
</template>

<script>
import GradeDetail from './gradeDetail'

export default {
  name: 'AddForm',
  components: { GradeDetail }
}
</script>
