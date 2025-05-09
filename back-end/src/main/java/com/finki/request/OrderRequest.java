package com.finki.request;

import com.finki.model.Address;
import lombok.Data;

@Data
public class OrderRequest {

    private Long restaurantId;

    private Address deliveryAddress;

    private String mobile;

    private  String sessionId;

    private long total;
}
