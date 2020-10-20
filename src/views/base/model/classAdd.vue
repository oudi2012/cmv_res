<template>
  <class-detail :is-edit="true" />
</template>

<script>
import ClassDetail from './classDetail'

export default {
  name: 'AddForm',
  components: { ClassDetail }
}
</script>
