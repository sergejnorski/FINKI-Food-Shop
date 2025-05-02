import {
  Box,
  Card,
  Button,
  CardHeader, IconButton, Paper,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  useMediaQuery, Typography
} from "@mui/material";
import {Create, Delete} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import {useEffect} from 'react';
import {
  getMenuItemsByRestaurantId,
  deleteFoodAction,
  updateMenuItemsAvailability, getAllMenuItemsByRestaurantId
} from '../../State/Menu/Action'
import {Avatar} from '@mui/material';
import {Chip} from '@mui/material';
import Swal from 'sweetalert2';
import CreateIcon from '@mui/icons-material/Create';

export const MenuTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {restaurant, menu} = useSelector(store => store);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFoodAction({foodId: id, jwt}));
        Swal.fire({
          title: "Deleted!",
          text: "Successfully deleted menu item.",
          icon: "success"
        });
      }
    });
  };


  console.log(menu)

  useEffect(() => {
    dispatch(getAllMenuItemsByRestaurantId({
      restaurantId: restaurant?.usersRestaurant?.id,
      jwt
    }));
  }, [dispatch, restaurant?.usersRestaurant?.id, jwt]);

  const handleUpdateAvailbality = (id) => {

    dispatch(updateMenuItemsAvailability({
      foodId: id,
      jwt
    }));
  }

  const handleNaviagteAddMenuItem = () => {
    if (
      true
    ) {
      navigate("/admin/restaurants/add-menu")
    }
  }


  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader
          title={"Продукти"}
          sx={{pt: 2, alignItems: "center"}}
          action={
            <IconButton onClick={handleNaviagteAddMenuItem}>
              <CreateIcon/>
            </IconButton>
          }
        />
      </Card>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 600}} aria-label="simple table">
          <TableHead>
            <TableRow>
              {!isMobile && <TableCell>Слика</TableCell>}
              <TableCell align="center">Наслов</TableCell>
              <TableCell align="center">Состојки</TableCell>
              <TableCell align="center">Цена</TableCell>
              <TableCell align="center">Достапност</TableCell>
              <TableCell align="center">Избриши</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menu?.menuItems?.map((row) => (
              <TableRow key={row.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                {!isMobile && (
                  <TableCell align="center" component="th" scope="row">
                    <img src={row.images[0]} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }} alt={row.name} />
                  </TableCell>
                )}
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">
                  <div className={isMobile ? 'flex flex-col' : ''} style={{textAlign: 'center'}}>
                    {row.ingredients?.map((item, index) => (
                      <Chip key={index} label={item.name} className='m-1'/>
                    ))}
                  </div>
                </TableCell>
                <TableCell align="center">{row.price} ден.</TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleUpdateAvailbality(row.id)}>
                    {
                      row.available ? <Typography sx={{color: "green"}}>Yes</Typography> : "No"
                    }
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <IconButton color='primary' onClick={() => handleDelete(row.id)}>
                    <DeleteIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}