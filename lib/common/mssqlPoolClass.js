const  {ConnectionPool} = require('mssql');

class mssqlPoolClass {

    constructor(){
        this.pools = {}
    }

    createPool(config, name){
        if(this.getPool(name)){
            throw new Error('Pool with this name alredy exists')
        }
        return(this.pools[name] = new ConnectionPool({
            user: config.user || process.env.DB_USERNAME,
            password: config.password || process.env.DB_PASSWORD,
            server: config.server || process.env.DB_SERVER,
            database: config.database || process.env.DB_DATABASE,
            port: config.port || parseInt(process.env.DB_PORT) || 1433,
            requestTimeout: 3000000,
            options:{
                encrypt:true
            }
        }).connect())
    }

    closePool(name){
        if(Object.prototype.hasOwnProperty(this.pools, name)){
            const pool = this.pools[name]
            delete this.pools[name]
            return pool.close()
        }
    }

    getPool(name){
        if(this.pools.hasOwnProperty(name)){
            return this.pools[name]
        }
    }

}

module.exports = mssqlPoolClass