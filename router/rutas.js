const express = require('express')
const router = express.Router()
const modelo = require('../controler/controler')
const modelo_admin = require('../controler/controler_admin')

router.get('/', modelo.main)
router.get('/producto/:id', modelo.producto)
router.get('/contacto', modelo.contacto)
router.get('/servicios',modelo.servicios)

router.get('/admin/',modelo_admin.main)
router.get('/admin/consultar',modelo_admin.consultar)
router.get('/admin/add',modelo_admin.add)
router.get('/admin/update/:id',modelo_admin.update)
router.post('/admin/',modelo_admin.login)
router.post('/admin/add',modelo_admin.add_post)
router.post('/admin/update/:id',modelo_admin.update_post)
router.delete('/admin/',modelo_admin.delete)

module.exports = router