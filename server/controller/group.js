const asyncHandler = require("express-async-handler")
const Group = require("../models/group")


/**
 * - Method GET
 * - Retrieve all groups
 * @function getGroups
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const getGroups = asyncHandler(async (req, res) => {
  const groups = await Group.find();

  res.status(200).json(groups);
});




/**
 * - Method POST
 * - Add a group to Groups collection.
 * @function setGroup
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const setGroup = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Group title is required!");
  }

  const group = await Group.create({
    title: req.body.title,
    description: req.body.description,
    tiles: req.body.tiles
  });

  res.status(200).json(group);
});


/**
 * - Method PUT
 * - Update a group from Groups collection.
 * @function updateGroup
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const updateGroup = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.id);

  if (!group) {
    res.status(400);
    throw new Error("Group not found!");
  }

  const updatedGroup = await Group.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGroup);
});



/**
 * - Method DELETE
 * - Delete a group from Group collection.
 * @function deleteTile
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
 const deleteGroup = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.id);

  if (!group) {
    res.status(400);
    throw new Error("Group not found!");
  }

  const deletedGroup = await Group.findByIdAndDelete(req.params.id, req.body);

  res.status(200).json(deletedGroup);
});


module.exports = {
  getGroups,
  setGroup,
  updateGroup,
  deleteGroup
}