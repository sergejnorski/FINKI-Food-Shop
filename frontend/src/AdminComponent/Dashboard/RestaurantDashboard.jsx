import { Grid } from "@mui/material"
import { MenuTable } from "../Menu/MenuTable"
import { OrderTable } from "../Orders/OrderTable"

export const RestaurantDashboard = () => {
  return (
    <div>
      <Grid container >
        <Grid item xs={12} lg={12}>
        <MenuTable/>
        </Grid>
        <Grid item xs={12} lg={12}>
        <OrderTable status={"ALL"}/>
        </Grid>
      </Grid>
    </div>
  )
}