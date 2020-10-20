<template>
  <teacher-detail :is-edit="false" />
</template>

<script>
import TeacherDetail from './teacherDetail'

export default {
  name: 'EditForm',
  components: { TeacherDetail }
}
</script>
