function mapParameters(params, data){
  Object.keys(data).forEach(key => {
    params = params.replace("@"+key, data[key])
  })
  return params
}

module.exports = {
  mapParameters
}