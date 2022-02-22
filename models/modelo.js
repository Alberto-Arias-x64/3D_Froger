require('dotenv').config({path:'../.env'})
const mysql = require('mysql')


db2 = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "compani"
})
db2.getConnection(function (error){
    if(error){console.log(error)}
    else{console.log("base local ok")}
})

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
            db2.query('INSERT INTO articulos(nombre,precio,stock,categoria,descripcion,imagen)VALUES(?,?,?,?,?,?)',[datos.nombre,datos.precio,datos.stock,datos.categoria,datos.descripcion,datos.url],(err)=>{
                if(!err){
                    resolve({"mensaje":"ok"})
                }
                else{
                    resolve({"mensaje":"error"})
                    console.error(err)
                }
            })
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
            db2.query("UPDATE articulos SET nombre=?,precio=?,stock=?,categoria=?,descripcion=?,imagen=? WHERE id = ? ",[datos.nombre,datos.precio,datos.stock,datos.categoria,datos.descripcion,datos.url,id],(err,res)=>{
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