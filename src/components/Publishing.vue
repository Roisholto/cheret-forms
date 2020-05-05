<template>
  <div class="" style="width:600px">
    <v-breadcrumbs :items="breadcrumb"/>
    <v-form ref="form01" v-model="form_valid">
      <v-stepper v-model="e1">
        <v-progress-linear indeterminate :active="submitting"/>
        <v-stepper-header>
          <v-stepper-step
            :complete="e1 > 1"
            step="1"
            :editable="!submitting"
          >
            Publishing choice
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="e1 > 2"
            step="2"
            :editable="!submitting"
          >
            Book info
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="e1 > 3"
            step="3"
            :editable="!submitting"
          >
            Publishing info
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="e1 == 4"
            step="4"
          >
            Review
          </v-stepper-step>

        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content
            step="1"
          >
            <v-select name="publishing_type"
              label="Publishing type"
              v-model="form.publishing_type"
              :rules="[rules.required]"
              :items="[
                {text:'Self-Publishing',value:'self-publishing'},
                {text:'Co-Publishing', value:'co-publishing'},
                {text:'Traditional Co-publishing', value:'traditional co-publishing'}
                ]">
            </v-select>

            <v-scroll-x-transition>
              <v-select
                v-if="form.publishing_type=='self-publishing'"
                name="paper_back"
                label="Paper back"
                v-model="form.paper_back"
                :rules="[rules.required]"
                :items="[
                {text:'Paper cover', value:'paper cover'},
                {text:'Hard cover', value:'hard cover'},
                {text:'Leather cover', value:'leather cover'}
                ]">
              </v-select>

              <v-select
                v-if="form.publishing_type=='co-publishing' || form.publishing_type == 'traditional co-publishing'"
                name="no_of_authors"
                label="No of authors"
                :rules="[rules.required]"
                v-model="form.no_of_authors"
                :items="author_count_type[form.publishing_type]">
              </v-select>
            </v-scroll-x-transition>

            <div class="d-flex justify-space-between pt-4">
              <v-btn text :to="{name:'home'}">Cancel</v-btn>
              <v-btn
                color="primary"
                @click="nextStep(1)"
              >
                Continue
              </v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content
            step="2"
            >

            <v-text-field
              name="book_title"
              label="Book title"
              :rules="[rules.required]"
              v-model="form.book_title"
              hint="Tell us the title of your book"></v-text-field>

            <v-textarea
              name="book_description"
              label="Book Description"
              :rules="[rules.required]"
              v-model="form.book_description"
              hint="Give us a brief description of your book"></v-textarea>

            <v-text-field
              name="manuscript"
              label="How many pages is your manuscript in Microsoft word"
              type="number"
              :rules="[rules.required]"
              v-model="form.manuscript"
              hint="Margins at 1 inches, 12pts, Times New Romans, A4 Page Size">
            </v-text-field>

            <div class="d-flex justify-space-between pt-4">
              <v-btn text @click="gotoStep(1)">Prev</v-btn>
              <v-btn
                color="primary"
                @click="gotoStep(3)"
              >
                Continue
              </v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-text-field
              label="How many copies are you looking forward to producing"
              type="number"
              :rules="[rules.required]"
              name="no_of_copies"
              v-model="form.no_of_copies"
              >
            </v-text-field>

            <v-text-field
              type="date"
              label="When are you looking forward to publicly present the book"
              name="presentation_date"
              :rules="[rules.required]"
              v-model="form.presentation_date"
              >
            </v-text-field>

            <div class="d-flex justify-space-between pt-4">
              <v-btn text @click="gotoStep(2)">Prev</v-btn>
              <v-btn
                color="primary"
                :disabled="!form_valid"
                @click="gotoStep(4)"
              >
                Continue
              </v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="4">
            <SingleReview class="py-3">
              <span slot="title">Publishing type</span>
              <span>{{form.publishing_type}}</span>
            </SingleReview>

            <v-divider></v-divider>

            <SingleReview class="py-3">
              <span slot="title">No of authors</span>
              <span>{{form.no_of_authors}}</span>
            </SingleReview>

            <v-divider></v-divider>

            <SingleReview class="py-3">
              <span slot="title">Type of Paper-back</span>
              <span>{{form.paper_back}}</span>
            </SingleReview>

            <v-divider></v-divider>

            <SingleReview class="py-3">
              <span slot="title">Book title</span>
              <span>{{form.book_title}}</span>
            </SingleReview>

            <v-divider></v-divider>

            <SingleReview class="py-3">
              <span slot="title">Book description</span>
              <span>{{form.book_description}}</span>
            </SingleReview>

            <v-divider></v-divider>

            <SingleReview class="py-3">
              <span slot="title">Manuscript page count</span>
              <span>{{form.manuscript}}</span>
            </SingleReview>

            <v-divider></v-divider>

            <SingleReview class="py-3">
              <span slot="title">No of copies</span>
              <span>{{form.no_of_copies}}</span>
            </SingleReview>

            <v-divider></v-divider>

            <SingleReview class="py-3">
              <span slot="title">Presentation date</span>
              <span>{{form.presentation_date}}</span>
            </SingleReview>


            <div class="d-flex justify-space-between pt-4">
              <v-btn text @click="gotoStep(3)" :disabled="submitting">Edit</v-btn>
              <v-btn
                :loading="submitting"
                color="primary"
                @click="submit()"
              >
                Submit
              </v-btn>
            </div>
          </v-stepper-content>
          <v-snackbar :timeout="10000" color="red darken-1" v-model="snackbar.show">
            <span v-html="snackbar.message"></span>
          </v-snackbar>
        </v-stepper-items>
      </v-stepper>
    </v-form>
  </div>
