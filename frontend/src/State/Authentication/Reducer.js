import {
  ADD_ADDRESS_FAILURE,
  ADD_ADDRESS_REQUEST, ADD_ADDRESS_SUCCESS,
  ADD_TO_FAVORITE_FAILURE,
  ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, GET_USER_FAILURE,
  GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS
} from "./ActionType";
import {isPresentInFavorites} from "../../component/config/logic";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
  favorites: [],
  address: [],
  success: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case ADD_TO_FAVORITE_REQUEST:
    case ADD_ADDRESS_REQUEST:
      return {...state, isLoading: true, error: null, success: null};
    case REGISTER_SUCCESS:
      return {...state, isLoading: false, jwt: action.payload, success: "Register Success"};
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwt: action.payload?.jwt,
        success: "Login Success",
        favorites: action.payload?.favorites
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        address: action.payload.addresses,
        favorites: action.payload.favorites,
        success: "Success"
      };
    case ADD_TO_FAVORITE_SUCCESS:
      return {
        ...state, isLoading: false, error: null,
        favorites: isPresentInFavorites(state.favorites, action.payload) ?
          state.favorites.filter((item) => item.id !== action.payload.id) : [action.payload, ...state.favorites]
      };
    case ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        success: "Success",
        address: action.payload.addresses
      }
    case LOGOUT:
      return initialState;
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case ADD_TO_FAVORITE_FAILURE:
    case ADD_ADDRESS_FAILURE:
      return {...state, isLoading: false, error: action.payload, success: null};
    default:
      return state;
  }
}