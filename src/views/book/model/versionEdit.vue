<template>
  <version-detail :is-edit="true" />
</template>

<script>
import VersionDetail from './versionDetail'

export default {
  name: 'EditForm',
  components: { VersionDetail }
}
</script>
