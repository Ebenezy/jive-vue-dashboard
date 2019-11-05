import Vue from 'vue'
import Vuex from 'vuex'
import Users from './modules/user/users'
import Events from './modules/Event/event'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: '**-jive-data-00-**',
  storage: localStorage
});

export default new Vuex.Store({
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    User: Users,
    Event:Events
  },
  plugins: [vuexPersist.plugin]
});