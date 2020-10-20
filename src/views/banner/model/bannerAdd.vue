<template>
  <banner-detail :is-edit="false" />
</template>

<script>
import BannerDetail from './bannerDetail'

export default {
  name: 'EditForm',
  components: { BannerDetail }
}
</script>
