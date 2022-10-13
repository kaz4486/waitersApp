import { API_URL } from '../config/app.js';
import initialState from './initialState.js';

//selectors
export const getAllTables = (state) => state.tables.data;
export const getTableById = ({ tables }, tableId) =>
  tables.data.find((table) => table.id === tableId);
export const getStatuses = (state) => state.tables.status;
// export const getRequest = ({ photos }, name) => photos.requests[name];

//action names
const createActionName = (name) => `app/tables/${name}`;
const GET_TABLES = createActionName('GET_TABLES');
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

// action creators
export const getTables = (payload) => ({ type: GET_TABLES, payload });
export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });
export const fetchStart = (payload) => ({ type: FETCH_START, payload });
export const fetchSuccess = (payload) => ({ type: FETCH_SUCCESS, payload });
export const fetchError = (payload) => ({ type: FETCH_ERROR, payload });

// isLoading, isLoading=false, isLoading=false error
export const fetchTables = () => {
  return (dispatch) => {
    dispatch(fetchStart({ name: GET_TABLES }));
    fetch(`${API_URL}/tables`)
      .then((res) => res.json())
      .then((tables) => {
        console.log(tables);
        dispatch(getTables(tables));
        dispatch(fetchSuccess({ name: GET_TABLES }));
      })
      .catch((err) => {
        dispatch(fetchError({ name: GET_TABLES, err }));
      });
  };
};
export const patchTable = (id, { ...tableData }) => {
  return (dispatch) => {
    dispatch(fetchStart({ name: UPDATE_TABLES }));
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
      .then((tables) => {
        dispatch(updateTables(tables));
        dispatch(fetchSuccess({ name: UPDATE_TABLES }));
      })
      .catch((err) => {
        dispatch(fetchError({ name: UPDATE_TABLES, err }));
      });
  };
};

const tablesReducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case GET_TABLES:
      return { ...statePart, data: [...action.payload] };

    case UPDATE_TABLES:
      return {
        ...statePart,
        data: [
          statePart.data.map((table) =>
            table.id === action.payload.id ? { ...action.payload } : table
          ),
        ],
      };
    case FETCH_START:
      return {
        ...statePart,
        status: { error: null, loading: true, success: false },
      };

    case FETCH_SUCCESS:
      return {
        ...statePart,
        status: { loading: false, error: null, success: true },
      };
    case FETCH_ERROR:
      return {
        ...statePart,
        status: { loading: false, error: action.error, success: false },
      };
    default:
      return statePart;
  }
};

export default tablesReducer;
