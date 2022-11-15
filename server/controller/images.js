const asyncHandler = require("express-async-handler");
const Image = require("../models/image");
const moment = require("moment");

const fs = require("fs");

//init uploader
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const lastIndex = file.originalname.lastIndexOf(".");
    cb(
      null,
      `${file.originalname.substring(
        0,
        lastIndex
      )}__${moment().format()}${file.originalname.substring(lastIndex)}`
    );
  },
});
const upload = multer({ storage: storage });

/**
 * - Method GET
 * - Retrieve all images from Image collection.
 * @function getImages
 * @description Method GET
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const getImages = asyncHandler(async (req, res) => {
  const images = await Image.find();

  res.status(200).json(images);
});

/**
 * - Method GET
 * - Retrieve an image from Image collection
 * @function getImage
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const getImage = asyncHandler(async (req, res) => {
  if (!req.body.id) {
    res.status(400);
    throw new Error("id is required to get an image. Please provide an id");
  }

  const image = await Image.findById(req.body.id);

  res.status(200).json(image);
});

/**
 * - Method POST
 * - Add an image to Image collection
 * @function getImage
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const setImage = [
  upload.single("image"),
  asyncHandler(async (req, res) => {
    const image = await Image.create({
      sourceUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
      relativeUrl: `/images/${req.file.filename}`,
      filename: req.file.filename,
    });

    res.status(200).json(image);
  }),
];

/**
 * - Method PUT
 * - Update an image to Image collection
 * @function getImage
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const updateImage = asyncHandler(async (req, res) => {
  if (!req.body.filename) {
    res.status(400);
    throw new Error("Filename is required. No filename provided");
  }

  let filename = req.body.filename;

  const lastIndex = filename.lastIndexOf(".");

  const image = await Image.findById(req.params.id);

  if (lastIndex === -1) {
    filename = `${filename}${image.filename.substring(
      image.filename.lastIndexOf(".")
    )}`;
  }

  fs.rename(
    `public/images/${image.filename}`,
    `public/images/${filename}`,
    () => {
      console.log("file renamed!");
    }
  );

  image.filename = filename;
  image.sourceUrl = `${req.protocol}://${req.get("host")}/images/${filename}`;
  image.relativeUrl = `/images/${filename}`;

  await image.save();

  res.status(200).json(image);
});

/**
 * - Method DELETE
 * - Delete an image from Image collection
 * @function getImage
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const deleteImage = asyncHandler(async (req, res) => {
  const image = await Image.findById(req.params.id);

  if (!image) {
    res.status(400);
    throw new Error("Image not found!");
  }

  const deletedTile = await Image.findByIdAndDelete(req.params.id, req.body);

  res.status(200).json(deletedTile);
});

module.exports = {
  getImage,
  getImages,
  setImage,
  updateImage,
  deleteImage,
};
