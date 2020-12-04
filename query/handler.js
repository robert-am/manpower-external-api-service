'use strict';

const queryClass = require('../lib/common/queryClass')
const mp = require('../lib/common/mapParameters')
module.exports.getdata = async event => {
  let data = event.httpMethod ? JSON.parse(event.body): event
  let queryAccess = new queryClass({database: process.env.DB_DATABASE}, 'default')
  let {recordset} = await queryAccess.queryParamsAccess(data); 
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
    port: recordset[0].port
  }
  let queryPA = new queryClass(config, config.database);
  let result = await queryPA.executeSP(spData);  
  if(result.recordset.length == 0){
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
  let resultRs = result.recordset
  return {
    statusCode: 200,
    body: JSON.stringify(
      {resultRs},),
  };  
};
