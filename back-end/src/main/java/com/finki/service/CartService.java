package com.finki.service;

import com.finki.model.Cart;
import com.finki.model.CartItem;
import com.finki.model.Restaurant;
import com.finki.request.AddCartItemRequest;

import java.util.List;

public interface CartService {

    CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception;

    CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception;

    Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception;

    Long calculateCartTotals(Cart cart) throws Exception;

    Cart findCartById(Long id) throws Exception;

    Cart findCartByUserId(Long userId) throws Exception;

    Cart clearCart(Long userId) throws Exception;

    List<CartItem> getCartItems(Long cartId) throws Exception;

    Long calculateCartTotalsByRestaurantID(Cart cart, Restaurant restaurant) throws Exception;
}
