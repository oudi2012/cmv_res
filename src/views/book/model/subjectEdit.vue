<template>
  <subject-detail :is-edit="true" />
</template>

<script>
import SubjectDetail from './subjectDetail'

export default {
  name: 'EditForm',
  components: { SubjectDetail }
}
</script>
