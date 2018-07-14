<template>

  <nav>
    <div class="container">
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">Logo</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <router-link tag="li" to="/" active-class="active" exact><a>Home</a></router-link>
          <router-link tag="li" to="/room" active-class="active"><a>Room</a></router-link>
          <router-link tag="li" to="/floor" active-class="active"><a>Floor</a></router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
    export default {

    }
</script>

<style scoped>

</style>