const { QueryClass } = require('./QueryClass')
const  mp  = require('./mapParameters')
module.exports.getdata = async event => {
  let data = event.httpMethod ? JSON.parse(event.body): event
  let queryAccess = new QueryClass({database: process.env.DB_DATABASE}, 'default')
  let {recordset} = await queryAccess.queryParamsAccess(data); 
  
  console.log( `Result Query Params: ` + JSON.stringify({recordset}))

  let {params} = recordset[0]
  let spData = {
    "spname": recordset[0].spname,
    "params": mp.mapParameters(params, data)
  }
  let config = {
    user: recordset[0].username,
    password: recordset[0].password,
    server: recordset[0].hostname,
    database:recordset[0].dbname,
    port: parseInt(recordset[0].port)
  }  
  let queryPA = new QueryClass(config, config.database);
  let resultQuery = await queryPA.executeSP(spData);  
  if(resultQuery.recordset.length == 0){
    return {
      statusCode: 204,
      headers:{
        'Access-Control-Allow-Origin': process.env.ORIGINS,
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        staus: 'No Content',
        description: 'Couldnot find data for the request'
      })
    }
  }
  let result= resultQuery.recordset
  return {
    statusCode: 200,
    body: JSON.stringify(
      {result},),
  };  
};
