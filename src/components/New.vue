<template>
<div class="container">

<div id="new-building" v-show="viewState === 1">
    <h1>Let's create a new Room :)</h1>
    <br>
  <form>
    <div class="row">
      <div class="input-field col s6">
        <input type="text" v-model="buildingname" id="buildingname" class="validate"/>
        <label for="buildingname">Name of the building</label>
      </div>
    </div>
    <div class="row">
      <div class="col s12">
      <label for="floors">Floors : <span>{{floors}}</span></label>
    </div>
      <div class="col s12">
        <p class="range-field">
          <input type="range" v-model="floors" id="floors" min="1" max="10" />
        </p>
      </div>
    </div>
    <a class="btn next right" v-on:click="firstStep()">Next</a>
  </form>
</div>

<div id="new-floor" v-show="viewState === 2">
  <h1>Give your floors names</h1>
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
<h1>Allocate rooms to floors</h1>
<form>

<div class="row">
  <div class="input-field col s6">
    <input type="text" id="room-name" class="validate"/>
    <label for="room-name">Name of the room</label>
  </div>
</div>

<div class="row">
  <div class="col s2">
  <label for="floors">Area : <span>{{labelArea}} qm</span></label>
</div>
  <div class="col s6">
    <p class="range-field">
      <input type="range" v-model="labelArea" id="room-area" min="1" max="150"/>
    </p>
  </div>
</div>

<div class="row">
  <div class="col s2">
  <label for="floors">Doors : <span>{{labelDoors}}</span></label>
</div>
  <div class="col s6">
    <p class="range-field">
      <input type="range" v-model="labelDoors" id="room-doors" min="0" max="10" />
    </p>
  </div>
</div>

<div class="row">
  <div class="col s2">
  <label for="floors">Windows : <span>{{labelWindows}}</span> </label>
</div>
  <div class="col s6">
    <p class="range-field">
      <input type="range" id="room-windows" v-model="labelWindows" min="0" max="20" />
    </p>
  </div>
</div>
    <div class="info">Successfully assigned the room!</div>
<div class="row">
  <div class="col s6">
    <select id="room-select">
      <option disabled selected value="disabled">Chose a floor</option>
      <option v-for="floor in this.newCard.floors" :value="floor.id">{{floor.name}}</option>
    </select>
  </div>
</div>

<a class="btn" v-on:click="addRoom()">Add Room</a>
<a class="btn orange" v-on:click="save()">Save & Quit</a>
</form>

</div>

</div>
</template>

<script>
export default {
  data() {
    return {
      viewState: 1,
      resource: {},
      newCard: {
        id: `building${window.crypto.getRandomValues(new Uint32Array(10)).join('')}`,
        name: ``,
        floors: [],
        rooms: []
      },
      buildingname: '',
      floors: 1,
        labelArea: 0,
        labelDoors: 0,
        labelWindows: 0,
        labelFloorCount: 0
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
        document.querySelector('.info').classList.add('show');
        setTimeout(() =>{
            document.querySelector('.info').classList.remove('show');
        },2500);

        document.querySelector('#room-name').value = '';
        document.querySelector('#room-area').value = 0;
        document.querySelector('#room-doors').value = 0;
        document.querySelector('#room-windows').value = 0;
        this.labelWindows = 0;
        this.labelDoors = 0;
        this.labelArea = 0;
    },
    save() {
      this.viewState = 1;
      if(confirm('Saved! Return to home? ')){
          this.resource.saveData(this.newCard).then(response => {
              this.$router.push('/');
          });
      }
    }
  },
  created() {
    const customActions = {
      saveData: { method: 'POST', url: 'http://localhost:3000/' }
    };
    this.resource = this.$resource('', {}, customActions);
  }
};
</script>

<style lang="scss" scoped>
select {
  display: inherit;
    height: 4rem;
}
input {
  margin-bottom: 1rem;
  font-size: 1.8rem !important;
}
.input-field{
  font-size: 3rem;
}

label {
  span{
    color: rgba(238, 110, 115, 0.7)}
}

h1, h2, h3, h4, h5 {
  color: rgba(238, 110, 115, 0.7)
}
.info{
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 7rem;
    background-color: rgba(238, 110, 115, 1);
    border: 1px solid #a3364f;
    border-radius: 5px;
    color: #fff;
    text-align: center;
    line-height: 7rem;
    font-size: 2rem;
}
.show{
    animation: moveDown 2s;
}

.info.show{
    display: block;
}

@keyframes moveDown {
    0%   {
        opacity: 0;
        transform: translateY(-200px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>

