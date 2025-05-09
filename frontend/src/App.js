import './App.css';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {darkTheme} from './Theme/DarkTheme';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "./State/Authentication/Action";
import {findCart} from "./State/Cart/Action";
import {Routers} from "./component/Routers/Routers";
import {
  getAllEvents,
  getAllFoods,
  getAllRestaurantsAction,
  getRestaurantByUserId
} from "./State/Restaurant/Action";

function App() {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {auth} = useSelector(store => store);

  useEffect(() => {
    Promise.resolve().then(() => {
      const token = auth.jwt || jwt;

      if (token) {
        dispatch(getUser(token));
        dispatch(getRestaurantByUserId(token));
        dispatch(findCart(token));
        dispatch(getAllEvents(token));
      }

      dispatch(getAllRestaurantsAction());
      dispatch(getAllFoods());
    });
  }, [auth.jwt, dispatch, jwt]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Routers/>
    </ThemeProvider>
  );
}

export default App;
