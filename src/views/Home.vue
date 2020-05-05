<template>
  <v-container class="fill-height">
    <div>
      <h3 class="mb-3">Hello, what will you like us do for you?</h3>
      <v-row>
        <v-col col="12" >
          <v-chip medium color="primary lighten-1"
            class="mr-3 my-3 text-capitalize font-weight-bold"
            :to="service.route"
            v-for="(service, i) in services"
            :key="i">
            {{service.title}}
            <v-icon right>mdi-chevron-right</v-icon>
          </v-chip>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
export default {
  name:"Home",
  data(){
    return {
      /*services:[
        {title:'publishing', route:{name:'publishing'}},
        {title:'launching', route:{name:'launching'}},
        {title:'proofreading', route:{name:'proofreading'}},
        {title:'promotion', route:{name:'promotion'}},
        {title:'writing', route:{name:'writing'}},
      ]*/
    }
  },

  computed:{
    services(){
      return this.$store.state.services ;
    }
  }
}
</script>
