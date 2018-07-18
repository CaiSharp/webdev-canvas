<template>
  <div class="container">
    <div class="row">
          <div class="col s12 m6" v-for="value in allData">
            <div class="card darken-2">
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
                  <li class="tab" v-for="(floor,index) in value.floors">
                    <a :class="{active: tabActiveIndex===index && tabActiveObjId===value.id}" v-on:click="displayRooms(floor.id, value.id), toggleActive(index,value.id)">{{floor.name}}</a>
                  </li>
                </ul>
              </div>
              <div :id="value.id" class="card-content grey lighten-4">
              </div>
              <div class="card-action">
                <a href="#">Edit</a>
                <a @click="deleteObject(value)">Delete</a>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allData: [],
      resource: {},
      visibleRooms: ``,
      roomElement: undefined,
      tabActiveIndex: undefined,
      tabActiveObjId: undefined
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
    displayRooms(floorId, buildingId) {
      this.visibleRooms = '';
      this.allData.forEach(building => {
        if (building.id === buildingId) {
          building.rooms.forEach(room => {
            console.log(room.floorId);
            if (room.floorId === floorId) {
              const template = `
          <div class="room">
            <ul>
              <li>Room Name: ${room.name}</li>
              <li>Doors: ${room.doors}</li>
              <li>Windows: ${room.windows}</li>
              <li>Size: ${room.area}m^3</li>
              <hr>
            </ul>
          </div>
          `;

              this.visibleRooms = this.visibleRooms + template;
            }
          });
        }
      });
      document.getElementById(`${buildingId}`).innerHTML = this.visibleRooms;
    },
    toggleActive(index, id) {
      this.tabActiveIndex = index;
      this.tabActiveObjId = id;
    },
    deleteObject(object) {
      if (confirm('Are you sure?')) {
        this.resource.deleteData(object).then(response => {
          this.fetchData();
        });
      }
    }
  },
  created() {
    const customActions = {
      getAll: { method: 'GET', url: 'http://localhost:3000/buildings' },
      saveData: { method: 'POST', url: 'http://localhost:3000/' },
      deleteData: { method: 'POST', url: 'http://localhost:3000/delete' }
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


