const router = require("express").Router();

const {
  getGroups,
  setGroup,
  updateGroup,
  deleteGroup,
  addTileToGroup,
  getGroup
} = require('../controller/group')

router.route('/').get(getGroups).post(setGroup)
router.route('/:id').get(getGroup).put(updateGroup).delete(deleteGroup)
router.route('/:id/tile').put(addTileToGroup)

module.exports = router