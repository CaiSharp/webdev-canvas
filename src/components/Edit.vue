<template>
    <div class="container">
        <div class="row">
            <div class="col s12">
                <h1>Let's do a makeover :) !</h1>
            </div>
        </div>
        <hr>
        <br>
        <div class="row">
            <h4 class="col s12">Building Name</h4>
        </div>
        <div class="row">
            <div class="input-field col s6">
                <input type="text" v-model="objToEdit.name" class="validate"/>
                <label>Name of the building</label>
            </div>
        </div>
        <br>
        <div class="row">
            <h4 class="col s12">Floors && Rooms</h4>
        </div>
        <div class="row" v-for="floor in objToEdit.floors">
            <div class="input-field col s12">
                <input type="text" :id="floor.id" v-model="floor.name" class="validate floor-input"/>
                <label :for="floor.id">Name of the floor</label>
            </div>
            <div class="row" v-for="room in returnRoomsInFloor(objToEdit.rooms,floor.id)">
                <div class="input-field col s11 offset-s1">
                    <input type="text" :id="room.id" v-model="room.name" class="validate floor-input"/>
                    <label :for="room.id">Name of the room</label>
                </div>
                <div class="row">
                    <div class="col s10 offset-s2">
                        <p class="range-field">
                            <input type="range" v-model="room.area" min="1" max="150" />
                        </p>
                        <label>Area : <span>{{room.area}}</span> qm</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col s10 offset-s2">
                        <p class="range-field">
                            <input type="range" v-model="room.doors" min="1" max="150" />
                        </p>
                        <label>Doors : <span>{{room.doors}}</span></label>
                    </div>
                </div>
                <div class="row">
                    <div class="col s10 offset-s2">
                        <p class="range-field">
                            <input type="range" v-model="room.windows" min="1" max="150" />
                        </p>
                        <label>Windows : <span>{{room.windows}}</span></label>
                    </div>
                </div>
            </div>

        </div>
        <div class="row">
            <div class="col s12">
                <button class="btn btn-large orange right" @click="updateData">Save Changes!</button>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        props: ['obj'],
        data() {
            return {
                resource: {},
                objToEdit: this.$route.params.obj,
            };
        },
        methods: {
            updateData() {
                this.resource.updateData(this.objToEdit).then(response => {
                    this.$router.push('/');
                });
            },
            returnRoomsInFloor(roomsArr, floorId) {
                return roomsArr.filter(el => el.floorId === floorId);
            }
        },
        created() {
            const customActions = {
                updateData: {method: 'POST', url: 'http://localhost:3000/update'}
            };
            this.resource = this.$resource('', {}, customActions);
        },

    };
</script>

<style lang="scss" scoped>
    input {
        margin-bottom: 1rem;
        font-size: 1.8rem !important;
    }
    .input-field{
        font-size: 3rem;
    }

    label {
        transform: translateY(-1.5rem);
        span{
            color: rgba(238, 110, 115, 0.7)}
    }

    h1, h2, h3, h4, h5 {
        color: rgba(238, 110, 115, 0.7)
    }
</style>

