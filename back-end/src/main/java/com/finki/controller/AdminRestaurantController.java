package com.finki.controller;

import com.finki.dto.RestaurantDto;
import com.finki.model.Restaurant;
import com.finki.model.User;
import com.finki.repository.UserRepository;
import com.finki.request.CreateRestaurantRequest;
import com.finki.response.MessageResponse;
import com.finki.service.RestaurantService;
import com.finki.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/admin/restaurants")
public class AdminRestaurantController {

    private final RestaurantService restaurantService;
    private final UserService userService;
    private final UserRepository userRepository;

    public AdminRestaurantController(RestaurantService restaurantService, UserService userService, UserRepository userRepository) {
        this.restaurantService = restaurantService;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping()
    public ResponseEntity<Restaurant> createRestaurant(@RequestBody CreateRestaurantRequest req,
                                                       @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.createRestaurant(req, user);

        return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(@RequestBody CreateRestaurantRequest req,
                                                       @RequestHeader("Authorization") String jwt,
                                                       @PathVariable Long id) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.updateRestaurant(id,req);

        return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteRestaurant(@RequestHeader("Authorization") String jwt,
                                                            @PathVariable Long id) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        restaurantService.deleteRestaurant(id);

        MessageResponse messageResponse = new MessageResponse();
        messageResponse.setMessage("Restaurant Deleted Successfully.");

        return new ResponseEntity<>(messageResponse, HttpStatus.OK);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Restaurant> updateRestaurantStatus(@RequestHeader("Authorization") String jwt,
                                                            @PathVariable Long id) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.updateRestaurantStatus(id);

        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<Restaurant> findRestaurantByUserId(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        Restaurant restaurant = restaurantService.getRestaurantByUserId(user.getId());

        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @PutMapping("/{id}/favorites/update-status")
    public ResponseEntity<User> updateFavoriteStatus(@RequestHeader("Authorization") String jwt,
                                                    @PathVariable Long id) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        List<RestaurantDto> favList =new ArrayList<>();

        for (RestaurantDto fav: user.getFavorites()){
            if(fav.getId().equals(id)){
                fav.setOpen(!fav.isOpen());
                break;
            }

            user.setFavorites(favList);
            userRepository.save(user);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
