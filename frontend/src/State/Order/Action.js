import {api} from "../../component/config/api";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS, GET_USERS_ORDERS_FAILURE,
  GET_USERS_ORDERS_REQUEST,
  GET_USERS_ORDERS_SUCCESS
} from "./ActionType";

export const createOrder = (reqData) => {
  return async (dispatch) => {
    dispatch({type: CREATE_ORDER_REQUEST});
    try {
      const {data} = await api.post('/api/order/create', {
        deliveryAddress: reqData.order.deliveryAddress,
        restaurantId: reqData.order.restaurantId,
        total: reqData.total
      }, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
      dispatch({type: CREATE_ORDER_SUCCESS, payload: data});
    } catch (error) {
      console.error("error ", error);
      dispatch({type: CREATE_ORDER_FAILURE, payload: error});
    }
  };
};


export const getUsersOrders = (jwt) => {
  return async (dispatch) => {
    dispatch({type: GET_USERS_ORDERS_REQUEST});
    try {
      const {data} = await api.get('/api/order/user', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({type: GET_USERS_ORDERS_SUCCESS, payload: data});
    } catch (error) {
      console.error("error ", error);
      dispatch({type: GET_USERS_ORDERS_FAILURE, payload: error});
    }
  }
}
