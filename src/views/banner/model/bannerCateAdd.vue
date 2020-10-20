<template>
  <banner-cate-detail :is-edit="false" />
</template>

<script>
import BannerCateDetail from './bannerCateDetail'

export default {
  name: 'EditForm',
  components: { BannerCateDetail }
}
</script>
