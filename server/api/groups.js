const router = require("express").Router();

const {
  getGroups,
  setGroup,
  updateGroup,
  deleteGroup,
  addTileToGroup,
  getGroup
} = require('../controller/group');
const { isAuth } = require("../middleware/errors");

router.route('/').get(isAuth, getGroups).post(isAuth, setGroup)
router.route('/:id').get(isAuth, getGroup).put(isAuth, updateGroup).delete(isAuth, deleteGroup)
router.route('/:id/tile').put(isAuth, addTileToGroup)

module.exports = router