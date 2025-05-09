import {
  AdminPanelSettings,
  Category,
  Dashboard,
  Event,
  Fastfood,
  Logout,
  ShoppingBag,
  ShopTwo,
  ArrowBack
} from '@mui/icons-material'
import {Divider, Drawer, useMediaQuery} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../State/Authentication/Action";

const menu = [
  {title: "Почетна", icon: <Dashboard/>, path: "/"},
  {title: "Нарачки", icon: <ShoppingBag/>, path: "/orders"},
  {title: "Продукти", icon: <ShopTwo/>, path: "/menu"},
  {title: "Категории", icon: <Category/>, path: "/category"},
  {title: "Состојки", icon: <Fastfood/>, path: "/ingredients"},
  // {title: "Настани", icon: <Event/>, path: "/event"},
  {title: "Детали", icon: <AdminPanelSettings/>, path: "/details"},
  {title: "Одјава", icon: <Logout/>, path: "/"},
]

export const AdminSideBar = ({handleClose}) => {

  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigate = (item) => {
    navigate(`/admin/restaurants${item.path}`);
    if (item.title === "Одјава") {
      navigate("/");
      dispatch(logout());
      console.log('logout')
      localStorage.removeItem("jwt")
      handleClose();
    }
  }

  return (
    <div>
      <>
        <Drawer
          variant={isSmallScreen ? "temporary" : 'permanent'} onClose={handleClose}
          open={true}
          anchor='left'
          sx={{zIndex: 10}}>
          <div
            className='w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem]'>
            <div className='px-5 flex items-center gap-5 cursor-pointer'
                 onClick={() => navigate('/')}
            >
              <ArrowBack/>
              <span>Назад</span>
            </div>
            <Divider/>
            {
              menu.map((item, i) =>
                <>
                  <div className='px-5 flex items-center gap-5 cursor-pointer'
                       onClick={() => handleNavigate(item)}>
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  {i !== (menu.length - 1) && <Divider/>}
                </>
              )}
          </div>

        </Drawer>
      </>
    </div>
  )
}