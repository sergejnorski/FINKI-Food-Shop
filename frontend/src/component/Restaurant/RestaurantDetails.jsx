import { Divider, FormControl, FormControlLabel, Grid, Grid2, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuCard from './MenuCard';
const categories =[
    "Пици",
    "Бургери",
    "Видови на месо",
    "Паста",
    "Видови на ориз"
]
const foodTypes=[
    {label:"Сите",value:"all"},
    {label:"Вегетеријанско",value:"vegeterian"},
    {label:"Не-Вегетеријанско",value:"non_vegetarian"},
    {label:"Сезонски",value:"seasonal"}
]

const menu=[1,1,1,1,1,1,1]

const RestaurantDetails = () =>{
    const [foodType,setFoodType]=useState("all")

    const handleFilter=(e)=>{
        console.log(e.target.value,e.target.name)
    }
    return (
        <div className='px-5 lg:px-20'>
            <section>
                <h3 className='text-gray-500 py-2 mt-10'>Познати ресторани</h3>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <img className='w-full h-[40vh] object-cover' src="https://cdn.pixabay.com/photo/2020/09/17/12/41/cafe-5579069_640.jpg" alt="" />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img className='w-full h-[40vh] object-cover' src="https://cdn.pixabay.com/photo/2022/11/14/10/37/chinese-lanterns-7591296_640.jpg" alt="" />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img className='w-full h-[40vh] object-cover' src="https://cdn.pixabay.com/photo/2017/07/31/11/22/man-2557408_640.jpg" alt="" />
                        </Grid>
                    </Grid>
                </div>
                <div className='pt-3 pb-5'>
                    <h1 className='text-4xl font-semibold'>Помодоро</h1>
                    <p className='text-gray-500 mt-1'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque reprehenderit eum officiis voluptatum ex, eos impedit inventore ad architecto laudantium ipsam eius quae culpa minima totam. Unde, in? Dolorem, quas.</p>
                    <div className="space-y-3 mt-3">
                    <p className='text-gray-500 flex items-center gap-3'>
                        <LocationOnIcon/>
                        <span>
                        Куманово
                        </span>
                    </p>
                    <p className='text-gray-500 flex items-center gap-3'>
                        <CalendarMonthIcon/>
                        <span>
                        Понеделник-Петок: 9:00 - 23:00
                        </span>
                    </p>
                    </div>
                </div>
            </section>
            <Divider/>
            <section className='pt-[2rem] lg:flex relative'>
                    <div className='space-y-10 lg:w-[20%] filter'>
                        <div className='box space-y-5 lg:sticky top-28 '>
                            <div>
                                <Typography variant='h5' sx={{paddingBottom:"1rem"}}>
                                    Тип на храна
                                </Typography>
                                <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                    <RadioGroup onChange={handleFilter} name='food_type' value={foodType}>
                                        {foodTypes.map((item)=> (   <FormControlLabel
                                        key={item.value}
                                        value={item.value} control={<Radio />} label={item.label} />))}
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <Divider/>

                            <div>
                                <Typography variant='h5' sx={{paddingBottom:"1rem"}}>
                                    Категорија
                                </Typography>
                                <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                    <RadioGroup onChange={handleFilter} name='food_type' value={foodType}>
                                        {categories.map((item)=>    (<FormControlLabel
                                        key={item}
                                        value={item} control={<Radio />} label={item} />))}
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className='space-y-5 lg:w-[80%] lg:pl-10'>
                        {menu.map((item)=><MenuCard/>)}
                    </div>
            </section>
        </div>
    )
}
export default RestaurantDetails
