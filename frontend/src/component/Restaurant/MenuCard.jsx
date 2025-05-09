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
import React, {useState} from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {categorizeIngredients} from "../util/categorizeIngredients";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart} from "../../State/Cart/Action";
import {useNavigate} from "react-router-dom";

const MenuCard = ({item}) => {
  const navigate = useNavigate();
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const dispatch = useDispatch();
  const {auth} = useSelector(store => store);

  const handleCheckboxChange = (itemName) => {
    if (selectedIngredients.includes(itemName)) {
      setSelectedIngredients(selectedIngredients.filter((item) => item !== itemName));
    } else {
      setSelectedIngredients([...selectedIngredients, itemName]);
    }
  }

  const handleAddItemToCart = (e) => {
    e.preventDefault();
    if (!auth.user) {
      navigate('/account/login');
    }
    const reqData = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        foodId: item.id,
        quantity: 1,
        ingredients: selectedIngredients,
      }
    };
    dispatch(addItemToCart(reqData));
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="items-center justify-between lg:flex lg:gap-5">
          <div className="items-center lg:flex ">
            <img
              className="w-[7rem] h-[7rem] object-cover"
              src={item.images[0]}
              alt=""
            />
          </div>
          <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
            <p className="text-xl font-semibold">{item.name}</p>
            <p>{item.price} ден.</p>
            <p className="text-gray-400">{item.description}</p>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleAddItemToCart}>
          <div className='flex gap-5 flex-wrap'>
            {Object.keys(categorizeIngredients(item.ingredients)).map((category) => (
              <div>
                <p>{category}</p>
                <FormGroup>
                  {categorizeIngredients(item.ingredients)[category].map((item) => (
                    <FormControlLabel key={item.id} control={<Checkbox
                      onChange={() => handleCheckboxChange(item.name)}/>}
                                      label={item.name}/>))}

                </FormGroup>
              </div>
            ))}
          </div>
          <div className='pt-5'>
            <Button variant='contained' disabled={!item.available}
                    type='submit'>{item.available ? "Add to Cart" : "Out Of Stock"}</Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  )
}
export default MenuCard