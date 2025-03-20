import {
  Box,
  Card,
  CardHeader, Paper,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

const orders = [1, 1, 1, 1, 1, 1, 1]

export const OrderTable = () => {
  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader title={"All Orders"} sx={{paddingTop: "2rem", alignItems: "center"}}/>
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Ingredients</TableCell>
                <TableCell align="right">Status</TableCell>
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
                  <TableCell align="right">{"brasno, testo, rukola"}</TableCell>
                  <TableCell align="right">{"completed"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}