import { initialState } from "./initialState";

/* selectors */
export const getAll = ({posts}) => posts.data;
// eslint-disable-next-line
export const getOne = ({posts}, id) => posts.data.filter(post => post.id == id);
export const isLogged = ({logged}) => logged;
/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');
const EDIT_POST = createActionName('EDIT_POST');
const IS_LOGIN = createActionName('IS_LOGIN');
const IS_LOGOUT = createActionName('IS_LOGOUT');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addPost = payload => ({ payload, type: ADD_POST });
export const editPost = payload => ({ payload, type: EDIT_POST });
export const isLogin = payload => ({ payload, type: IS_LOGIN});
export const isLogout = payload => ({ payload, type: IS_LOGOUT});


/* thunk creators */

/* reducer */
export const reducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }

    case ADD_POST: {
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
      }
    }

    case EDIT_POST: {
      return {
        ...statePart,
        data: statePart.data.map(post => post.id === action.payload.id ? action.payload : post),
      }
    }
   
    case IS_LOGIN: {
      return {
        ...statePart,
        logged: true,
      }
    }

    case IS_LOGOUT: {
      return {
        ...statePart,
        logged: false,
      }
    }
 
    default:
      return statePart;
  }
};
