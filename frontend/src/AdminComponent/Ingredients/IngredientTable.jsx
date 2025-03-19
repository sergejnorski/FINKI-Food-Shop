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
import {Create} from "@mui/icons-material";

const orders = [1, 1, 1, 1, 1, 1, 1]

export const IngredientTable = () => {
  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader action={<IconButton aria-label="settings"><Create/></IconButton>}
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
    </Box>
  )
}