export default {
  state:{
    data:{
      name:'',
      other_names:'',
      email:'',
      phone:'',
      full_address:''
    }
  },

  mutations:{
    updatePersonalInfo(state, payload){
      //payload is expected to be an object ;
      state.data = Object.assign({},state.data, payload)

    }
  }
}
