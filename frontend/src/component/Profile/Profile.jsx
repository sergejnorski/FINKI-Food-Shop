import React, {useState} from 'react'
import {ProfileNavigation} from './ProfileNavigation'
import {Route, Routes} from 'react-router-dom';
import UserProfile from './UserProfile';
import {Address} from './Address';
import {Orders} from './Orders';
import {Favorites} from './Favorites';
import {Events} from './Events';
import {Navbar} from "../Navbar/Navbar";
import {Divider} from "@mui/material";


const Profile = () => {
  const [openSideBar, setOpenSideBar] = useState(true);

  const handleDrawer = () => {
    setOpenSideBar(!openSideBar);
  };

  return (
    <div>
      <div className='lg:flex-row flex flex-col'>
        <div className="flex mx-auto lg:flex-1 lg:mx-0">
          <div className={`sticky top-0 h-[80vh] lg:w-[20%] ${openSideBar ? "" : "hidden" +
            " lg:block"}`}>
            <ProfileNavigation open={openSideBar}/>
          </div>
          <Divider orientation="vertical" flexItem className="hidden lg:block"/>

          <div className='lg:flex-1'>
            <Routes>
              <Route path='/' element={<UserProfile/>}/>
              <Route path='/orders' element={<Orders/>}/>
              <Route path='/address' element={<Address/>}/>
              <Route path='/favorites' element={<Favorites/>}/>
              <Route path='/events' element={<Events/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile