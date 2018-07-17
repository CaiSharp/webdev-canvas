<template>
<div class="container">

<div id="new-building" v-show="viewState === 1">
    <h1>Lets create a new Room</h1>
  <form>
    <div class="row">
      <div class="input-field col s6">
        <input type="text" v-model="buildingname" id="buildingname" class="validate"/>
        <label for="buildingname">Name of the building</label>
      </div>
    </div>
    <div class="row">
      <div class="col s2">
      <label for="floors">Floors</label>
    </div>
      <div class="col s6">
        <p class="range-field">
          <input type="range" v-model="floors" id="floors" min="1" max="6" />
        </p>
      </div>
    </div>
    <a class="btn next" v-on:click="firstStep()">Next</a>
  </form>
</div>

<div id="new-floor" v-show="viewState === 2">
  <h1>Give youre floors names</h1>
<form>
  <div class="row" v-for="floor in this.newCard.floors">
    <div class="input-field col s6">
      <input type="text" :id="floor.id" class="validate floor-input"/>
      <label :for="floor.id">Name of the floor</label>
    </div>
  </div>
</form>
<button class="btn" v-on:click="addFloors()">Next</button>
</div>

<div id="new-floor" v-show="viewState === 3">
<h1>Add Rooms</h1>
<form>

<div class="row">
  <div class="input-field col s6">
    <input type="text" id="room-name" class="validate"/>
    <label for="room-name">Name of the room</label>
  </div>
</div>

<div class="row">
  <div class="col s2">
  <label for="floors">Area</label>
</div>
  <div class="col s6">
    <p class="range-field">
      <input type="range" id="room-area" min="1" max="150" />
    </p>
  </div>
</div>

<div class="row">
  <div class="col s2">
  <label for="floors">Doors</label>
</div>
  <div class="col s6">
    <p class="range-field">
      <input type="range" id="room-doors" min="0" max="10" />
    </p>
  </div>
</div>

<div class="row">
  <div class="col s2">
  <label for="floors">Windows</label>
</div>
  <div class="col s6">
    <p class="range-field">
      <input type="range" id="room-windows" min="0" max="20" />
    </p>
  </div>
</div>

<div class="row">
  <div class="col s6">
    <select id="room-select">
      <option disabled selected value="disabled">Chose a floor</option>
      <option v-for="floor in this.newCard.floors" :value="floor.id">{{floor.name}}</option>
    </select>
  </div>
</div>

<a class="btn" v-on:click="addRoom()">Add Room</a>
<a class="btn orange" v-on:click="save()">All rooms added</a>
</form>

</div>

</div>
</template>

<script>
export default {
  data() {
    return {
      viewState: 1,
      newCard: {
        name: ``,
        floors: [],
        rooms: []
      },
      buildingname: '',
      floors: 1
    };
  },
  methods: {
    firstStep() {
      this.newCard.name = `${this.buildingname}`;
      for (let i = 0; i < this.floors; i++) {
        this.newCard.floors.push({ id: `floor0${i + 1}` });
      }
      this.viewState = 2;
    },
    addFloors() {
      this.newCard.floors = [];
      const newFloors = document.querySelectorAll('.floor-input');
      newFloors.forEach(input => {
        this.newCard.floors.push({
          id: `floor${Math.floor(Math.random() * 1000 + 1)}`,
          name: `${input.value}`
        });
      });
      this.viewState = 3;
    },
    addRoom() {
      const roomName = document.querySelector('#room-name').value;
      const roomArea = document.querySelector('#room-area').value;
      const roomDoors = document.querySelector('#room-doors').value;
      const roomWindows = document.querySelector('#room-windows').value;
      const selectList = document.querySelector('#room-select');
      const roomSelect = selectList[selectList.selectedIndex].value;

      this.newCard.rooms.push({
        id: `room${Math.floor(Math.random() * 1000 + 1)}`,
        name: `${roomName}`,
        area: `${roomArea}`,
        doors: `${roomDoors}`,
        windows: `${roomWindows}`,
        floorId: `${roomSelect}`
      });
    },
    save() {
      this.viewState = 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 100px;
}

select {
  // width: 100px !important;
  // height: 30px !important;
  display: inherit;
}
</style>

