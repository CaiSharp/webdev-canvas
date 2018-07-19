<template>
  <div class="container">
    <div class="row">
      <div class="input-field col s12">
        <input type="text" v-model="searchQuery" class="validate" id="search" @input="executeSearch"/>
        <label for="search">Search</label>
      </div>
    </div>
    <div class="row">
          <div class="col s12 m6" v-for="value in searchResult">
            <div class="card darken-2">
              <div class="card-content">
                <span class="card-title">{{value.name}}</span>
                <ul>
                  <li>Floors: {{value.floors.length}}</li>
                  <li>Rooms: {{value.rooms.length}}</li>
                </ul>
              </div>
              <div class="card-tabs">
                <ul class="tabs tabs-fixed-width">
                  <li class="tab" v-for="(floor,index) in value.floors">
                    <a :class="{active: tabActiveIndex===index && tabActiveObjId===value.id}" v-on:click="displayRooms(floor.id, value.id), toggleActive(index,value.id)">{{floor.name}}</a>
                  </li>
                </ul>
              </div>
               <div class="row">
              <div :id="value.id" class="card-content ">

                  </div>
              </div>
              <div class="card-action">
                <router-link tag="a" :to="{name: 'edit', params: {obj:value}}">Edit</router-link>
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
      tabActiveObjId: undefined,
        searchQuery: '',
        searchResult: []
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
          this.searchResult = this.allData;
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

          <div class="col s6 xs12" v-for="value in allData">
              <div class="card darken-2">
              <div class="card-content">
          <div class="room">
            <ul>
              <li class="name">${room.name}</li>
              <li>Area: ${room.area}m³</li>
              <li>Doors: ${room.doors}</li>
              <li>Windows: ${room.windows}</li>
            </ul>
          </div>
          </div>
          </div>
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
    },
      executeSearch(){
        let searchLowercase = this.searchQuery.toLowerCase();

        if(searchLowercase.length >0 ){
            this.searchResult = this.allData.filter( el => el.name.toLowerCase().includes(searchLowercase));
        }
        else {
            this.searchResult = this.allData;
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


