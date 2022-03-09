const express = require('express')
const router = express.Router()
const modelo = require('../controler/controler')
const modelo_admin = require('../controler/controler_admin')
const {validar_session} = require('../controler/controler_admin')

router.get('/', modelo.main)
router.get('/producto/:id', modelo.producto)
router.get('/contacto', modelo.contacto)
router.get('/servicios',modelo.servicios)
router.get('/nuevo',modelo.buscar_nuevo)
router.get('/carrito',modelo.carrito)
router.post('/carrito',modelo.carrito_post)

router.get('/admin/',validar_session,modelo_admin.main)
router.get('/admin/consultar',validar_session,modelo_admin.consultar)
router.get('/admin/add',validar_session,modelo_admin.add)
router.get('/admin/update/:id',validar_session,modelo_admin.update)
router.post('/admin/',modelo_admin.login)
router.post('/admin/add',validar_session,modelo_admin.add_post)
router.post('/admin/update/:id',validar_session,modelo_admin.update_post)
router.delete('/admin/',validar_session,modelo_admin.delete)

module.exports = router