import Navbar from './components/Navbar.vue'

export const routes = [
    {path: '/', name: 'home', components: {default: Navbar}},
    {path: '/*', redirect: {name: 'home'}}
];