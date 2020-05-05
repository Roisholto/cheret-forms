// Get an instance of `PhoneNumberUtil`.
import {PhoneNumberUtil} from 'google-libphonenumber' ;
// Require `PhoneNumberFormat`.
const PNF = require('google-libphonenumber').PhoneNumberFormat;

// const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();


export const required = (v) => !!v || 'Field is required' ;

export const email = v => /.+@.+\..+/.test(v) || 'E-mail must be valid' ;

const phoneUtil = PhoneNumberUtil.getInstance() ;

export function phoneNumber(v){
  try
    {
    let number = phoneUtil.parseAndKeepRawInput(v);
    return phoneUtil.isValidNumber(number)
      ?
      true
      :
      'invalid phone number, please enter your phone-number in international format'
    }
  catch(e)
    {

      return e.message
    }

}
