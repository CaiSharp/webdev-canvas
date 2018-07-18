import Navbar from './components/Navbar.vue'
import New from './components/New.vue'
import Edit from './components/Edit.vue'
import Home from './components/Home.vue'

export const routes = [{
    path: '/',
    name: '/home',
    components: {
      navbar: Navbar,
      default: Home
    }
  },
  {
    path: '/new',
    name: 'new',
    components: {
      navbar: Navbar,
      default: New
    }
  },
    {
        path: '/edit/:obj',
        name: 'edit',
        components: {
            navbar: Navbar,
            default: Edit
        },
        props: true
    },
  //{path: '/*', redirect: {name: 'home'}}
];
