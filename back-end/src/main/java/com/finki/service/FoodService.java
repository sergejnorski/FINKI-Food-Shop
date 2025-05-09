package com.finki.service;

import com.finki.model.Category;
import com.finki.model.Food;
import com.finki.model.Restaurant;
import com.finki.request.CreateFoodRequest;

import java.util.List;

public interface FoodService {

    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant);

    void deleteFood(Long foodId) throws Exception;

    public List<Food> getRestaurantFood(Long restaurantId,
                                        boolean isVegetarian ,
                                        boolean isNonVeg,
                                        boolean isSeasonal,
                                        String foodCategory
    );

    public List<Food> getRestaurantAllFood(Long restaurantId);

    List<Food> getAllFoods();

    public  List<Food> searchFood(String keyword);

    public Food findFoodById(Long foodId) throws Exception;

    public Food updateAvailabilityStatus(Long foodId) throws Exception;
}
