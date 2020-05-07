import Vue from 'vue'
import Vuex from 'vuex'
import PersonalInfo from './personal-info.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    services:[
      {title:'publishing', route:{name:'publishing'}},
      {title:'launching', route:{name:'launching'}},
      {title:'proofreading', route:{name:'proofreading'}},
      {title:'promotion', route:{name:'promotion'}},
      {title:'writing', route:{name:'writing'}},
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules:{
    PersonalInfo:PersonalInfo
  },
})
