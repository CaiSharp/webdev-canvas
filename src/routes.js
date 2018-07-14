import Navbar from './components/Navbar.vue'
import Room from './components/Room.vue'

export const routes = [
    {path: '', name: 'home', components: {'navbar': Navbar}},
    {path: '/room', name: 'room', components: {'navbar': Navbar, default: Room}},
    //{path: '/*', redirect: {name: 'home'}}
];