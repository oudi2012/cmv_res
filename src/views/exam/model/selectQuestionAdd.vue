<template>
  <select-detail :is-edit="false" />
</template>

<script>
import SelectDetail from './selectQuestionDetail'

export default {
  name: 'EditForm',
  components: { SelectDetail }
}
</script>
