<template>
  <div class="container">
    <br><br>
    <form action="#">
      <p class="range-field">
        <label>Select the amount of corners a room has</label>
        <input type="range" min="3" max="7" v-model="room.corners"/>
      </p>
    </form>
    <br><br>
    <component :is="'appCorner' + room.corners"></component>
  </div>

</template>

<script>
    import Corner5 from './room_templates/Corner5.vue'
    import Corner6 from './room_templates/Corner6.vue'

    export default {
        data(){
            return {
                room: {
                    corners: 6,
                }
            }
        },
        components: {
            appCorner5: Corner5,
            appCorner6: Corner6
        }
    }
</script>

<style scoped>

</style>