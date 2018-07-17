<template>
<ul>
  <li v-for="value in allData">
     <div class="row">
      <div class="col s12 m6">
        <div class="card large darken-2">
          <div class="card-content">
            <span class="card-title">{{value.name}}</span>
            <ul>
              <li>Floors: {{value.floors.length}}</li>
              <li>Rooms: {{value.rooms.length}}</li>
              <!-- <li>qm: {{value.floors}}</li> -->
            </ul>
          </div>
          <div class="card-tabs">
            <ul class="tabs tabs-fixed-width">
              <li class="tab" v-for="floor in value.floors">
                <a class="" v-on:click="displayRooms(floor.id)">{{floor.name}}</a>
              </li>
            </ul>
          </div>
          <div :id="value.id" class="card-content grey lighten-4">

          </div>
          <div class="card-action">
            <a href="#">View</a>
            <a href="#">Delete</a>
          </div>
        </div>
      </div>
    </div>
  </li>
</ul>
</template>

<script>
export default {
  data() {
    return {
      allData: [],
      resource: {},
      visibleRooms: ``,
      roomElement: undefined
    };
  },
  methods: {
    fetchData() {
      this.resource
        .getAll()
        .then(response => {
          return response;
        })
        .then(data => {
          this.allData = data.body;
        });
    },
    displayRooms(floorId) {
      this.visibleRooms = '';
      this.allData.forEach(building => {
        building.rooms.forEach(room => {
          if (room.floorId === floorId) {
            const template = `
          <div class="room">
            <ul>
              <li>Room Name: ${room.name}</li>
              <li>Doors: ${room.doors}</li>
              <li>Windows: ${room.windows}</li>
              <li>Size: ${room.size}</li>
            </ul>
          </div>
          `;
            console.log(template);
            this.visibleRooms = this.visibleRooms + template;
          }
        });
      });
      // console.log(this.visibleRooms);
      document.querySelector('#rooms').innerHTML = this.visibleRooms;
    }
  },
  created() {
    const customActions = {
      getAll: { method: 'GET', url: 'http://localhost:3000/buildings' },
      saveData: { method: 'POST' }
    };
    this.resource = this.$resource('', {}, customActions);
  },
  mounted() {
    this.fetchData();
    // this.roomElement = this.$refs.room;
  }
};
</script>

<style lang="scss" scoped>
</style>


