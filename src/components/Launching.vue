<template>
  <div>
    <v-breadcrumbs :items="breadcrumb"/>

    <v-form ref="form01" @submit.prevent="submit">
      <v-card width="600" :loading="submitting" >
        <v-card-title></v-card-title>

        <v-card-text>
          <v-text-field name="book_title" v-model="form.book_title" label="book_title"/>

          <v-spacer class="py-1" />

          <v-text-field type="number" name="no_of_guest" v-model="form.no_of_guest" label="No of expected guest"/>

          <v-spacer class="py-1" />

          <v-text-field
            name="preferred_city"
            v-model="form.preferred_city"
            label="Preferred city"
            hint="This is where you want the event held"
            />

          <v-spacer class="py-1" />

          <v-text-field type="date"
            v-model="form.event_date"
            name="event_date"
            label="Event date"
            hint=""
            />
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn
            type="submit"
            :loading="submitting"
            color="primary">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar :timeout="10000" color="red darken-1" v-model="snackbar.show">
        {{snackbar.message}}
      </v-snackbar>
    </v-form>
  </div>
</template>
<script>
import submit from '@/api/form-sender.js' ;
import {required} from '@/utils/validation-rules.js' ;

export default{
  name:"Launching",
  data(){
    return {
      breadcrumb:[
        {to:'/', text:'Home'},
        {to:{name:'launching'}, text:'Launching'}
      ],

      submitting:false,

      form:{
        book_title:null,
        no_of_guest:null,
        preferred_city:null,
        event_date:null
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
      data.no_of_guest = parseInt(data.no_of_guest) ;
      vm.submitting = true ;

      submit('launching',data)
        .then(function(r){
          return r.json()
        })
        .then(function(r){
          if(r.succ)
            {
            vm.$router.replace({name:'success'})
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
    }
  }
}
</script>
