import { createRouter, createWebHistory } from 'vue-router';
import PokeList from '../components/PokeList';
import PokeLikes from '../components/PokeLikes';
import PokeItem from '../components/PokeItem';
import PokeSearch from '../components/PokeSearch';

const router = createRouter({
  history: createWebHistory(),

  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
  
  routes: [
    {
      path: '/pokemons', 
      component: PokeList, 
      name: 'Pokemons',
      alias: '/',
    },

    {
      path: '/pokemons/:pokeName', 
      component: PokeItem, 
      name: 'Pokemon', 
      props: true
    },
  
    {
      path: '/my-likes', component: PokeLikes
    },

    {
      path: '/search', component: PokeSearch
    },
  ]
});

export default router;