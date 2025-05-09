package com.finki.controller;

import com.finki.model.Food;
import com.finki.model.User;
import com.finki.service.FoodService;
import com.finki.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/food")
public class FoodController {

    private final FoodService foodService;
    private final UserService userService;
    public FoodController(FoodService foodService, UserService userService) {
        this.foodService = foodService;
        this.userService = userService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFood(@RequestParam String name,
                                                 @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        List<Food> food = foodService.searchFood(name);

        return new ResponseEntity<>(food, HttpStatus.OK);
    }

    @GetMapping("/restaurant/all/{restaurantId}")
    public ResponseEntity<List<Food>> getRestaurantFood(@PathVariable Long restaurantId,
                                                        @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        List<Food> foods =foodService.getRestaurantAllFood(restaurantId);

        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Food>> getRestaurantAllFood(@RequestParam (required = false ) Boolean vegetarian,
                                                           @RequestParam (required = false) Boolean seasonal,
                                                           @RequestParam (required = false) Boolean nonVeg,
                                                           @RequestParam(required = false) String food_category,
                                                           @PathVariable Long restaurantId,
                                                           @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        List<Food> foods=new ArrayList<>();

        foods =foodService.getRestaurantFood(restaurantId,vegetarian,nonVeg,seasonal,food_category);

        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Food>> getAllFoods() throws Exception {

        List<Food> foods =foodService.getAllFoods();

        return new ResponseEntity<>(foods, HttpStatus.OK);
    }
}
