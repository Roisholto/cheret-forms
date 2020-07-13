<template>
  <div style="width:600px">
    <v-breadcrumbs :items="breadcrumb"/>
    <v-form ref="form01" v-model="form_valid" @submit.prevent="submit">
      <v-card :loading="submitting">
        <v-card-title></v-card-title>

        <v-card-text>
          <v-file-input
            label="Upload manuscript"
            @change="fileUploaded"
            hint="This is a document that contains the work you will like us to proofread"
            :rules="[rules.required , value => value && value.size < 1000000 || 'document should be less than 1 MB!']"
            accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
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
  name:"Proofreading",

  data(){
    return {
      form_valid: false,

      breadcrumb:[
        {to:'/', text:'Home'},
        {to:{name:'proofreading'}, text:'Proofreading'}
      ],

      form:{
        file:null
      },

      submitting:false,

      snackbar:{
        show:false,
        message:''
      },

      rules:{
        required
      }
    }
  },

  computed:{
    personal_info(){
      return this.$store.state.PersonalInfo.data ;
    }
  },


  methods:{
    fileUploaded(e){
      let vm = this ;
      console.log('file', e) ;
      let file    = e;
      let reader  = new FileReader();

      reader.addEventListener("load", function () {
          vm.form.file = reader.result;
          console.log('reading file')
          }, false);

      if (file)
        {
        reader.readAsDataURL(file);
        }
    },

    submit(){
      // if(this.$refs.form01.validate())
      //  {
        let vm = this ;
        vm.submitting = true ;
        let data = Object.assign({}, this.form, {'personal_info':this.personal_info}) ;
        submit('proofreading', data)
          .then(function(r){
            return r.json()
          })
          .then(function(r){
            if(r.succ)
              {
              vm.$router.replace({name:'success'}) ;
              }
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
      // }

    }
  }
}
</script>
