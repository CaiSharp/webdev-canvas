<template>
<div class="container">

<div id="new-building">
  <form>
    <div class="row">cd 
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





</div>
</template>

<script>
export default {
  data() {
    return {
      viewState: 1,
      newCard: undefined,
      roomCounter: undefined,
      buildingname: '',
      floors: 1,
    };
  },
  methods: {
    firstStep: () => {
      this.newCard = {
        name: `${this.buildingname}`,
        floors: [],
        rooms: []
      };
      for (let i = 0; i < this.floors; i++) {
        this.newCard.floors.push({ id: `floor0${i + 1}`, name: 'empty' });
      }
      this.roomCounter = this.newCard.rooms.length;
      this.viewState = 2;
      console.log(this.viewState);
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 100px;
}
</style>

