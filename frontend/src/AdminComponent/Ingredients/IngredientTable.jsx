import {
  Box,
  Button,
  Card,
  CardHeader, IconButton, Modal, Paper,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Typography
} from "@mui/material";
import {Create} from "@mui/icons-material";
import React, {useEffect} from "react";
import CreateIngredientForm from "./CreateIngredientForm";
import {useDispatch, useSelector} from "react-redux";
import {getIngredientsOfRestaurant, updateStockOfIngredient} from "../../State/Ingredients/Action";
import CreateIcon from '@mui/icons-material/Create';


export default function IngredientTable() {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {restaurant, ingredients} = useSelector(store => store)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    dispatch(getIngredientsOfRestaurant({jwt, id: restaurant?.usersRestaurant?.id}));
  }, []);
  const handleUpdateStoke = (id) => {
    dispatch(updateStockOfIngredient({id: id, jwt}));
  }

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
          title={"Состојки"}
          sx={{pt: 2, alignItems: "center"}}
          action={
            <IconButton onClick={handleOpen}>
              <CreateIcon/>
            </IconButton>

          }
        />


      </Card>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Број</TableCell>
              <TableCell align="right">Име</TableCell>
              <TableCell align="right">Категорија</TableCell>
              <TableCell align="right">Достапност</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients?.ingredients?.map((item) => (
              <TableRow
                key={item.id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell align="left">{item.id}</TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">{item.category?.name}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleUpdateStoke(item.id)}>{item.inStock ?
                    <Typography sx={{color: "green"}}>Yes</Typography> : "No"}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateIngredientForm handleClose={handleClose}/>
        </Box>
      </Modal>

    </Box>
  );
}