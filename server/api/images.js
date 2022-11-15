const router = require("express").Router();
const asyncHandler = require('express-async-handler')



const {
  getImage,
  getImages,
  setImage,
  updateImage,
  deleteImage,
} = require("../controller/images");

router.route("/").get(getImages).post(setImage)
router.route("/:id").get(getImage).put(updateImage).delete(deleteImage)


module.exports = router