import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import {PRIMARY_COLOR} from '@/constants.js' ;

Vue.use(Vuetify);

console.log('PRIMARY_COLOR', PRIMARY_COLOR) ;
export default new Vuetify({
  theme:{
    themes: {
        light: {
          primary: PRIMARY_COLOR,
          //secondary: '#b0bec5',
          // accent: '#8c9eff',
          //error: '#b71c1c',
        },
        dark: {
          // primary: 'green',
          //secondary: '#b0bec5',
          // accent: '#8c9eff',
          //error: '#b71c1c',
        },
      },
    }

});
