<template>
  <div id="app">
    <p>{{msg}}</p>
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
