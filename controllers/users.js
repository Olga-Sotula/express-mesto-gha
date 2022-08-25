const getUsers = (req, res) => {
  res.status(200).send(req.body);
};

const getUserById = (req, res) => {
  const { id } = req.params;
  res.status(200).send(req.body);
};

const createUser = (req, res) => {
  res.status(200).send(req.body);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};