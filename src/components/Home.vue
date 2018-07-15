<template>
<ul>
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
</ul>
</template>

<script>
export default {
  methods: {},
  data() {
    return {
      allData: [
        {
          name: 'Mein Haus',
          floors: 2,
          rooms: [
            {
              id: '132312',
              name: 'Wohnzimmer',
              doors: 2,
              windows: 3,
              qm: 25
            },
            {
              id: '11232312',
              name: 'Flur',
              doors: 3,
              windows: 0,
              qm: 10
            },
            {
              id: '1ads32312',
              name: 'Schlafzimmer',
              doors: 1,
              windows: 1,
              qm: 20
            }
          ]
        },
        {
          name: 'Haus 2',
          floors: 3,
          rooms: [
            {
              id: '132234312',
              name: 'Stube',
              doors: 1,
              windows: 3,
              qm: 70
            },
            {
              id: '1323qwe12',
              name: 'Kammer',
              doors: 5,
              windows: 1,
              qm: 20
            },
            {
              id: '132312fsd',
              name: 'Kueche',
              doors: 2,
              windows: 2,
              qm: 20
            }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>


