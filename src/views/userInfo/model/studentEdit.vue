<template>
  <student-detail :is-edit="true" />
</template>

<script>
import StudentDetail from './studentDetail'

export default {
  name: 'EditForm',
  components: { StudentDetail }
}
</script>
