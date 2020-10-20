<template>
  <guardian-detail :is-edit="false" />
</template>

<script>
import GuardianDetail from './guardianDetail'

export default {
  name: 'EditForm',
  components: { GuardianDetail }
}
</script>
