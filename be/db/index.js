var mysql = require('mysql');
let config = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'koa',
	port: 3306,
	multipleStatements: true//允许多条sql同时执行
};
let pool = mysql.createPool(config);
let query = (sql, values) => {
	values = values || []
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject(err)
			} else {
				connection.query(sql, values, (err, rows) => {
					if (err) {
						reject(err)
					} else {
						resolve(rows)
					}
					connection.end()
				})
			}
		})
	})
};
let sqlquery = (sql) =>{

	return new Promise((resolve, reject)=>{
		pool.query(sql, (error, results, fields) =>{
			if (error){
				reject(error);
			}else{
				resolve(results)
			}
		});
	})
}
module.exports = {
	query,
	sqlquery
}