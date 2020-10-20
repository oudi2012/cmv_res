<template>
  <area-detail :is-edit="true" />
</template>

<script>
import AreaDetail from './areaDetail'

export default {
  name: 'EditForm',
  components: { AreaDetail }
}
</script>
