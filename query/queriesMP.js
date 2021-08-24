function getResourceSPParam(data){
 return `SELECT TOP (1000) [id]
 ,[resource_name]
 ,[spname]
 ,[params]
 ,[tenant_id]
 ,[hostname]
 ,[username]
 ,[password]
 ,[dbname]
 ,[port]
FROM [dbo].[resources] 
where resource_name = '${data.resource}' 
and tenant_id = ${data.nit}`   
}

module.exports = {
    getResourceSPParam
}