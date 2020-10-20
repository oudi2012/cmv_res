<template>
  <question-type-detail :is-edit="true" />
</template>

<script>
import QuestionTypeDetail from './questionTypeDetail'

export default {
  name: 'EditForm',
  components: { QuestionTypeDetail }
}
</script>
