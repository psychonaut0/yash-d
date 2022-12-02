const router = require('express').Router()
const { getTiles, setTile, updateTile, deleteTile } = require('../controller/tiles')
const { isAuth } = require('../middleware/errors')

//tiles REST API routes
router.route('/').get(isAuth,getTiles).post(setTile)
router.route('/:id').put(updateTile).delete(deleteTile)

module.exports = router