import './App.css';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {darkTheme} from './Theme/DarkTheme';
import {CustomerRoute} from './component/Routers/CustomerRoute';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "./State/Authentication/Action";
import {findCart, getAllCartItems} from "./State/Cart/Action";

function App() {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {auth, cart} = useSelector(store => store);

  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt))
    dispatch(findCart(jwt));
  }, [auth.jwt]);

  useEffect(() => {
    if (!cart.cart?.id) return;
    dispatch(getAllCartItems({ cartId: cart.cart.id, token: jwt }));
  }, [cart.cart?.id]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <CustomerRoute/>
    </ThemeProvider>
  );
}

export default App;
