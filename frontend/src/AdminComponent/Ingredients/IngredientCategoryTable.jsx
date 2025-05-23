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
import CreateIngredientForm from "./CreateIngredientForm";
import React, {useEffect} from "react";
import CreateIngredientCategoryForm from "./CreateIngredientCategoryForm";
import {useDispatch, useSelector} from "react-redux";
import {getIngredientCategory} from "../../State/Ingredients/Action";
import CreateIcon from '@mui/icons-material/Create';



export const IngredientCategoryTable = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const {restaurant, ingredients} = useSelector(store=>store)
  const jwt=localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getIngredientCategory({id: restaurant?.usersRestaurant.id, jwt}))
  }, [])

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

  console.log(ingredients.ingredients)
  return (
    <Box>
      <Card className='mt-1'>
      <CardHeader
                    title={"Категорија за состојки"}
                    sx={{ pt: 2, alignItems: "center" }}
                    action={
                        <IconButton onClick={handleOpen}>
                            <CreateIcon/>
                        </IconButton>

                    }
                />
        </Card>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Број</TableCell>
                <TableCell align="left">Име на категорија</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients?.category?.map((item) => (
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
      

      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateIngredientCategoryForm handleClose={handleClose}/>
        </Box>
      </Modal>

    </Box>
  )
}