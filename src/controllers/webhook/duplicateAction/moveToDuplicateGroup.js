const { getAllGroupByBoard, moveItemToGroup, createNewGroup } = require('../../../services/monday-service');

module.exports = async (token, boardId, itemId) => {
  try {
    const groups = await getAllGroupByBoard(token, boardId);

    const regex = /duplicates/i;
    const filteredGroup = groups.filter((grp) => regex.test(grp.title));
    let duplicateGroupId;

    // if duplicate group not exits then create new group
    if (filteredGroup.length === 0) {
      duplicateGroupId = await createNewGroup(token, boardId, 'Duplicates');
    } else {
      duplicateGroupId = filteredGroup[0].id;
    }

    await moveItemToGroup(token, itemId,duplicateGroupId);
  } catch (err) {
    throw err;
  }
};
