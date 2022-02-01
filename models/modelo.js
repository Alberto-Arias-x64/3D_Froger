const mysql = require('mysql')

db2 = mysql.createConnection({
    host: '34.135.120.74', 
    user: 'admin_data',
    password: 'micos64',
    database: 'froger'
})
db2.connect(function (error){
    if(error){console.log(error)}
    else{console.log("base 2 ok")}
})

module.exports = db2