<template>
  <select-detail :is-edit="true" />
</template>

<script>
import SelectDetail from './selectQuestionDetail'

export default {
  name: 'EditForm',
  components: { SelectDetail }
}
</script>
