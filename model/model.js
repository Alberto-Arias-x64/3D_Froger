const mysql = require('mysql')
require('dotenv').config({path:'../.env'})

db2 = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})
db2.getConnection(function (error){
    if(error){console.log(error)}
    else{console.log("base local ok")}
})
db2.query(`CREATE TABLE IF NOT EXISTS articulos(
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    precio INT NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    stock INT NOT NULL, 
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    descripcion TEXT,
    imagen VARCHAR(255)
)`)
db2.query(`CREATE TABLE IF NOT EXISTS categorias(
    categoria VARCHAR(50) NOT NULL
)`)

exports.db = new function() {
    this.categorias = () =>{
        return new Promise ((resolve,reject) =>{
            db2.query('SELECT * FROM categorias ORDER BY categoria',(err,res) =>{
                if(!err){
                    resolve(res)
                }
            })
        })
    }
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
    /* this.consultar_unico = async id =>{
        let respuesta
        db2.query('SELECT * FROM articulos WHERE id = ?',[id],(err,rows) =>{
            if(!err){
                console.log("smo")
                respuesta = rows[0]
            }
            else{
                respuesta = {"mensaje":"no"}
            }
        } 
        return(respuesta)
    } */
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
    this.modificar_stock_dato = function(id,stock){
        return new Promise((resolve,reject)=>{
            db2.query("UPDATE articulos SET stock= stock - ? WHERE id = ? ",[stock,id],(err,res)=>{
                if(!err){
                    resolve({"mensaje":"ok"})
                }else{
                    resolve({"mensaje":"error"})
                }
            })
        })
    }
    this.consultar_nuevo = () =>{
        return new Promise ((resolve, reject)=>{
            db2.query('SELECT id,nombre,precio,imagen FROM articulos WHERE stock != 0 ORDER BY fecha DESC LIMIT 12',(err,res)=>{
                if(!err){
                    resolve(res)
                }
                else{
                    resolve({mensaje:"no"})
                }
            })
        })
    }
    this.consultar_categoria = categoria =>{
        return new Promise ((resolve,reject) =>{
            db2.query('SELECT id,nombre,precio,imagen FROM articulos WHERE categoria = ? LIMIT 40;',[categoria],(err,rows) =>{
                if(!err){
                    resolve(rows)
                }
                else{
                    resolve({mensaje:"error"})
                }
            })
        })
    }
}