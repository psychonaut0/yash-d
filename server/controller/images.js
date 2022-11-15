const asyncHandler = require('express-async-handler')
const Image = require('../models/tile')

const getImages = asyncHandler(async (req, res) => {
  const images = await Image.find();

  res.status(200).json(images)
})

const getImage = asyncHandler(async (req, res) => {

  if(!req.body.id){
    res.status(400)
    throw new Error("id is required to get an image. Please provide an id")
  }

  const image = await Image.findById(req.body.id)


  res.status(200).json(image)
})

const setImage = asyncHandler(async (req, res) => {
  res.status(200).send("WIP")
})

const updateImage = asyncHandler(async (req,res) => {
  res.status(200).send("WIP")
})

const deleteImage = asyncHandler(async (req,res) => {
  res.status(200).send("WIP")
})


module.exports = {
  getImage,
  getImages,
  setImage,
  updateImage,
  deleteImage
}

