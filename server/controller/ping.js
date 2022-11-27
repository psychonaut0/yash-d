

const isOnline = (req, res) => {

  if(!req.query.host){
    res.status(400)
    throw new Error('param `host` is required!')
  }

  const host = req.query.host




}

module.exports = {
  isOnline
}