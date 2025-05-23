import {
  Box,
  Card,
  CardHeader, IconButton, Modal, Paper,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import {Create} from "@mui/icons-material";
import CreateFoodCategoryForm from "./CreateFoodCategoryForm";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRestaurantsCategory} from "../../State/Restaurant/Action";
import {fetchRestaurantsOrder} from "../../State/RestaurantOrder/Action";
import CreateIcon from '@mui/icons-material/Create';


export const FoodCategoryTable = () => {

  const {restaurant} = useSelector((store) => store);
  const jwt=localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const restaurantId = restaurant.usersRestaurant?.id;
  useEffect(() => {
    dispatch(
        getRestaurantsCategory({
          jwt,
          restaurantId: restaurant.usersRestaurant?.id,
        })
    );

  }, []);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <Box>
      <Card className='mt-1'>
      <CardHeader
                    title={"Категории"}
                    sx={{ pt: 2, alignItems: "center" }}
                    action={
                        <IconButton onClick={handleOpen} >
                            <CreateIcon />
                        </IconButton>

                    }
                />
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Број</TableCell>
                <TableCell align="left">Име</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurant?.categories?.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell component="th" scope="row">{item.id}</TableCell>
                  <TableCell align="left">{item.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateFoodCategoryForm handleClose={handleClose}/>
        </Box>
      </Modal>
    </Box>
  );
}