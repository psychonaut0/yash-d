const router = require('express').Router()
const { getTiles, setTile, updateTile, deleteTile } = require('../controller/tiles')

//tiles REST API routes
router.route('/').get(getTiles).post(setTile)
router.route('/:id').put(updateTile).delete(deleteTile)

module.exports = router