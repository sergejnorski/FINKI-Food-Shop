import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography
} from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {categorizeIngredients} from "../util/categorizeIngredients";

const MenuCard = ({item}) => {
  const handleCheckboxChange = (value) => {
    console.log("value")
  }
  console.log(item);
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography component="span">
          <div className='lg:flex items-center justify-between'>
            <div className='lg:flex items-center lg:gap-5'>
              <img className='w-[7rem] h-[7rem] object-cover' src={item.images} alt=""/>
              <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
                <p className='font-semibold text-xl'>{item.name}</p>
                <p>{item.price}ден.</p>
                <p className='text-gray-400'>{item.description}</p>
              </div>
            </div>
          </div>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form>
          <div className='flex gap-5 flex-wrap'>
            {Object.keys(categorizeIngredients(item.ingredients)).map((category) => (
              <div>
                <p>{category}</p>
                <FormGroup>
                  {categorizeIngredients(item.ingredients)[category].map((item) => (
                    <FormControlLabel key={item.name} control={<Checkbox onChange={() => handleCheckboxChange(item)}/>}
                                      label={item.name}/>))}

                </FormGroup>
              </div>
            ))}
          </div>
          <div className='pt-5'>
            <Button variant='contained' disabled={false} type='submit'>{true ? "Add to Cart" : "Out Of Stock"}</Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  )
}
export default MenuCard