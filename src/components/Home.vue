<template>
<h1>hi</h1>
<!-- <ul>
  <li v-for="value in allData">
     <div class="row">
      <div class="col s12 m6">
        <div class="card large darken-2">
          <div class="card-content">
            <span class="card-title">{{value.name}}</span>
            <ul>
              <li>Floors: {{value.floors}}</li>
              <li>Rooms: {{value.floors}}</li>
              <li>qm: {{value.floors}}</li>
            </ul>
          </div>
          <div class="card-tabs">
            <ul class="tabs tabs-fixed-width">
              <li class="tab" v-for="room in value.rooms">
                <a class="active" :href="'#' + room.id">{{room.name}}</a>
              </li>
            </ul>
          </div>
          <div class="card-content grey lighten-4">
            <div v-for="room in value.rooms" :id="room.id">
              <ul>
                <li>qm: {{room.qm}}</li>
                <li>Windows: {{room.windows}}</li>
                <li>Doors: {{room.doors}}</li>
              </ul>
              </div>

          </div>
          <div class="card-action">
            <a href="#">View</a>
            <a href="#">Delete</a>
          </div>
        </div>
      </div>
    </div>
  </li>
</ul> -->
</template>

<script>
export default {
  methods: {
    getAll: () => {
      // GET /someUrl
      this.$http.get('/buildings').then(
        response => {
          // get body data
          this.allData = response.body;
          console.log(this.allData);
        },
        response => {
          // error callback
        }
      );
    }
  },
  data() {
    return {
      allData: undefined
    };
  },
  mounted() {
    this.getAll();
  }
};
</script>

<style lang="scss" scoped>
</style>


