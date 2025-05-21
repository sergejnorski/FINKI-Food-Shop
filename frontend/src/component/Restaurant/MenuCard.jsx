import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  FormGroup,
  Typography
} from '@mui/material'
import React, {useEffect, useState} from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {categorizeIngredients} from "../util/categorizeIngredients";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart} from "../../State/Cart/Action";
import {useNavigate} from "react-router-dom";

const MenuCard = ({item, allItems}) => {
  const navigate = useNavigate();
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showSimilar, setShowSimilar] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [similarItems, setSimilarItems] = useState([]);
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

  useEffect(() => {
    if (expanded) {
      const filtered = allItems?.filter(food =>
        food.foodCategory.name === item.foodCategory.name && food.id !== item.id
      );
      console.log(item.foodCategory);
      console.log(filtered);
      setSimilarItems(filtered);
    }
  }, [expanded, item, allItems]);

  return (
    <>
      <Accordion expanded={expanded} onChange={() => setExpanded(prev => !prev)}>
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
                <div key={category}>
                  <p>{category}</p>
                  <FormGroup>
                    {categorizeIngredients(item.ingredients)[category].map((ing) => (
                      <FormControlLabel
                        key={ing.id}
                        control={<Checkbox onChange={() => handleCheckboxChange(ing.name)}/>}
                        label={ing.name}
                      />
                    ))}
                  </FormGroup>
                </div>
              ))}
            </div>
            <div className='pt-5 flex gap-3'>
              <Button variant='contained' disabled={!item.available} type='submit'>
                {item.available ? "Додај во корпа" : "Нема на залиха"}
              </Button>
              <Button variant='outlined' onClick={() => setShowSimilar(true)}>
                Побарај слични
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>

      <Dialog open={showSimilar} onClose={() => setShowSimilar(false)} fullWidth maxWidth="md">
        <DialogTitle>Слични производи на: {item.name}</DialogTitle>
        <DialogContent>
          {similarItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
              {similarItems.map(similar => {
                const isDifferentMarket = similar?.restaurant?.name !== item.restaurant?.name;
                return (
                  <div key={similar.id} className="border p-3 rounded-md shadow-sm">
                    <img
                      src={similar.images[0]}
                      alt={similar.name}
                      className="w-full h-40 object-cover rounded mb-2"
                    />

                    <div className="flex justify-between items-start">
                      <div className="space-y-1 max-w-[75%]">
                        <Typography variant="h6">{similar.name}</Typography>
                        <Typography variant="body2" className="text-gray-500">{similar.description}</Typography>
                        <Typography variant="body1">{similar.price} ден.</Typography>
                        {isDifferentMarket && <Typography variant="body1" sx={{color: "red"}}>Производот побарајте го во: {similar.restaurant?.name}</Typography>}                      </div>


                    </div>
                  </div>
                );
              })}

            </div>
          ) : (
            <Typography>Нема слични производи достапни.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default MenuCard;
