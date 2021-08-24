function mapParameters(params, data){
  if ((typeof params !== 'undefined') && (typeof data !== 'undefined')){
    if(params !== null){      
      Object.keys(data).forEach(key => {
        params = params.replace("@"+key, data[key])
      })
      return params
    }
  } else {
    return ''
  }
}
exports.mapParameters = mapParameters
