const router = require("express").Router();

const {
  getImage,
  getImages,
  setImage,
  updateImage,
  deleteImage,
} = require("../controller/images");

//image REST API routes
router.route("/").get(getImages).post(setImage);
router.route("/:id").get(getImage).put(updateImage).delete(deleteImage);

module.exports = router;
