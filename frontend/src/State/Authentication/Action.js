import {
  ADD_ADDRESS_FAILURE,
  ADD_ADDRESS_REQUEST, ADD_ADDRESS_SUCCESS,
  ADD_TO_FAVORITE_FAILURE,
  ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, GET_USER_FAILURE,
  GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS
} from "./ActionType";
import axios from "axios";
import {api, API_URL} from "../../component/config/api";

export const registerUser = (reqData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData);
    if (data.jwt) localStorage.setItem("jwt", data.jwt);
    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
    return true;
  } catch (error) {
    if (error.response?.status === 400 && error.response.data?.message) {
      if (reqData.setErrors) {
        reqData.setErrors({ email: error.response.data.message });
      }
    }
    dispatch({ type: REGISTER_FAILURE, payload: error });
    console.error(error);
    return false;
  }
};


export const loginUser = (reqData) => async (dispatch) => {
  dispatch({type: LOGIN_REQUEST});
  try {
    const {data} = await axios.post(`${API_URL}/auth/signin`, reqData.userData);
    if (data.jwt) localStorage.setItem("jwt", data.jwt);
    if (data.role === "ROLE_RESTAURANT_OWNER") {
      reqData.navigate("/admin/restaurants");
    } else {
      reqData.navigate("/");
    }
    dispatch({type: LOGIN_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: LOGIN_FAILURE, payload: error});
    if (error.response && error.response.status === 400) {
      if (error.response.data && error.response.data.message === "Email does not exist") {
        reqData.setErrorMessage("Е-поштата не постои.");
      } else {
        reqData.setErrorMessage("Неуспешна најава. Обидете се повторно.");
      }
    }
    console.error(error);
  }
}


export const getUser = (jwt) => async (dispatch) => {
  dispatch({type: GET_USER_REQUEST});
  try {
    const {data} = await api.get(`/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    dispatch({type: GET_USER_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: GET_USER_FAILURE, payload: error});
    console.error(error);
  }
}

export const addToFavorite = ({jwt, restaurantId}) => async (dispatch) => {
  dispatch({type: ADD_TO_FAVORITE_REQUEST});
  try {
    const {data} = await api.put(`/api/restaurants/${restaurantId}/add-favorites`, {}, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    dispatch({type: ADD_TO_FAVORITE_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: ADD_TO_FAVORITE_FAILURE, payload: error});
    console.error(error);
  }
}

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("jwt");
    dispatch({type: LOGOUT});
  } catch (error) {
    console.error(error);
  }
}

export const addAddress = (reqData) => async (dispatch) => {
  dispatch({type: ADD_ADDRESS_REQUEST});
  try {
    const {data} = await api.post(`/api/users/address`, reqData.deliveryAddress, {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
      },
    });
    dispatch({type: ADD_ADDRESS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: ADD_ADDRESS_FAILURE, payload: error});
  }
};