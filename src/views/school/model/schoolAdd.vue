<template>
  <school-detail :is-edit="false" />
</template>

<script>
import SchoolDetail from './schoolDetail'

export default {
  name: 'EditForm',
  components: { SchoolDetail }
}
</script>