</template>
<script>
import SingleReview from './SingleReview.vue' ;
import submit from '@/api/form-sender.js' ;
import {required} from '@/utils/validation-rules.js' ;

export default {
  name:"Publishing",
  data () {
    return {
      breadcrumb:[
        {to:'/', text:'Home'},
        {to:{name:'publishing'}, text:'Publishing'}
      ],

      e1: 1,
      steps: 3,
      editable: false,
      submitting: false,
      author_count_type:{
        "co-publishing":[
          {text:"2 Authors", value:2},
          {text:"5 Authors", value:5},
          {text:"10 Authors", value:10},
        ],
        "traditional co-publishing":[
          {text:"4 Authors", value:4},
          {text:"10 Authors", value:10},
          {text:"20 Authors", value:20}
        ]
      },

      form:{
        publishing_type:null,
        paper_back:null,
        book_title:null,
        book_description:null,
        manuscript:null,
        no_of_authors:null,
        presentation_date:null,
        no_of_copies:null
      },

      form_valid:false,

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
      return this.$store.state.PersonalInfo.data
    }
  },

  watch: {
    steps (val) {
      if (this.e1 > val) {
        this.e1 = val
      }
    },

    publishing_type(val){
      if(val == 'self-publishing' )
        this.no_of_authors = 1
    }
  },

  components:{
    SingleReview
  },

  methods: {
    gotoStep(n){
      this.e1 = n ;
    },

    prevStep(n){
      this.e1 = n - 1
    },

    nextStep (n) {
      if (n === this.steps) {
        this.e1 = 1
      } else {
        this.e1 = n + 1
      }
    },

    submit(){
      // validate the data ;
      // input the result ;
      if(!this.$refs.form01.validate()){
        return ;
      }
      this.submitting = true ;
      let vm = this ;
      let data = Object.assign({},this.form,{personal_info:this.personal_info}) ;
      data.manuscript = parseInt(data.manuscript) ;
      if(data.publishing_type == 'self-publishing')
        data.no_of_authors = 1 ;
      else
        {
        delete data.paper_back ;
        }

      submit('publishing', data)
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
              // display errors
              vm.snackbar.message = `<div>${r.description}<div>` ;
              if(r.error == 'schemaError')
                {
                r.data.forEach(function(v){
                  vm.snackbar.message += `<div class="py-1">
                      <div class="font-weight-bold">${v.pointer}</div>
                      ${v.message}
                    </div>`;
                });
                }
              vm.snackbar.show = true
            }
          })
        .catch(function(e){
          vm.snackbar.message = e.toString() ;
          vm.snackbar.show = true ;
        })
        .finally(function(){
          vm.submitting = false
        })

    }
  }
}
</script>
