<template>
  <area-detail :is-edit="false" />
</template>

<script>
  import AreaDetail from './areaDetail'

  export default {
    name: 'EditForm',
    components: {AreaDetail}
  }
</script>
