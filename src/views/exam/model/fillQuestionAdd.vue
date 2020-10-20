<template>
  <fill-question-detail :is-edit="false" />
</template>

<script>
import FillQuestionDetail from './fillQuestionDetail'

export default {
  name: 'EditForm',
  components: { FillQuestionDetail }
}
</script>
