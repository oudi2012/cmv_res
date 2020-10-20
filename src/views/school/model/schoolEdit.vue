<template>
  <school-detail :is-edit="true" />
</template>

<script>
import SchoolDetail from './schoolDetail'

export default {
  name: 'EditForm',
  components: { SchoolDetail }
}
</script>
