require('dotenv').config({path:'../.env'})
const mysql = require('mysql')

db2 = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
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
    db2.query('CREATE TABLE IF NOT EXISTS articulos2(nombre VARCHAR(50),precio INT)')
    
    const db = new function() {
        this.consultar_base = function() {
            return new Promise ((resolve,reject)=>{
                db2.query('SELECT * FROM articulos2',(err,rows) =>{
                    if(!err){
                        resolve(rows)
                    }
                    else{
                        reject(err)
                    }
                })
            })
        }
        this.consultar_unico = function(id) {
            return new Promise ((resolve,reject)=>{
                db2.query('SELECT * FROM articulos2 WHERE nombre = ?',[id],(err,rows) =>{
                    if(!err){
                        resolve(rows[0])
                    }
                    else{
                        resolve(err)
                    }
                })
            })
        }
        this.añadir_dato = function(datos){
            return new Promise((resolve,reject)=>{
                
            })
        }
    }

module.exports = db