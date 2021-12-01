<template>
  <div class="center-container">
    <div class="center-text">name: {{ name }}</div>
  </div>
</template>

<script>
export default {
  name: 'Center',
  created() {
    console.log('=== ct center', this.$store.state.user.token_qr)
  }

}
</script>

<style lang="scss" scoped>
.center {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
