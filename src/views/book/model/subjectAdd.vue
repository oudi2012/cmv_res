<template>
  <subject-detail :is-edit="false" />
</template>

<script>
  import SubjectDetail from './subjectDetail'

  export default {
    name: 'EditForm',
    components: { SubjectDetail }
  }
</script>
