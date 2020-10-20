<template>
  <banner-detail :is-edit="true" />
</template>

<script>
import BannerDetail from './bannerDetail'

export default {
  name: 'EditForm',
  components: { BannerDetail }
}
</script>

