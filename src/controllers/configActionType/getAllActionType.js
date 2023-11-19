const ConfigActionType = require('../../models/configActionType');

module.exports = async (req, res) => {
  try {
    const data = await ConfigActionType.find();
    return res.status(200).send({ status: 'success', data });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
};
