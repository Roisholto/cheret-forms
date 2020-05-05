<template>
  <div style="width:600px">
    <v-breadcrumbs :items="breadcrumb"/>

    <v-form ref="form01" v-model="form_valid" @submit.prevent="submit">
      <v-stepper v-model="e1">
        <v-progress-linear indeterminate :active="submitting"/>
        <v-stepper-header>
          <v-stepper-step
            :complete="e1 > 1"
            step="1"
            :editable="!submitting"
          >
            Book info
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="form_valid"
            step="2"
          >
            Author info
          </v-stepper-step>

          <v-divider></v-divider>

          <!--<v-stepper-step
            :complete="e1 > 3"
            step="3"
            :editable="!submitting"
          >
            Review
          </v-stepper-step> -->

        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content
            step="1"
          >
            <v-text-field
              label="Book title"
              :rules="[rules.required]"
              hint="The title of your book"
              v-model="form.book_title">
            </v-text-field>

            <v-spacer class="py-2"/>

            <v-textarea
              :rules="[rules.required]"
              v-model="form.book_description"
              label="Book Description"
              hint="Tell brief description of your book"
              />

            <div class="d-flex justify-space-between pt-4">
              <v-btn text :to="{name:'home'}">Cancel</v-btn>
              <v-btn
                color="primary"
                @click="gotoStep(2)"
              >
                Continue
              </v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content
            step="2"
          >

            <v-textarea
              :rules="[rules.required]"
              v-model="form.author_profile"
              label="Author info"
              hint="We will like to know a few things about the author"
              />

            <div class="d-flex justify-space-between pt-4">
              <v-btn text @click="gotoStep(1)">Prev</v-btn>
              <v-btn
                color="primary"
                type="submit"
                :disabled="!form_valid"
              >
                Submit
              </v-btn>
            </div>
          </v-stepper-content>


        </v-stepper-items>
      </v-stepper>

      <v-snackbar :timeout="10000" color="red darken-1" v-model="snackbar.show">
        <span v-html="snackbar.message"></span>
      </v-snackbar>
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
      e1: 1,

      form_valid: false,

      breadcrumb:[
        {to:'/', text:'Home'},
        {to:{name:'promotion'}, text:'Promotion'}
      ],

      submitting:false,

      form:{
        book_title:null,
        book_description:null,
        author_profile:null
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
    gotoStep(n){
      this.e1 = n ;
    },

    submit(){
      this.submitting = true ;
      let vm = this ;
      let data = Object.assign({}, this.form, {'personal_info':this.personal_info}) ;
      vm.submitting = true ;
      submit('promotion', data)
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
