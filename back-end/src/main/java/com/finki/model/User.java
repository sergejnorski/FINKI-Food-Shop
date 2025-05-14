package com.finki.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.finki.dto.RestaurantDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Целосно име е задолжително")
    @Size(min = 2, max = 100, message = "Вашето име мора да е помеѓу 2 и 100 карактери")
    private String fullName;

    @NotBlank(message = "Е-маил адресата е задолжителна")
    @Email(message = "Внесете валидна е-маил адреса")
    private String email;

    @OneToOne
    private Cart cart;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank(message = "Лозинката е задолжителна")
    @Size(min = 8, message = "Лозинката мора да содржи барем 8 карактери")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!]).*$", message = "Лозинката мора да содржи барем една буква, една бројка и барем еден специјален карактер")
    private String password;

    private USER_ROLE role = USER_ROLE.ROLE_CUSTOMER;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String verificationCode;

    private boolean isEmailVerified = false;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "customer")
    private List<Order> orders = new ArrayList<>();

    @ElementCollection
    private List<RestaurantDto> favorites = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses = new ArrayList<>();
}
