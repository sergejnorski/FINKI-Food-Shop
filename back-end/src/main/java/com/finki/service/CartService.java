package com.finki.service;

import com.finki.model.Cart;
import com.finki.model.CartItem;
import com.finki.model.Restaurant;
import com.finki.request.AddCartItemRequest;

import java.util.List;

public interface CartService {

    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception;

    public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception;

    public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception;

    public Long calculateCartTotals(Cart cart) throws Exception;

    public Cart findCartById(Long id) throws Exception;

    public Cart findCartByUserId(Long userId) throws Exception;

    public Cart clearCart(Long userId) throws Exception;

    public List<CartItem> getCartItems(Long cartId) throws Exception;

    Long calculateCartTotalsByRestaurantID(Cart cart, Restaurant restaurant) throws Exception;
}
