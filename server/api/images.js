const router = require("express").Router();

const {
  getImage,
  getImages,
  setImage,
  updateImage,
  deleteImage,
} = require("../controller/images");
const { isAuth } = require("../middleware/errors");

//image REST API routes
router.route("/").get(isAuth, getImages).post(isAuth, setImage);
router.route("/:id").get(isAuth, getImage).put(isAuth, updateImage).delete(isAuth, deleteImage);

module.exports = router;
