<template>
  <teacher-detail :is-edit="true" />
</template>

<script>
import TeacherDetail from './teacherDetail'

export default {
  name: 'EditForm',
  components: { TeacherDetail }
}
</script>
