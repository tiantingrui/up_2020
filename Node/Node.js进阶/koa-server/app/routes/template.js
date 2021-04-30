const Router = require('koa-router')
const templateController = require('../controllers/template')
const router = new Router()

router.prefix('/xhr/v2')

router.get('templates', templateController.templates)
router.get('template/:id', templateController.template)
router.post('template', templateController.addTemplate)
router.put('template/:id', templateController.putTemplate)
router.delete('template/:id', templateController.delTemplate)

module.exports = router