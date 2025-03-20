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
import React from "react";
import CreateIngredientForm from "./CreateIngredientForm";
import {useDispatch, useSelector} from "react-redux";

const orders = [1, 1, 1, 1, 1, 1, 1];

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

export default function IngredientTable () {

  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  const {restaurant, ingredients} = useSelector(store=>store)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader action={<IconButton onClick={handleOpen} aria-label="settings"><Create/></IconButton>}
                    title={"Ingredients"}
                    sx={{paddingTop: "2rem", alignItems: "center"}}/>
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell component="th" scope="row">{1}</TableCell>
                  <TableCell align="right">{"slika"}</TableCell>
                  <TableCell align="right">{"asdfasd@asdf.com"}</TableCell>
                  <TableCell align="right">{"500 denara"}</TableCell>
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
          <CreateIngredientForm/>
        </Box>
      </Modal>

    </Box>
  );
}