<template>

  <nav>
    <div class="container">
      <div class="nav-wrapper">
        <a href="#" class="brand-logo"><i class="material-icons">home</i></a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <router-link tag="li" to="/" active-class="active" exact><a>Home</a></router-link>
          <router-link tag="li" to="/new" active-class="active"><a>New</a></router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
</style>
