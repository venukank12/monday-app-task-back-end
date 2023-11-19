const Configuration = require('../../models/configuration');

module.exports = async (req, res) => {
  try {
    const { userId, boardId, configType, configField, configActionType } = req.body;
    const data = await Configuration.findOneAndUpdate(
      {
        userId,
        boardId,
        configType,
      },
      {
        userId,
        boardId,
        configType,
        configField,
        configActionType,
      },
      {
        new: true, // Return the modified document instead of the original
        upsert: true, // Create the document if it doesn't exist
      }
    );
    return res.status(200).send({ status: 'success', data });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
};
