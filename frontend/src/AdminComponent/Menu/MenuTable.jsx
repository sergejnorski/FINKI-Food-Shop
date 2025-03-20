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

const orders = [1, 1, 1, 1, 1, 1, 1]

export const MenuTable = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader action={<IconButton onClick={() => navigate("/admin/restaurant/add-menu")} aria-label="settings"><Create/></IconButton>} title={"Menu"}
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
              {orders.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell component="th" scope="row">{1}</TableCell>
                  <TableCell align="right">{"slika"}</TableCell>
                  <TableCell align="right">{"asdfasd@asdf.com"}</TableCell>
                  <TableCell align="right">{"500 denara"}</TableCell>
                  <TableCell align="right">{"pizza"}</TableCell>
                  <TableCell align="right"><IconButton><Delete/></IconButton></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}