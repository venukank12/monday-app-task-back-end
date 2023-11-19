const { changeToDuplicateStatus } = require('../../../services/monday-service');

module.exports = async (shortLivedToken, boardId, itemId) => {
  try {
    await changeToDuplicateStatus(shortLivedToken, boardId, itemId);
  } catch (err) {
    throw err;
  }
};
