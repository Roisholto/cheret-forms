export const url = process.env.VUE_APP_API_ENDPOINT+/forms/ ;

export function getEndpoint(ext){
  let _url = url ;
  if(ext)
    _url+=ext ;

  return _url ;
}

export default function submit(type, data){
  let url = getEndpoint(type) ;
  return fetch(url, {
    method:'POST',
    body:JSON.stringify(data),
    headers:{
      "Content-Type": 'Application/json',
    }
  })
}
