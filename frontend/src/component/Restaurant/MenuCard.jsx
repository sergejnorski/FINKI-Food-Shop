import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const demo = [
    {
        category: "Nuts & seeds",
        ingredients: ["Cashews"]
    },
    {
        category: "Protein",
        ingredients: ["Ground Beef", "Bacon strips"]
    },
]

const MenuCard = () => {
    const handleCheckboxChange=(value)=>{
        console.log("value")
    }
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography component="span">
                    <div className='lg:flex items-center justify-between'>
                        <div className='lg:flex items-center lg:gap-5'>
                            <img className='w-[7rem] h-[7rem] object-cover' src="https://cdn.pixabay.com/photo/2023/09/25/22/08/ai-generated-8276129_640.jpg" alt="" />
                            <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
                                <p className='font-semibold text-xl'>Бургер</p>
                                <p>300 Ден</p>
                                <p className='text-gray-400'>Бургер е сендвич кој се состои од печено или пржено пиво, обично направено од говедско, пилешко или алтернативи од растително месо, сервирано во тацна со додатоци како зелена салата, домат, сирење и сосови.</p>
                            </div>
                        </div>
                    </div>
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <form>
                    <div className='flex gap-5 flex-wrap'>
                        {demo.map((item) =>(
                                <div>
                                    <p>{item.category}</p>
                                    <FormGroup>
                                        {item.ingredients.map((item) =>( <FormControlLabel control={<Checkbox onChange={()=>handleCheckboxChange(item)} />} label={item} />))}

                                    </FormGroup>
                                </div>
                         ))}
                    </div>
                    <div className='pt-5'>
                        <Button variant='contained' disabled={false} type='submit'>{true?"Add to Cart":"Out Of Stock"}</Button>
                    </div>
                </form>
            </AccordionDetails>
        </Accordion>
    )
}
export default MenuCard