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
  let groups = [];

  if (req.query.extended === 'true') {
    groups = await Group
      .find()
      .populate({
        path: 'tiles',
        populate: { path: 'image' }
      })
  }
  else {
    groups = await Group.find()
  }

  res.status(200).json(groups);
});

/**
 * - Method GET
 * - Retrieve a group
 * @function getGroups
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const getGroup = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("id is required to get a group. Please provide an id");
  }

  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400);
    throw new Error("Invalid group id");
  }

  const group = await Group.findById(req.params.id).populate({
    path: 'tiles',
    populate: { path: 'image' }
  })
  
  
  res.status(200).json(group);




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
 * - Method PUT
 * - Update a group from Groups collection.
 * @function updateGroup
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const addTileToGroup = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.id);

  if (!group) {
    res.status(400);
    throw new Error("Group not found!");
  }

  if (!req.body.tileId) {
    res.status(400);
    throw new Error("No field 'tileId' provided, please provide a tileId!");
  }
  group.tiles.push(req.body.tileId)

  await group.save()

  res.status(200).json(group);
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
  getGroup,
  setGroup,
  updateGroup,
  deleteGroup,
  addTileToGroup
}