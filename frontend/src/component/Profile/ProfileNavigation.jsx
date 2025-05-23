import React from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import {Divider, Drawer, useMediaQuery} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {logout} from "../../State/Authentication/Action";
import {ArrowBack} from "@mui/icons-material";


const menu = [
  {title: "Нарачки", icon: <ShoppingBagIcon/>, path: "orders"},
  {title: "Омилени маркети", icon: <FavoriteIcon/>, path: "favorites"},
  {title: "Адреса за нарачка", icon: <HomeIcon/>, path: "address"},
  // {title: "Events", icon: <EventIcon/>},
  {title: "Одјава", icon: <LogoutIcon/>}
]
export const ProfileNavigation = ({open, handleClose}) => {
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigate = (item) => {
    if (item.title === "Одјава") {
      dispatch(logout());
      navigate("/");
    } else {
      navigate(`/my-profile/${item.path}`)
    }
  }

  return (
    <div>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        onClose={handleClose}
        open={isSmallScreen ? open : true}
        anchor='left'
        sx={{zIndex: 10}}>
        <div
          className='w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl pt-16 gap-8'>
          <div className='px-5 flex items-center gap-5 cursor-pointer'
               onClick={() => navigate('/')}
          >
            <ArrowBack/>
            <span>Назад</span>
          </div>
          <Divider/>
          {menu.map((item, i) => <>
            <div onClick={() => handleNavigate(item)}
                 className='px-5 flex items-center space-x-5 cursor-pointer'>
              {item.icon}
              <span>
                        {item.title}
                    </span>
            </div>
            {i !== menu.length - 1 && <Divider/>}
          </>)}
        </div>

      </Drawer>
    </div>
  )
}