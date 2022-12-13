const router = require('express').Router()
const { getTiles, setTile, updateTile, deleteTile } = require('../controller/tiles')
const { isAuth } = require('../middleware/errors')

//tiles REST API routes
router.route('/').get(isAuth, getTiles).post(isAuth, setTile)
router.route('/:id').put(isAuth, updateTile).delete(isAuth, deleteTile)

module.exports = router