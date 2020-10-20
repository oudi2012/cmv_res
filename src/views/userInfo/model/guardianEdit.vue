<template>
  <guardian-detail :is-edit="true" />
</template>

<script>
import GuardianDetail from './guardianDetail'

export default {
  name: 'EditForm',
  components: { GuardianDetail }
}
</script>
