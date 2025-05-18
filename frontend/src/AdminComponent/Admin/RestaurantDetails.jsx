import {Button, Card, CardContent, CardHeader, Grid} from "@mui/material";
import {Facebook, Instagram, LinkedIn, Twitter} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {updateRestaurantStatus} from "../../State/Restaurant/Action";

export const RestaurantDetails = () => {

  const {restaurant} = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleRestaurantStatus = () => {
    dispatch(updateRestaurantStatus({
      restaurantId: restaurant?.usersRestaurant?.id,
      jwt: localStorage.getItem("jwt")}))
  }
  console.log("restaurant: ", restaurant)

  return (
    <div className="lg:px-20 px-5 pb-20">
      <div className="py-5 flex justify-center items-center gap-5">
        <h1 className="text-2xl lg:text-7xl text-center font-bold p-5">{restaurant.usersRestaurant?.name}</h1>
        <div>
          <Button
              color={restaurant?.usersRestaurant?.open ? 'primary' : 'green'}
              className='py-[1rem] px-[2rem]'
              variant='contained'
              onClick={handleRestaurantStatus}
              size='large'
          >
            {restaurant?.usersRestaurant?.open ? "Затвори" : "Отвори"}
          </Button>
        </div>
      </div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card className='w-full'>
            <CardHeader title={<span className='text-gray-300'>Ресторан</span>} />
            <CardContent className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-48">Власник</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant?.usersRestaurant?.owner?.fullName}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Име на ресторанот</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant?.usersRestaurant?.name}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Тип на продавница</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant?.usersRestaurant?.cuisineType}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Работни часови</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant?.usersRestaurant?.openingHours}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Статус</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant?.usersRestaurant?.open? <span className='px-5 py-2 rounded-full bg-green-400 text-gray-950'>Open</span> :
                      <span className='px-5 py-2 rounded-full bg-red-400 text-gray-950'>Closed</span>}
                  </p>
                </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<span className='text-gray-300'>Адреса</span>} />
            <CardContent className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-48">Држава</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>Македонија
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Град</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>{restaurant?.usersRestaurant?.address.city}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Адреса</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>{restaurant?.usersRestaurant?.address.streetAddress}
                  </p>
                </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<span className='text-gray-300'>Контакт</span>} />
            <CardContent className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-48">Е-маил</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant?.usersRestaurant?.contactInformation.email}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Телефонски број</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant?.usersRestaurant?.contactInformation.mobile}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Социјални мрежи</p>
                  <div className='flex items-center pb-3 gap-2'>
                    <span className='pr-5'>-</span>
                    <a href={restaurant?.usersRestaurant?.contactInformation?.instagram}><Instagram sx={{fontSize: '2rem'}}/></a>
                    <a href={restaurant?.usersRestaurant?.contactInformation?.twitter}><Twitter sx={{fontSize: '2rem'}}/></a>
                  </div>
                </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}