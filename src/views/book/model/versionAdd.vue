<template>
  <version-detail :is-edit="false" />
</template>

<script>
import VersionDetail from './versionDetail'

export default {
  name: 'EditForm',
  components: { VersionDetail }
}
</script>
