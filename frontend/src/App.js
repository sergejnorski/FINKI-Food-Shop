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
    console.log("jwt from localStorage:", jwt);
    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(getRestaurantByUserId(jwt));
      dispatch(findCart(jwt));
      dispatch(getAllEvents(jwt));
    }

    dispatch(getAllRestaurantsAction());
    dispatch(getAllFoods());
  }, [dispatch, jwt]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  );
}

export default App;
