<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Test for SASS'
    }
  }
}
</script>

<style lang="scss">
  @import "sass/main";
</style>
