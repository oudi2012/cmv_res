<template>
  <hard-level-detail :is-edit="true" />
</template>

<script>
import HardLevelDetail from './hardLevelDetail'

export default {
  name: 'EditForm',
  components: { HardLevelDetail }
}
</script>
