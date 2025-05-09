package com.finki.service.impl;

import com.finki.model.*;
import com.finki.repository.CartItemRepository;
import com.finki.repository.CartRepository;
import com.finki.request.AddCartItemRequest;
import com.finki.service.CartService;
import com.finki.service.FoodService;
import com.finki.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserService userService;
    private final FoodService foodService;

    public CartServiceImpl(CartRepository cartRepository, CartItemRepository cartItemRepository, UserService userService, FoodService foodService) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userService = userService;
        this.foodService = foodService;
    }

    @Override
    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Food food = foodService.findFoodById(req.getFoodId());
        Cart cart = cartRepository.findByCustomerId(user.getId());

        for(CartItem cartItem : cart.getItem()){
            if(cartItem.getFood().equals(food)){
//                int newQuantity=cartItem.getQuantity()+req.getQuantity();
//                return updateCartItemQuantity(cartItem.getId(),newQuantity);
                return null;
            }
        }

        CartItem newCartItem = new CartItem();
        newCartItem.setFood(food);
        newCartItem.setCart(cart);
        newCartItem.setQuantity(req.getQuantity());
        newCartItem.setIngredients(req.getIngredients());
        newCartItem.setTotalPrice(req.getQuantity()*food.getPrice());

        CartItem savedCartItem = cartItemRepository.save(newCartItem);

        cart.getItem().add(savedCartItem);

        cartRepository.save(cart);

        return savedCartItem;
    }

    @Override
    public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception {

        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);

        if(cartItemOptional.isEmpty()){
            throw new Exception("Cart Item Not Found.");
        }

        CartItem item = cartItemOptional.get();
        item.setQuantity(quantity);
        item.setTotalPrice(item.getFood().getPrice()*quantity);

        return cartItemRepository.save(item);
    }

    @Override
    public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Cart cart = cartRepository.findByCustomerId(user.getId());
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);

        if(cartItemOptional.isEmpty()){
            throw new Exception("Cart Item Not Found.");
        }

        CartItem item = cartItemOptional.get();
        cart.getItem().remove(item);

        return cartRepository.save(cart);
    }

    @Override
    public Long calculateCartTotals(Cart cart) throws Exception {

        long total = 0L;

        for(CartItem cartItem : cart.getItem()){
            total+=cartItem.getFood().getPrice()*cartItem.getQuantity();
        }

        return total;
    }

    @Override
    public Long calculateCartTotalsByRestaurantID(Cart cart, Restaurant restaurant) throws Exception {

        long total=0L;

        for (CartItem cartItem : cart.getItem()){
            if(cartItem.getFood().getRestaurant()==restaurant){
                total+=cartItem.getFood().getPrice()*cartItem.getQuantity();
            }

        }
        return total;
    }

    @Override
    public Cart findCartById(Long id) throws Exception {

        Optional<Cart> optionalCart = cartRepository.findById(id);

        if(optionalCart.isEmpty()){
            throw  new Exception("Cart Not Found With ID "+id);
        }

        return optionalCart.get();
    }

    @Override
    public Cart findCartByUserId(Long userId) throws Exception {

        //User user = userService.findUserByJwtToken(jwt);

        Cart cart = cartRepository.findByCustomerId(userId);

        cart.setTotal(calculateCartTotals(cart));

        return cart;
    }

    @Override
    public Cart clearCart(Long userId) throws Exception {

        // User user = userService.findUserByJwtToken(userId);

        Cart cart = findCartByUserId(userId);

        cart.getItem().clear();

        return cartRepository.save(cart);
    }

    @Override
    public List<CartItem> getCartItems(Long cartId) throws Exception {
        Cart cart = findCartById(cartId);
        return cart.getItem();
    }
}
