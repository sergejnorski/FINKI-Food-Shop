package com.finki.request;
import com.finki.model.Category;
import com.finki.model.IngredientsItem;
import lombok.Data;

import java.util.List;

@Data
public class CreateFoodRequest {

    private String name;
    private String description;
    private Long price;

    private Category category;
    private List<String> image;

    private Long restaurantId;
    private boolean vegetarin;
    private boolean seasional;
    private  List<IngredientsItem> ingredients;

}
