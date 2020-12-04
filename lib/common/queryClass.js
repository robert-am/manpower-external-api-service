const mssqlPoolClass = require('./mssqlPoolClass')
const query = require('./queriesMP')

class queryClass extends mssqlPoolClass {

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
        let qParamsAccess = await this.getPool(this.name)
        return await qParamsAccess.query(`exec ${data.spname} ${data.params}`);
    }

}

module.exports = queryClass