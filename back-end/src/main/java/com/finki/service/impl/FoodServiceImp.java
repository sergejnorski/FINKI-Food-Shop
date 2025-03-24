package com.finki.service.impl;

import com.finki.model.Category;
import com.finki.model.Food;
import com.finki.model.Restaurant;
import com.finki.repository.FoodRepository;
import com.finki.repository.RestaurantRepository;
import com.finki.request.CreateFoodRequest;
import com.finki.service.FoodService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodServiceImp implements FoodService {

    private final FoodRepository foodRepository;
    private final RestaurantRepository restaurantRepository;

    public FoodServiceImp(FoodRepository foodRepository, RestaurantRepository restaurantRepository) {
        this.foodRepository = foodRepository;
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant) {

        Food food = new Food();

        food.setFoodCategory(category);
        food.setRestaurant(restaurant);
        food.setDescription(req.getDescription());
        food.setImages(req.getImage());
        food.setName(req.getName());
        food.setPrice(req.getPrice());
        food.setIngredients(req.getIngredients());
        food.setSeasonal(req.isSeasional());
        food.setVegetarian(req.isVegetarin());
        food.setCreationDate(new Date());
        food.setAvailable(true);

        Food savedFood =  foodRepository.save(food);
        restaurant.getFoods().add(savedFood);
        restaurantRepository.save(restaurant);

        return savedFood;
    }

    @Override
    public void deleteFood(Long foodId) throws Exception {

        Food food = findFoodById(foodId);
        food.setRestaurant(null);
        foodRepository.save(food);

    }

    @Override
    public List<Food> getRestaurantFood(Long restaurantId,
                                        boolean isVegetarian,
                                        boolean isNonVeg,
                                        boolean isSeasonal,
                                        String foodCategory)
    {

        List<Food> foods =foodRepository.findByRestaurantId(restaurantId);

        if(isVegetarian){
            foods=filterByVeg(foods);
        }
        if(isNonVeg){
            foods=filterByNonVeg(foods);
        }
        if(isSeasonal){
            foods=filterBySeasonal(foods);
        }

        if(foodCategory.equals("All")){
            return foods;
        }
        else if(!foodCategory.isEmpty()){
            foods=filterByFoodCategory(foods,foodCategory);
        }

        return foods;
    }

    @Override
    public List<Food> getRestaurantAllFood(Long restaurantId) {
        return foodRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    private List<Food> filterByFoodCategory(List<Food> foods, String foodCategory) {

        return foods.stream().filter(food -> {
            if (food.getFoodCategory()!=null){
                return food.getFoodCategory().getName().equals(foodCategory);
            }
            return false;
        }).collect(Collectors.toList());
    }

    private List<Food> filterBySeasonal(List<Food> foods) {
        return foods.stream().filter(Food::isSeasonal).collect(Collectors.toList());
    }

    private List<Food> filterByNonVeg(List<Food> foods) {
        return foods.stream().filter(food -> !food.isVegetarian()).collect(Collectors.toList());
    }

    private List<Food> filterByVeg(List<Food> foods) {
        return foods.stream().filter(Food::isVegetarian).collect(Collectors.toList());
    }


    @Override
    public List<Food> searchFood(String keyword) {

        return foodRepository.searchFood(keyword);
    }

    @Override
    public Food findFoodById(Long foodId) throws Exception {

        Optional <Food> food= foodRepository.findById(foodId);

        if(food.isEmpty()){
            throw new Exception("Food does not exist.");
        }
        return food.get();
    }

    @Override
    public Food updateAvailabilityStatus(Long foodId) throws Exception {

        Food food = findFoodById(foodId);
        food.setAvailable(!food.isAvailable());

        return foodRepository.save(food);

    }
}
