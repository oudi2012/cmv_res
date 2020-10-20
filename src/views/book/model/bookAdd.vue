<template>
  <book-detail :is-edit="false" />
</template>

<script>
import BookDetail from './bookDetail'

export default {
  name: 'EditForm',
  components: { BookDetail }
}
</script>
