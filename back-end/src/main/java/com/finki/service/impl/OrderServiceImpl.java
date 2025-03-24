package com.finki.service.impl;

import com.finki.model.*;
import com.finki.repository.*;
import com.finki.request.OrderRequest;
import com.finki.service.CartService;
import com.finki.service.OrderService;
import com.finki.service.RestaurantService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderitemRepository orderitemRepository;
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final RestaurantService restaurantService;
    private final CartService cartService;

    public OrderServiceImpl(OrderRepository orderRepository, OrderitemRepository orderitemRepository, AddressRepository addressRepository, UserRepository userRepository, RestaurantService restaurantService, CartService cartService) {
        this.orderRepository = orderRepository;
        this.orderitemRepository = orderitemRepository;
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.restaurantService = restaurantService;
        this.cartService = cartService;
    }

    @Override
    public Order createOrder(OrderRequest order, User user) throws Exception {

        Address shipAddress = order.getDeliveryAddress();
        Address savedAddress = addressRepository.save(shipAddress);

        if(!user.getAddresses().contains(savedAddress)){
            user.getAddresses().add(savedAddress);
            userRepository.save(user);
        }

        Restaurant restaurant = restaurantService.findRestaurantById(order.getRestaurantId());

        Order createdOrder = new Order();
        createdOrder.setMobile(order.getDeliveryAddress().getMobile());
        createdOrder.setCustomer(user);
        createdOrder.setCreatedAt(new Date());
        createdOrder.setOrderStatus("PENDING");
        createdOrder.setDeliveryAddress(savedAddress);
        createdOrder.setRestaurant(restaurant);

        Cart cart = cartService.findCartByUserId(user.getId());

        List<OrderItem> orderItems = new ArrayList<>();

        for(CartItem cartItem : cart.getItem()){
            OrderItem orderItem = new OrderItem();
            orderItem.setFood(cartItem.getFood());
            orderItem.setIngredients(cartItem.getIngredients());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotalPrice(cartItem.getTotalPrice());

            OrderItem savedOrderItem = orderitemRepository.save(orderItem);
            orderItems.add(savedOrderItem);
        }

        Long totalPrice = cartService.calculateCartTotalsByRestaurantID(cart,restaurant);

        createdOrder.setItems(orderItems);
        createdOrder.setTotalPrice(totalPrice);

        if(user.getOrders().contains(createdOrder)){
            throw  new Exception("Order Duplicate.");
        }

        Order savedOrder = orderRepository.save(createdOrder);
        restaurant.getOrders().add(savedOrder);

        return createdOrder;
    }

    @Override
    public Order updateOrder(Long orderId, String orderStatus) throws Exception {

        Order order = findOrderById(orderId);

        if(orderStatus.equals("OUT_FOR_DELIVERY")
                || orderStatus.equals("DELIVERED")
                || orderStatus.equals("COMPLETED")
                || orderStatus.equals("PENDING")
        ){
            order.setOrderStatus(orderStatus);
            return orderRepository.save(order);
        }
        throw new Exception("Please select a valid order status.");
    }

    @Override
    public void cancelOrder(Long orderId) throws Exception {

        Order order = findOrderById(orderId);
        orderitemRepository.deleteById(orderId);
    }

    @Override
    public List<Order> getUsersOrder(Long userId) throws Exception {
        return orderRepository.findByCustomerId(userId);
    }

    @Override
    public List<Order> getRestaurantsOrder(Long restaurantId, String orderStatus) throws Exception {

        List<Order> orders = orderRepository.findByRestaurantId(restaurantId);

        if(orderStatus!=null){
            orders = orders.stream().filter(order ->
                    order.getOrderStatus().equals(orderStatus)).collect(Collectors.toList());
        }

        return orders;
    }

    @Override
    public Order findOrderById(Long orderId) throws Exception {

        Optional<Order> optionalOrder = orderRepository.findById(orderId);

        if(optionalOrder.isEmpty()){
            throw  new Exception("Order Not Found.");
        }

        return optionalOrder.get();
    }
}
