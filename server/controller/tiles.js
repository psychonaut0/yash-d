const asyncHandler = require("express-async-handler");
const Tile = require("../models/tile");


/**
 * - Method GET
 * - Retrieve all tiles from Tiles collection.
 * @function getTiles
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const getTiles = asyncHandler(async (req, res) => {
  const tiles = await Tile.find();

  res.status(200).json(tiles);
});


/**
 * - Method POST
 * - Add a tile to Tiles collection.
 * @function setTile
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const setTile = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Tile title is required!");
  }

  const tile = await Tile.create({
    title: req.body.title,
    description: req.body.description,
    localUrl: req.body.localUrl,
    remoteUrl: req.body.remoteUrl,
    image: req.body.image
  });
  res.status(200).json(tile);
});

/**
 * - Method PUT
 * - Update a tile from Tiles collection.
 * @function updateTile
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const updateTile = asyncHandler(async (req, res) => {
  const tile = await Tile.findById(req.params.id);

  if (!tile) {
    res.status(400);
    throw new Error("Tile not found!");
  }

  const updatedTile = await Tile.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTile);
});

/**
 * - Method DELETE
 * - Delete a tile from Tiles collection.
 * @function deleteTile
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const deleteTile = asyncHandler(async (req, res) => {
  const tile = await Tile.findById(req.params.id);

  if (!tile) {
    res.status(400);
    throw new Error("Tile not found!");
  }

  const deletedTile = await Tile.findByIdAndDelete(req.params.id, req.body);

  res.status(200).json(deletedTile);
});

module.exports = {
  getTiles,
  setTile,
  updateTile,
  deleteTile,
};
