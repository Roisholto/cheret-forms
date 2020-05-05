<template>
  <div>
    <v-breadcrumbs :items="breadcrumb"/>
    <v-form ref="form01" v-model="form_valid" @submit.prevent="submit">
      <v-card width="600" :loading="submitting">
        <v-card-title></v-card-title>

        <v-card-text>

          <v-text-field
            label="Objective"
            :rules="[rules.required]"
            hint="Tell us the objective of the subject of writing"
            v-model="form.objective">
          </v-text-field>

          <v-spacer class="py-2"/>

          <v-textarea
            :rules="[rules.required]"
            v-model="form.brief"
            label="Brief words about the project(500 words)"
            hint="Tell us everything important about this project"
            />

        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn type="submit" color="primary" :loading="submitting">Submit</v-btn>
        </v-card-actions>

        <v-snackbar :timeout="10000" color="red darken-1" v-model="snackbar.show">
          <span v-html="snackbar.message"></span>
        </v-snackbar>
      </v-card>
    </v-form>
  </div>
</template>
<script>
import submit from '@/api/form-sender.js' ;
import {required} from '@/utils/validation-rules.js' ;

export default {
  name:"Writing",
  data(){
    return {
      form_valid: false,

      breadcrumb:[
        {to:'/', text:'Home'},
        {to:{name:'writing'}, text:'Writing'}
      ],

      submitting:false,

      form:{
        objective:null,
        brief:null
      },

      rules:{
        required
      },

      snackbar:{
        show:false,
        message:''
      }
    }
  },

  computed:{
    personal_info(){
      return this.$store.state.PersonalInfo.data ;
    }
  },

  methods:{
    submit(){
      this.submitting = true ;
      let vm = this ;
      let data = Object.assign({}, this.form, {'personal_info':this.personal_info}) ;
      vm.submitting = true ;
      submit('writing', data)
        .then(function(r){
          return r.json() ;
        })
        .then(function(r){
          if(r.succ)
            vm.$router.replace({name:'success'}) ;
          else
            {
            vm.snackbar.message = r.description ;
            vm.snackbar.show = true ;
            }
        })
        .catch(function(e){
          vm.snackbar.message = e.toString() ;
          vm.snackbar.show = true ;
        })
        .finally(function(){
          vm.submitting = false ;
        })
    }
  }

}
</script>
