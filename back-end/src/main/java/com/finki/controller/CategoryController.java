package com.finki.controller;

import com.finki.model.Category;
import com.finki.model.User;
import com.finki.service.CategoryService;
import com.finki.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

    private final CategoryService categoryService;
    private final UserService userService;

    public CategoryController(CategoryService categoryService, UserService userService) {
        this.categoryService = categoryService;
        this.userService = userService;
    }

    @PostMapping("/admin/category")
    public ResponseEntity<Category> createCategory(@RequestBody Category category,
                                                   @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        Category createdCategory = categoryService.createCategory(category.getName(),user.getId());

        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @GetMapping("/category/restaurant/{id}")
    public ResponseEntity<List<Category>> getRestaurantCategory(@PathVariable Long id,
                                                                @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        List<Category> categories = categoryService.findCategoryByRestaurantId(id);

        return new ResponseEntity<>(categories, HttpStatus.CREATED);
    }
}
