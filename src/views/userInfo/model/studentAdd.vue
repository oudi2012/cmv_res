<template>
  <student-detail :is-edit="false" />
</template>

<script>
import StudentDetail from './studentDetail'

export default {
  name: 'AddForm',
  components: { StudentDetail }
}
</script>
