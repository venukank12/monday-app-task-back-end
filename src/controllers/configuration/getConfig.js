const Configuration = require('../../models/configuration');

module.exports = async (req, res) => {
  try {
    const { userId, boardId, configType } = req.body;
    const data = await Configuration.findOne({ userId, boardId, configType });
    return res.status(200).send({ status: 'success', data });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
};
