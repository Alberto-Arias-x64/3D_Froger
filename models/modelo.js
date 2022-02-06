const mysql = require('mysql')

db2 = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'micos64.98'
})
db2.connect(function (error){
    if(error){console.log(error)}
    else{console.log("base local ok")}
})

    db2.query('CREATE DATABASE IF NOT EXISTS company')
    db2.query('USE company')
    db2.query('CREATE TABLE IF NOT EXISTS articulos(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(50) NOT NULL, precio INT NOT NULL, fecha DATE NOT NULL, stock INT NOT NULL, categoria VARCHAR(20) NOT NULL, descripcion VARCHAR(255) NOT NULL, imagen VARCHAR(255) NOT NULL)')

    db2.query('CREATE DATABASE IF NOT EXISTS company')
    db2.query('USE company')
    db2.query('CREATE TABLE IF NOT EXISTS articulos2(nombre VARCHAR(50))')
    
    const db =new function() {
        this.consultar_base = function() {
            db2.query('SELECT * FROM articulos',(err,rows) =>{
                if(!err){
                    return(rows)
                }
                else{
                    console.log(err)
                }
            })
        }
        this.print = function(){
            console.log("ok")
        }
    }
module.exports = db