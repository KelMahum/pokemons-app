import axios from 'axios';

export default {
  state(){
    return {
      allPokemons: [],
      searchedPokemons: [],
      imgURL: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/",
    }
  },

  getters: {
    allPokemons(state){
      return state.allPokemons;
    },
    searchedPokemons(state){
      return state.searchedPokemons;
    }
  },

  mutations: {
    setAllPokemons(state, results){
      state.allPokemons = results;
    },
    setSearchedPokemons(state, results){
      let modifiedArray = results.map((item) => {

        let id = item.url.split('/').find((item) => parseInt(item));

        let validName = item.name[0].toUpperCase() + item.name.slice(1).toLowerCase();

        return { name: item.name, validName, id, picture: state.imgURL + id + '.png'}
      });

      state.searchedPokemons = modifiedArray;
    }
  },

  actions: {
    async loadAllPokemons({ commit }){
      let { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/`, 
      { params: { limit: 500 , offset: 0 }});

      commit('setAllPokemons', data.results);
    },

    filterPokemons({ commit, getters }, inputValue ){
      let { allPokemons } = getters;

      let searched = allPokemons.filter(item => item.name.startsWith(inputValue));

      commit('setSearchedPokemons', searched);
    }
  }
}