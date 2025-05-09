package com.finki.service.impl;

import com.finki.model.Category;
import com.finki.model.Restaurant;
import com.finki.repository.CategoryRepository;
import com.finki.service.CategoryService;
import com.finki.service.RestaurantService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImp implements CategoryService {

    private final RestaurantService restaurantService;
    private final CategoryRepository categoryRepository;

    public CategoryServiceImp(RestaurantService restaurantService, CategoryRepository categoryRepository) {
        this.restaurantService = restaurantService;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category createCategory(String name, Long userId) throws Exception {

        Restaurant restaurant = restaurantService.getRestaurantByUserId(userId);
        Category category = new Category();

        category.setName(name);
        category.setRestaurant(restaurant);

        return categoryRepository.save(category);
    }

    @Override
    public List<Category> findCategoryByRestaurantId(Long id) throws Exception {

        Restaurant restaurant = restaurantService.findRestaurantById(id);
        return categoryRepository.findByRestaurantId(restaurant.getId());
    }

    @Override
    public Category findCategoryById(Long id) throws Exception {

        Optional<Category> optionalCategory = categoryRepository.findById(id);

        if(optionalCategory.isEmpty()){
            throw new Exception("Category Not Found.");
        }

        return optionalCategory.get();
    }
}
