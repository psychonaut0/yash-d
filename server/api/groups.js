const router = require("express").Router();

const {
  getGroups,
  setGroup,
  updateGroup,
  deleteGroup,
  addTileToGroup
} = require('../controller/group')

router.route('/').get(getGroups).post(setGroup)
router.route('/:id').put(updateGroup).delete(deleteGroup)
router.route('/:id/tile').put(addTileToGroup)

module.exports = router