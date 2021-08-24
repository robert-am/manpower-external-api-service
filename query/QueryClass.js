const mssqlPoolClass = require('./mssqlPoolClass')
const query = require('./queriesMP')

class QueryClass extends mssqlPoolClass {

    constructor(config, name){
        super()
        this.name = name
        this.createPool(config, name)
    }

    async queryParamsAccess(data){
        let qParamsAccess = await this.getPool(this.name)
        return await qParamsAccess.query(query.getResourceSPParam(data));
    }

    async executeSP(data){
        let connection = await this.getPool(this.name)
        if(typeof data.params === 'undefined'){
            return await connection.query(`exec ${data.spname}`)
        } else {
            return await connection.query(`exec ${data.spname} ${data.params}`)
        }
    }
}

module.exports = {
    QueryClass
} 
