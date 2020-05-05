<template>
  <v-container fluid class="fill-height justify-center">
    <v-card width="600" class="">
      <v-card-title>Basic Info</v-card-title>
      <v-card-subtitle>Please add your info before proceeding</v-card-subtitle>
      <v-card-text>
        <v-form v-model="form_valid" id="form01" name="form01" ref="form01" @submit.prevent = "submit">
          <v-text-field
            :rules="[rules.required]"
            name="surname"
            class=""
            v-model="form.surname"
            label="Surname" >
          </v-text-field>

          <v-spacer class="py-2"/>

          <v-text-field
            :rules="[rules.required]"
            name="other_names"
            class=""
            v-model="form.other_names"
            label="Other Names">
          </v-text-field>

          <v-spacer class="py-2"/>

          <v-text-field
            :rules="[rules.required, rules.email]"
            name="email"
            class=""
            v-model="form.email"
            label="Email">
          </v-text-field>

          <v-spacer class="py-2"/>

          <v-text-field
            :rules="[rules.required, rules.phoneNumber]"
            name="phone"
            class=""
            v-model="form.phone"
            label="Mobile number">
          </v-text-field>

          <v-spacer class="py-2"/>

          <v-text-field
            name="full_address"
            class=""
            v-model="form.full_address"
            label="Full address">
          </v-text-field>
        </v-form>
        <v-card-actions class="justify-space-between">
          <v-btn :to="{name:'home'}" color="white">Cancel</v-btn>
          <v-btn type="submit" form="form01" color="primary" :disabled="!form_valid">Continue</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import {required, email, phoneNumber} from '@/utils/validation-rules.js' ;

export default {
  name:"PersonalInfo",
  data(){
    return {
      form_valid:false,
      form:{},
      rules:{
        required,
        email,
        phoneNumber
      }
    }
  },

  computed:{
    info:{
      get(){
        return this.$store.state.PersonalInfo ;
      }
    }
  },

  mounted(){
    this.form = Object.assign({}, this.$store.state.PersonalInfo.data)

  },

  methods:{
    submit(){
      if(this.$refs.form01.validate()){
        this.$store.commit('updatePersonalInfo', this.form) ;
        let goto = this.$route.query.goto ;
        this.$router.replace(goto ? {name:goto} : {name:'home'})
      }
    }
  }
}
</script>
