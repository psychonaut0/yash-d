const router = require("express").Router();

const {
  getGroups,
  setGroup,
  updateGroup,
  deleteGroup
} = require('../controller/group')

router.route('/').get(getGroups).post(setGroup)
router.route('/:id').put(updateGroup).delete(deleteGroup)


module.exports = router