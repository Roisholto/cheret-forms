<template>
  <v-container class="justify-center align-center fill-height">
    <router-view />
  </v-container>
</template>
<script>
import store from '@/store' ;
import Ajv from 'ajv' ;
import router from '@/router' ;
import {phoneNumber} from '@/utils/validation-rules.js' ;

export default {
  name:"Forms",

  beforeRouteEnter(to, from, next){
    // validate that the basic information is filled correctly ;
    let personal = store.state.PersonalInfo.data ;

    let schema = {
      type:"object",
      properties:{
        surname:{
          type:'string',
          minLength:1
        },
        other_names:{
          type:'string',
          minLength:1
        },
        email:{
          type:'string',
          format:'email'
        },
        phone:{
          type:'string',
          format:'phone-number'
        },
        full_address:{
          type:'string',
        }
      },

    required:["surname", "other_names", "email", "phone", "full_address"]
    }

    let ajv = new Ajv ;
    ajv.addFormat('phone-number', function(v){
      let a = phoneNumber(v) ;
      if(typeof(a) == 'string')
        return false

      return true ;  
    })
    let valid = ajv.validate(schema, personal);
    if(valid)
      {
      next() ;
      }
    else
      {
      console.log('router', router) ;
      next({name:'personal-info', query:{goto:to.name}})
      }
  }
}
</script>
