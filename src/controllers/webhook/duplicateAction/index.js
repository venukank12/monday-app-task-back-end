const configuration = require('../../../models/configuration');
const Data = require('../../../models/data');
const { getColumnValue } = require('../../../services/monday-service');
const changeToDuplicateStatus = require('./changeToDuplicateStatus');
const moveToDuplicateGroup = require('./moveToDuplicateGroup');

module.exports = async (req, res) => {
  try {
    const { shortLivedToken } = req.session;
    const { inputFields } = req.body.payload;
    const { userId, boardId, itemId, columnId } = inputFields;

    const config = await configuration
      .findOne({
        configType: 'COLUMN_TO_WATCH_DUPLICATE',
        userId,
        boardId,
      })
      .populate('configActionType');

    if (!config) return res.status(200).send({ status: 'false' });

    const columnValue = await getColumnValue(shortLivedToken, itemId, columnId);

    if (!columnValue) return res.status(200).send({ status: 'success!' });

    await Data.findOneAndUpdate(
      {
        userId,
        boardId,
        itemId,
        columnId,
      },
      { userId, boardId, itemId, columnId, itemColumnValues: columnValue },
      {
        new: true, // Return the modified document instead of the original
        upsert: true, // Create the document if it doesn't exist
      }
    );

    const duplicateFound = await getColumnValue(shortLivedToken, itemId, config.configField);

    if (!duplicateFound) return res.status(200).send({ status: 'no duplicates!' });

    switch (config.configActionType.value) {
      case 'CHANGE_TO_DUPLICATE_STATUS':
        changeToDuplicateStatus(shortLivedToken, boardId, itemId);
        break;

      case 'MOVE_TO_DUPLICATE_GROUP':
        moveToDuplicateGroup(shortLivedToken, boardId, itemId);
        break;

      default:
        return res.status(200).send({ status: 'Action not developed yet!' });
    }

    return res.status(200).send({ status: 'success' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
};
