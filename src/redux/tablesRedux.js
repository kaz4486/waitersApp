import { API_URL } from '../config/config.js';

//selectors
export const getAllTables = (state) => state.tables;
export const getTableById = ({ tables }, tableId) =>
  tables.find((table) => table.id === tableId);

//action names
const createActionName = (name) => `app/tables/${name}`;
const GET_TABLES = createActionName('GET_TABLES');
const UPDATE_TABLES = createActionName('UPDATE_TABLES');

// action creators
export const getTables = (payload) => ({ type: GET_TABLES, payload });
export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });

export const fetchTables = (setPending) => {
  setPending(true);
  return (dispatch) => {
    fetch(`${API_URL}/tables`)
      .then((res) => res.json())
      .then((tables) => {
        dispatch(getTables(tables));
        setPending(false);
      });
  };
};
export const patchTable = (id, { ...tableData }) => {
  return (dispatch) => {
    const options = {
      method: 'PATCH',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        id: id,
        status: tableData.status,
        people: tableData.people,
        maxPeople: tableData.maxPeople,
        bill: tableData.bill,
      }),
    };
    fetch(`${API_URL}/tables/${id}`, options)
      .then((res) => res.json())
      .then((tables) => dispatch(updateTables(tables)));
  };
};

const tablesReducer = (statePart = [], action) => {
  console.log(action);
  switch (action.type) {
    case GET_TABLES:
      return [...action.payload];
    case UPDATE_TABLES:
      return statePart.map((table) =>
        table.id === action.payload.id ? { ...action.payload } : table
      );
    default:
      return statePart;
  }
};

export default tablesReducer;
