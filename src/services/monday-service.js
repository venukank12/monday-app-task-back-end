const initMondayClient = require('monday-sdk-js');

const getColumnValue = async (token, itemId, columnId) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

    const query = `query($itemId: [Int], $columnId: [String]) {
        items (ids: $itemId) {
          column_values(ids:$columnId) {
            value
          }
        }
      }`;
    const variables = { columnId, itemId };

    const response = await mondayClient.api(query, { variables });
    return response.data.items?.[0].column_values?.[0]?.value;
  } catch (err) {
    console.error(err);
  }
};

const getItemsByColumnValue = async (token, boardId, columnId, columnValue) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

    const query = `query items_by_column_values($boardId:Int!, $columnId: String!, $columnValue:String! ) {
      items_by_column_values (board_id: $boardId, column_id: $columnId, column_value: $columnValue) {
        id
        name
      }
    }`;
    const variables = { boardId, columnId, columnValue };

    const response = await mondayClient.api(query, { variables });
    return response.data.items_by_column_values;
  } catch (err) {
    console.error(err);
  }
};

const changeColumnValue = async (token, boardId, itemId, columnId, value) => {
  try {
    const mondayClient = initMondayClient({ token });

    const query = `mutation change_column_value($boardId: Int!, $itemId: Int!, $columnId: String!, $value: JSON!) {
        change_column_value(board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
          id
        }
      }
      `;
    const variables = { boardId, columnId, itemId, value };

    const response = await mondayClient.api(query, { variables });
    return response;
  } catch (err) {
    console.error(err);
  }
};

const changeToDuplicateStatus = async (token, boardId, itemId) => {
  try {
    const mondayClient = initMondayClient({ token });

    const query = `mutation change_multiple_column_values($boardId: Int!, $itemId: Int!, $columnValues: JSON!) {
      change_multiple_column_values(item_id:$itemId, board_id:$boardId, column_values: $columnValues, create_labels_if_missing:true) {
        id
      }
    }`;

    const variables = {
      boardId,
      itemId,
      columnValues: JSON.stringify({
        status: {
          label: 'Duplicate',
        },
      }),
    };

    const response = await mondayClient.api(query, { variables });
    return response;
  } catch (err) {
    console.error(err);
  }
};

const moveItemToGroup = async (token, itemId, groupId) => {
  try {
    const mondayClient = initMondayClient({ token });

    const query = `mutation move_item_to_group($itemId : Int, $groupId : String!) {
      move_item_to_group (item_id: $itemId, group_id: $groupId) {
        id
      }
    }`;

    const variables = { itemId, groupId };

    return await mondayClient.api(query, { variables });
  } catch (err) {
    console.error(err);
  }
};

const createNewGroup = async (token, boardId, groupName) => {
  try {
    const mondayClient = initMondayClient({ token });

    const query = `mutation create_group($boardId:Int!, $groupName:String!) {
      create_group (board_id: $boardId, group_name: $groupName) {
        id
      }
    }`;

    const variables = { boardId, groupName };

    const res = await mondayClient.api(query, { variables });
    return res.data.create_group.id;
  } catch (err) {
    console.error(err);
  }
};

const getAllGroupByBoard = async (token, boardId) => {
  try {
    const mondayClient = initMondayClient({ token });

    const query = `query get_groups($boardId:[Int]) {
      boards (ids: $boardId) {
        groups {
          title
          id
        }
      }
    }`;

    const variables = { boardId };

    const res = await mondayClient.api(query, { variables });
    return res.data.boards?.[0]?.groups;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getColumnValue,
  getItemsByColumnValue,
  changeColumnValue,
  changeToDuplicateStatus,
  moveItemToGroup,
  createNewGroup,
  getAllGroupByBoard,
};
