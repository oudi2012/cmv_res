<template>
  <ask-question-detail :is-edit="false" />
</template>

<script>
import AskQuestionDetail from './askQuestionDetail'

export default {
  name: 'EditForm',
  components: { AskQuestionDetail }
}
</script>
