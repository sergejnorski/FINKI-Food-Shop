import {
  Box,
  Card,
  CardHeader, IconButton, Paper,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import {Create, Delete} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {getMenuItemsByRestaurantId, deleteFoodAction} from '../../State/Menu/Action'
import { Avatar } from '@mui/material';
import { Chip } from '@mui/material';

export const MenuTable = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  const {restaurant,menu} = useSelector((store)=>store);
  useEffect(()=>{
    dispatch(getMenuItemsByRestaurantId({
      jwt,
      restaurantId: restaurant.usersRestaurant.id,
      vegetarian: false,
      nonveg: false,
      seasonal:false,
      foodCategory: "",
    }));
  },[])

  const handleDeleteFood=(foodId)=>{
    dispatch(deleteFoodAction({foodId,jwt}))
  }
  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader action={<IconButton onClick={() => navigate("/admin/restaurants/add-menu")} aria-label="settings"><Create/></IconButton>} title={"Menu"}
                    sx={{paddingTop: "2rem", alignItems: "center"}}/>
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Ingredients</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Availability</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell component="th" scope="row"><Avatar src={item.images[0] || ""}></Avatar></TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">{item.ingredients.map((ingredient)=><Chip label={ingredient.name}></Chip>)}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">{item.available?"in_stoke":"out_of_stoke"}</TableCell>
                  <TableCell align="right"><IconButton color="primary" onClick={()=> handleDeleteFood(item.id)}><Delete/></IconButton></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}