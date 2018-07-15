import Navbar from './components/Navbar.vue'
import Room from './components/Room.vue'
import Home from './components/Home.vue'

export const routes = [{
    path: '',
    name: '/home',
    components: {
      navbar: Navbar,
      default: Home
    }
  },
  {
    path: '/room',
    name: 'room',
    components: {
      navbar: Navbar,
      default: Room
    }
  },
  //{path: '/*', redirect: {name: 'home'}}
];
