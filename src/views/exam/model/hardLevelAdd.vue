<template>
  <hard-level-detail :is-edit="false" />
</template>

<script>
import HardLevelDetail from './hardLevelDetail'

export default {
  name: 'EditForm',
  components: { HardLevelDetail }
}
</script>
