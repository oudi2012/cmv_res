<template>
  <book-detail :is-edit="true" />
</template>

<script>
import BookDetail from './bookDetail'

export default {
  name: 'EditForm',
  components: { BookDetail }
}
</script>

