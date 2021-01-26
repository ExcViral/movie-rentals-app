# vidly-app

Vidly is an imaginary service for renting out movies. This project is a part of *Mosh Hamedani's* Udemy course on *node.js* 



## Genres API

Create a service for managing the list of movie genres. 

Route: `http://vidly.com/api/genres`

##### Rubric

- [x] EndPoint for getting the list of all Genres
- [x] EndPoint for getting a single Genre
- [x] EndPoint for creating a new Genre
- [x] EndPoint for updating existing Genres
- [x] EndPoint for deleting existing Genres

### Restructure the vidly-app

So far everything we have built will be in one file. It is not a good way to build an app. So, let's restructure it in a clean and manageable way.

##### Rubric

- [x] Create a new folder named `routes` to store all our routes for various endpoints.
- [x] We have already implemented the `generes` endpoint, move the code into a new file named `genres.js` and save it in `routes/` folder. 
- [x] Refactor all the code in `index.js` as well as in `genres.js`

### Add Persistence to Genres API

So far we have been storing our data in arrays, and all the data was wiped out once the code restarted. Now that we know how to work with `MongoDB` database let's add persistence to our project.

**Rubric**

- [x] Get rid of all the arrays
- [x] Create a new database for storing all the data for our vidly-app
- [x] Refactor the code to use our new database while retaining all existing functionalities



## Customers API

Create a service to manage the details of customers

Route: `http://vidly.com/api/customers`

##### **Rubric**

- [x] Create a new collection named *customers*

  - [x] A customer should have the following properties: 

    ​	name: String

    ​	phone: Numbers

    ​	isGold: Boolean

- [x] The Customers API should have the following functionalities

  - [x] EndPoint for getting the list of all customers from the database
  - [x] EndPoint for getting a single customer document using id from the database
  - [x] EndPoint for creating a customer document in the database
  - [x] EndPoint for updating a customer document in the database
  - [x] EndPoint for Deleting a customer document in the database

### Restructure the vidly-app

**To keep our applications maintainable, we should ensure that each module is responsible for only and only one thing. This is called <u>Single Responsibility Principle</u>**

If you look at our app now, the `routes/genres.js`, and the `route/customers.js` have mongoose schemas, route handler functions, and `joi` validation schema+function. 

This makes the files too big ... <span style="color:red"><u>Difficult to Maintain!</u></span> 

Our route handler files should only be responsible to handle the routes, it should not be responsible for declaring schema and creating mongoose model. It should also not have the `Joi` Validator functions.

- [x] Move the Schema and `Joi` validator functions to `models/genres.js` and `models/customers.js`  files.
- [x] Refactor  `routes/genres.js`, and the `route/customers.js`

Now we have a singular responsibility for  `routes/genres.js`, and the `route/customers.js` and also for `models/genres.js` and `models/customers.js`



## Movies API

Create a new service to manage the catalogue of movies.

Route: `http://vidly.com/api/movies`

##### Rubric

- [x] Create a new collection of movies
- [x] The shape of movie document should be as follows:
  - [x] `title`: String
  - [x] `genre`: Genre document should be embedded using **Hybrid Approach**
  - [x] `numberInStock`: Number
  - [x] `dailyRentalRate`: Number
- [x] Implement CRUD operations to manage movies catalogue
  - [x] Endpoint to create a new movie
    - [x] Receive Json object containing Title of movie, <u>Id of genre</u>, Number in Stock, and Daily rental rate.
    - [x] **In hybrid approach, you should take the Id of `genre` from client, and while creating/updating movie, you should query the db to get `genre` from the db, and embed the properties you want along with its original id for reference.** 
  - [x] Endpoint to get all movies
  - [x] Endpoint to get a single movie by its id
  - [x] Endpoint to update a movie
  - [x] Endpoint to delete a move by its id



## Rentals API

- Create a new service to manage the catalogue of movies.
  
  Route: `http://vidly.com/api/rentals`
  
  ##### Rubric
  
    - [x] Create a new collection for rentals
  
      - The shape of the rental document should be:
        - [x] It should have `customer` property 
          - Donot reuse the customer schema, use **Hybrid Approach** for embedding
          - Take in `customerId` as input from client, and then we can embed whatever properties we need!
          - In this case, let's have the customer's `name`, `phoneNumber`, and `isGold` property.
          - Properties like `isGold` can be used to provide special features to customer, like additional discounts, early access, first priority ... etc
          - customer property should be required
        - [x] It should have a `movie` property
          - Donot reuse the movie schema, use **Hybrid Approach** for embedding
          - Take in `movieId` as input from client, and then we can embed whatever properties we need!
          - In this case, let's have the movie's `title`, and `dailyRentalRate` properties
          - In future, we will use daily rental rate to calculate the `rentalFee`
          - movie property should be required
        - [x] It should have a `dateOut` property of type date, and should be required. This property will track when movie was rented. This property should not be sent by client, it should be set on server.
        - [x] It should have a `dateReturned` property, again of type date, and <u>should be not be required</u>, as it will be set on a later date. This property will track the date of returned. This property should not be sent by client, it should be set on server.
        - [x] It should have a property called `rentalFee`, of number type, and cannot be less than zero. This property should not be sent by client, it should be set on server.
        
      - [x] Also create a `Joi` validate function for rental, we will only be taking `customerId` and `movieId` from the client, so this function should validate whether the `objectIds` sent by client are valid `objectIds`.
  
  - The API should have the following endpoints
  - [x] Endpoint to get the list of all rentals, sort by `dateOut`
    - [x] Endpoint to create a rental
      - You should first create a rental document
      - Then you should decrement the number of DVDs in stock ...
      - Here we have a **<u>transaction</u>** problem. We have two separate operations. It is possible that after we save the rental document, something goes wrong (eg. server crash, connection to db drops), and we are not able to decrement the stock of DVDs. The second operation will not complete! Here we need **transactions**. With transaction, we can ensure that both these operations will update the state of our data in the database, or none of them will be applied. They should be **`atomic`** The both should complete, or both should roll back.