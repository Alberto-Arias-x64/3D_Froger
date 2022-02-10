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
    
    const db = new function() {
        this.consultar_base = function() {
            return new Promise ((resolve,reject)=>{
                db2.query('SELECT * FROM articulos',(err,rows) =>{
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
                db2.query('SELECT * FROM articulos WHERE id = ?',[id],(err,rows) =>{
                    if(!err){
                        resolve(rows[0])
                    }
                    else{
                        resolve({"mensaje":"no"})
                    }
                })
            })
        }
        this.añadir_dato = function(datos){
            return new Promise((resolve,reject)=>{
                let fecha = new Date()
                fecha = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()}`
                if(datos.password == process.env.FETCH_PASSWORD){
                    db2.query('INSERT INTO articulos(nombre,precio,fecha,stock,categoria,descripcion,imagen)VALUES(?,?,?,?,?,?,?)',[datos.nombre,datos.precio,fecha,datos.stock,datos.categoria,datos.descripcion,datos.url],(err)=>{
                        if(!err){
                            resolve({"mensaje":"ok"})
                        }
                        else{
                            resolve({"mensaje":"error en db"})
                        }
                    })
                }
                else{
                    resolve({"mensaje":"no"})
                }
            })
        }
        this.eliminar_dato = function(id){
            return new Promise  ((resolve,reject)=>{
                db2.query("DELETE FROM articulos WHERE id = ?",[id],err=>{
                    if(!err){
                        resolve({"mensaje":"ok"})
                    }
                    else{
                        resolve({"mensaje":"error"})
                    }
                })
            })
        }
        this.modificar_dato = function(id,datos){
            return new Promise((resolve,reject)=>{
                db2.query("UPDATE articulos SET nombre=?,precio=?,fecha=?,stock=?,categoria=?,descripcion=?,imagen=? WHERE id = ? ",[datos.nombre,datos.precio,fecha,datos.stock,datos.categoria,datos.descripcion,datos.url,id],(err,res)=>{
                    if(!err){
                        resolve({"mensaje":"ok"})
                    }else{
                        resolve({"mensaje":"error"})
                    }
                })
            })
        }
    }

module.exports = db