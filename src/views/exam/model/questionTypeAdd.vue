<template>
  <question-type-detail :is-edit="false" />
</template>

<script>
import QuestionTypeDetail from './questionTypeDetail'

export default {
  name: 'EditForm',
  components: { QuestionTypeDetail }
}
</script>
