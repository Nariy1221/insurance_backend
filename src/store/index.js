import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import permission from './modules/permission'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
  },
  // state:{
  //   isLogin:true
  // },
  // mutations:{
  //   login(state){
  //     state.isLogin=true;
  //   }
  // },
  getters
})

export default store
