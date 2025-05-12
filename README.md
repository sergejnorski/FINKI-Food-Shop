# Finki Food Shop

Finki Food Shop is an application built for the subject "Team Project".
It represents online shop where market owners can publish their market
with their products and the users can access it and order the products.

## Solution stack

- Backend: Java Spring Boot
- Frontend: ReactJS, MaterialUI for the UI library
- Database: MySQL

## Installation

### Frontend

Navigate to the frontend directory

```bash
  cd frontend
```

Later we need to install the dependencies

```bash
  npm install
```

And to start the application use

```bash
  npm run dev
```

### Backend

Navigate to the backend directory

```bash
  cd back-end
```

Configure the application properties file (src/main/resources/application.properties)

Run the application

```
./mvnw spring-boot:run
```

## Endpoints

- /account/register - used for registration
- /account/login - used for authentication
- /restaurant/{restaurantCity}/{restaurantName}/id - used to access restaurant page
- /cart - access your cart
- /admin/restaurants/orders - page where the market owner can manage the orders made by the user
- /admin/restaurants/menu - page where the market owner can manage the products that are available in his market
- /admin/restaurants/category - page where the market owner manages the categories available in the market
- /admin/restaurants/ingredients - used by the market owner to manage the ingredients used in the products
- /admin/restaurants/details - market owner manages informations about his market and can also trigger open/close for
  the users

