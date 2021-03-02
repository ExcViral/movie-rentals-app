[toc]

Table of Contents
=================

   * [movie-rentals-app](#movie-rentals-app)
   * [API Reference](#api-reference)
   * [[1] <strong>Users &amp; Authentication</strong>](#1-users--authentication)
      * [[1.1] <strong>Registering a new user</strong>](#11-registering-a-new-user)
      * [[1.2] <strong>Logging in a user</strong>](#12-logging-in-a-user)
      * [[1.3] <strong>Get a User's Profile</strong>](#13-get-a-users-profile)
      * [[1.4] <strong>Get all Users' Details</strong>](#14-get-all-users-details)
   * [[2] <strong>Genres</strong>](#2-genres)
      * [[2.1] <strong>Get All Genres</strong>](#21-get-all-genres)
      * [[2.2] <strong>Get a Single Genre</strong>](#22-get-a-single-genre)
      * [[2.3] <strong>Create a New Genre</strong>](#23-create-a-new-genre)
      * [[2.4] <strong>Update a Genre</strong>](#24-update-a-genre)
      * [[2.5] <strong>Delete a Genre</strong>](#25-delete-a-genre)
   * [[3] <strong>Customers</strong>](#3-customers)
      * [[3.1] <strong>Create a new Customer</strong>](#31-create-a-new-customer)
      * [[3.2] <strong>Get all Customers</strong>](#32-get-all-customers)
      * [[3.3] <strong>Get a single Customer</strong>](#33-get-a-single-customer)
      * [[3.4] <strong>Update a Customer</strong>](#34-update-a-customer)
      * [[3.5] <strong>Delete a Customer</strong>](#35-delete-a-customer)
   * [[4] <strong>Movies</strong>](#4-movies)
      * [[4.1] <strong>Create a new Movie</strong>](#41-create-a-new-movie)
      * [[4.2] <strong>Get all Movies</strong>](#42-get-all-movies)
      * [[4.3] <strong>Get a single Movie</strong>](#43-get-a-single-movie)
      * [[4.4] <strong>Update a Movie</strong>](#44-update-a-movie)
      * [[4.5] <strong>Delete a Movie</strong>](#45-delete-a-movie)
   * [[5] <strong>Rentals</strong>](#5-rentals)
      * [[5.1] <strong>Create a Rental</strong>](#51-create-a-rental)
      * [[5.2] <strong>Get all Rentals</strong>](#52-get-all-rentals)
   * [[Project Log]](#project-log)
         * [Genres API](#genres-api)
         * [Restructure the movie-rentals-app](#restructure-the-movie-rentals-app)
         * [Add Persistence to Genres API](#add-persistence-to-genres-api)
         * [Customers API](#customers-api)
         * [Restructure the movie-rentals-app](#restructure-the-movie-rentals-app-1)
         * [Movies API](#movies-api)
         * [Rentals API](#rentals-api)
               * [Rubric](#rubric)
         * [Adding Authentication and Authorization](#adding-authentication-and-authorization)
            * [Authentication (Users API &amp; Login API)](#authentication-users-api--login-api)
            * [Authorization](#authorization)
         * [Refactor the Route Handlers: Express Error Middleware](#refactor-the-route-handlers-express-error-middleware)
            * [Implement the Express Error Middleware](#implement-the-express-error-middleware)
            * [Refactor the code to use Express Error Middleware](#refactor-the-code-to-use-express-error-middleware)
         * [Refactor the Route Handlers: Remove Try-Catch Blocks](#refactor-the-route-handlers-remove-try-catch-blocks)
            * [Implement the asyncMiddleware factory function](#implement-the-asyncmiddleware-factory-function)
            * [Refactor the code to use asyncMiddleware and remove try-catch](#refactor-the-code-to-use-asyncmiddleware-and-remove-try-catch)
         * [Implement logic to log the errors in a log file](#implement-logic-to-log-the-errors-in-a-log-file)
         * [Refactor index.js](#refactor-indexjs)
            * [Extract all routes to a separate module](#extract-all-routes-to-a-separate-module)
            * [Extract and Refactor the database logic to a separate module](#extract-and-refactor-the-database-logic-to-a-separate-module)
            * [Extract the logging logic to a separate module](#extract-the-logging-logic-to-a-separate-module)
            * [Extract the config logic to a separate module](#extract-the-config-logic-to-a-separate-module)
   * [References](#references)





# movie-rentals-app

This is an imaginary service for renting out movies



# API Reference



# [1] **Users & Authentication**



## [1.1] **Registering a new user**

Creates a new user and returns a JSON object containing email, id and username of newly created user. It also returns a Json web token as a header under key `'x-auth-token'`.

- **URL**

  `/api/users`

- **Method:**

  `POST`

- **Data Params**

  **Required Payload:**

  ```js
  {
  	"username": "viral",
  	"email": "viral@gmail.com",
  	"password": "1234"
  }
  ```

  **Payload Restrictions:**

  * Payload Cannot be empty
  * `username` field is compulsory, it should be a string, minimum 3 chars, maximum 255 chars. It should be unique.
  * `email`field is compulsory, it should be a valid email address. It should be unique.
  * `password` should be a string, minimum 3 characters.

- **Success Response:**

  - **Code:** 200
    **Content:** 

    ```js
    {
        "_id": "603e0691c7a0563b56871ff9",
        "username": "excviral",
        "email": "exc@gmail.com"
    }
    ```

    **Headers**: key: `'x-auth-token'` value: `[json web token]`

- **Error Response:**

  - **Code:** 400 BAD REQUEST
    **Content:** `Joi Validation Error (Custom Message)` 

    This will be sent when payload restrictions are not met.

  OR

  - **Code:** 400 BAD REQUEST
    **Content:** `Username Taken`

  OR

  - **Code:** 400 BAD REQUEST
    **Content:** `email Taken`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks.`

- **Sample Call:**

  <*Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.*>

  [**TO BE ADDED LATER**]

- **Notes:**

  <*This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.*>

  [**TO BE ADDED LATER**]



## [1.2] **Logging in a user**

Authenticates a user with valid username and password and returns a Json Web Token.

- **URL**

  `/api/login`

- **Method:**

  `POST`

- **Data Params**

  **Required Payload:**

  ```js
  {
  	"username":"viral",
  	"password":"1234"
  }
  ```

  **Payload Restrictions:**

  * Payload Cannot be empty
  * `username` field is compulsory, it should be a string, minimum 3 chars, maximum 255 chars.
  * `password` should be a string, minimum 3 characters.

- **Success Response:**

  - **Code:** 200
    **Content:** `login successful`

    **Headers**: key: `'x-auth-token'` value: `[json web token]`

- **Error Response:**

  - **Code:** 400 BAD REQUEST
    **Content:** `Joi Validation Error (Custom Message)` 

    This will be sent when payload restrictions are not met.

  OR

  - **Code:** 400 BAD REQUEST
    **Content:** `Invalid Username or Password`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks.`

- **Sample Call:**

  <*Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.*>

  [**TO BE ADDED LATER**]

- **Notes:**

  <*This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.*>

  [**TO BE ADDED LATER**]



## [1.3] **Get a User's Profile**

Returns a **JSON Object** containing the details of currently logged in User.

- **URL**

  `api/users/me`

- **Method:**

  `GET` 

- **Authentication:** Sign In Required

- **Authorisation:** None

- **Headers**

  **Required:**

  key: `x-auth-token` value: `[json web token]`

- **Success Response:**

  - **Code:** 200
    **Content:**

    ```js
    {
        "isAdmin": false,
        "_id": "6015285312e6795da5db21a4",
        "username": "viral",
        "email": "viral@gmail.com",
        "__v": 0
    }
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND
    **Content:** `We cannot find the requested user.`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks.`

- **Sample Call:**

  <*Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.*>

  [**TO BE ADDED LATER**]

- **Notes:**

  <*This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.*>

  [**TO BE ADDED LATER**]



## [1.4] **Get all Users' Details**

Returns an array of **JSON Objects** containing the details of all Users of the application.

- **URL**

  `api/users/all`

- **Method:**

  `GET` 

- **Authentication:** Sign In Required

- **Authorisation:** Admin Only

- **Headers**

  **Required:**

  key: `x-auth-token` value: `[json web token]`

- **Success Response:**

  - **Code:** 200
    **Content:**

    ```js
    [
        {
            "isAdmin": true,
            "_id": "601526529d719b5bfe793b66",
            "username": "excviral",
            "email": "exc.viral@gmail.com",
            "__v": 0
        },
        {
            "isAdmin": false,
            "_id": "6015285312e6795da5db21a4",
            "username": "viral",
            "email": "viral@gmail.com",
            "__v": 0
        },
        ...UserObjects
    ]
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks.`

- **Sample Call:**

  <*Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.*>

  [**TO BE ADDED LATER**]

- **Notes:**

  <*This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.*>

  [**TO BE ADDED LATER**]



# [2] **Genres**



## [2.1] **Get All Genres**

Returns an **array of JSON objects** containing all available Movie Genres.

- **URL**

  `/api/genres`

- **Method:**

  `GET` 

- **Authentication:** None

- **Authorisation:** None

- **Headers:** None

- **Success Response:**

  - **Code:** 200
    **Content:** 

    ```js
    [
        {
            "_id": "6006e6fde82ab570192c2232",
            "name": "Action"
        },
        {
            "_id": "6007a9600e5de71cd196c422",
            "name": "Adventure"
        },
        ...GenreObjects
    ]
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks.`

- **Sample Call:**

  <*Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.*>

  [**TO BE ADDED LATER**]

- **Notes:**

  <*This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.*>

  [**TO BE ADDED LATER**]



## [2.2] **Get a Single Genre**

Returns a **JSON Object** containing the requested Genre.

- **URL**

  `/api/genres/:id`

- **Method:**

  `GET` 

- **Authentication:** None

- **Authorisation:** None

- **Headers:** None

- **URL Params**

  **Required:**

  `id=[MongoDB ObjectId]`

- **Success Response:**

  - **Code:** 200
    **Content:**

    ```js
    {
        "_id": "6006e6fde82ab570192c2232",
        "name": "Action"
    }
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND
    **Content:** `Requested Genre Doesnot Exist`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks.`

- **Sample Call:**

  <*Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.*>

  [**TO BE ADDED LATER**]

- **Notes:**

  <*This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.*>

  [**TO BE ADDED LATER**]



## [2.3] **Create a New Genre**

Creates a new genre and returns a JSON object containing newly created Genre.

- **URL**

  `/api/genres`

- **Method:**

  `POST`

- **Authentication:** Sign In Required

- **Authorisation:** None

- **Headers**

  **Required:**

  key: `x-auth-token` value: `[json web token]`

- **Data Params**

  **Required Payload:**

  `{"name":"Genre Name"}`

  **Payload Restrictions:**

  * Payload cannot be empty 
  * Name field is compulsory, it should be a string
  * Minimum Length of *Genre Name*: 3 Characters

- **Success Response:**

  - **Code:** 200
    **Content:** 

    ```js
    {
        "_id": "603dde13392fd72f95bfbf70",
        "name": "Thriller",
    }
    ```

    

- **Error Response:**

  - **Code:** 400 BAD REQUEST
    **Content:** `Joi Validation Error (Custom Message)` 

    This will be sent when payload restrictions are not met.

  OR

  - **Code:** 400 BAD REQUEST
    **Content:** `This Genre already exists`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks.`

- **Sample Call:**

  <*Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.*>

  [**TO BE ADDED LATER**]

- **Notes:**

  <*This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.*>

  [**TO BE ADDED LATER**]



## [2.4] **Update a Genre**

Edits the requested genre and returns a JSON object of the updated Genre.

- **URL**

  `/api/genres/:id`

- **Method:**

  `PUT`

- **Authentication:** Sign In Required

- **Authorisation:** None

- **Headers**

  **Required:**

  key: `x-auth-token` value: `[json web token]`

- **URL Params**

  **Required:**

  `id=[MongoDB ObjectId]`

- **Data Params**

  **Required Payload:**

  `{"name":"Genre Name"}`

  **Payload Restrictions:**

  * Payload cannot be empty 
  * Name field is compulsory, it should be a string
  * Minimum Length of *Genre Name*: 3 Characters

- **Success Response:**

  - **Code:** 200
    **Content:** 

    ```js
    {
        "_id": "601bed72e1cd8456826f665f",
        "name": "Crime",
    }
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND
    **Content:** `Requested Genre Doesnot Exist`

  OR

  - **Code:** 400 BAD REQUEST
    **Content:** `Joi Validation Error (Custom Message)` 

    This will be sent when payload restrictions are not met.

  OR

  - **Code:** 400 BAD REQUEST
    **Content:** `This Genre already exists`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks.`

- **Sample Call:**

  <*Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.*>

  [**TO BE ADDED LATER**]

- **Notes:**

  <*This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.*>

  [**TO BE ADDED LATER**]



## [2.5] **Delete a Genre**

Deletes the Genre and returns a JSON object containing the deleted Genre.

- **URL**

  `/api/genres/:id`

- **Method**

  `DELETE`

- **Authentication:** Sign In Required

- **Authorisation:** Admin Only

- **Headers**:

  **Required:**

  key: `x-auth-token` value: `[json web token]`

- **URL Params**

  **Required:**

  `id=[MongoDB ObjectId]`

- **Success Response:**

  - **Code:** 200
    **Content:** 

    ```js
    {
        "_id": "601bed72e1cd8456826f665f",
        "name": "Crime",
    }
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND
    **Content:** `Requested Genre Doesnot Exist`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks.`

- **Sample Call:**

  <*Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.*>

  [**TO BE ADDED LATER**]

- **Notes:**

  <*This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.*>

  [**TO BE ADDED LATER**]



# [3] **Customers**



## [3.1] **Create a new Customer**

Creates a customer and returns a JSON object containing all the properties of newly created customer object.

- **URL**

  `/api/customers`

- **Method:**

  `POST`

- **Authentication:** Sign In Required

- **Authorisation:** None

- **Headers**

  **Required:**

  key: `x-auth-token` value: `[json web token]`

- **Data Params**

  **Required Payload:**

  ```js
  {
  	"name": "bobba fett",
  	"phoneNumber": "8765846952",
  	"isGold": true
  }
  ```

  **Payload Restrictions:**

  * Payload cannot be empty 
  * `name` field is required, it should be a string, minimum length 3 characters
  * `phoneNumber` field is required, it should be a string of 10 characters long
  * `isGold` is not compulsory. If not specified, default value is false.

- **Success Response:**

  - **Code:** 200
    **Content:** 

    ```js
    {
        "isGold": true,
        "_id": "603defb7c7a0563b56871fdd",
        "name": "Bobba Fett",
        "phoneNumber": "8765846952",
        "__v": 0
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST
    **Content:** `Joi Validation Error (Custom Message)` 

    This will be sent when payload restrictions are not met.

  OR

  - **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks.`

- **Sample Call:**

  <*Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.*>

  [**TO BE ADDED LATER**]

- **Notes:**

  <*This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.*>

  [**TO BE ADDED LATER**]



## [3.2] **Get all Customers**

Returns an **array of JSON objects** containing all available Customers (Sorted by Name).

- **URL**

  `/api/customers`

- **Method:**

  `GET`

- **Authentication:** Sign In Required

- **Authorisation:** None

- **Headers**

  **Required:**

  key: `x-auth-token` value: `[json web token]`

- **Success Response:**

  - **Code:** 200
    **Content:** 

    ```js
    [
        {
            "isGold": true,
            "_id": "6007e6323ed4dd4ca07aab60",
            "name": "Banrang Bhaijan",
            "phoneNumber": "9400768200",
            "__v": 0
        },
        {
            "isGold": true,
            "_id": "601cd6e6d1d9e62a9ec7ff0b",
            "name": "Bobba Fett",
            "phoneNumber": "8765846952",
            "__v": 0
        },
        ...CustomerObjects
    ]
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks.`

- **Sample Call:**

  <*Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.*>

  [**TO BE ADDED LATER**]

- **Notes:**

  <*This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.*>

  [**TO BE ADDED LATER**]





## [3.3] **Get a single Customer**

Returns a JSON Object containing the data of requested customer.

- **URL**

  `/api/customers/:id`

- **Method:**

  `GET`

- **Authentication:** Sign In Required

- **Authorisation:** None

- **Headers**

  **Required:**

  key: `x-auth-token` value: `[json web token]`

- **URL Params**

  **Required:**

  `id=[MongoDB ObjectId]`

- **Success Response:**

  - **Code:** 200
    **Content:** 

    ```js
    {
        "isGold": true,
        "_id": "603defb7c7a0563b56871fdd",
        "name": "Bobba Fett",
        "phoneNumber": "8765846952",
        "__v": 0
    }
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND
    **Content:** `Sorry, we are unable to find the requested customer in our records ...`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks.`

- **Sample Call:**

  <*Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.*>

  [**TO BE ADDED LATER**]

- **Notes:**

  <*This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.*>

  [**TO BE ADDED LATER**]





## [3.4] **Update a Customer**

Updates and returns a JSON object containing the updated Customer.

- **URL**

  `/api/customers/:id`

- **Method:**

  `PUT`

- **Authentication:** Sign In Required

- **Authorisation:** None

- **Headers**

  **Required:**

  key: `x-auth-token` value: `[json web token]`

- **URL Params**

  **Required:**

  `id=[MongoDB ObjectId]`

- **Data Params**

  **Required Payload:**

  ```js
  {
  	"name": "shantilal khurana",
  	"phoneNumber": "9999999999",
  	"isGold": false
  }
  ```

  **Payload Restrictions:**

  * Payload cannot be empty 
  * `name` field is required, it should be a string, minimum length 3 characters
  * `phoneNumber` field is required, it should be a string of 10 characters long
  * `isGold` is not compulsory. If not specified, default value is false.

- **Success Response:**

  - **Code:** 200
    **Content:** 

    ```js
    {
        "isGold": false,
        "_id": "6007e594d1fd424c5a024007",
        "name": "Shantilal Khurana",
        "phoneNumber": "9999999999",
        "__v": 0
    }
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND
    **Content:** `					'Sorry, we are unable to find the requested customer in our records ...'`

  OR

  * **Code:** 400 BAD REQUEST
    **Content:** `Joi Validation Error (Custom Message)` 

    This will be sent when payload restrictions are not met.

  OR

  - **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks.`

- **Sample Call:**

  <*Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.*>

  [**TO BE ADDED LATER**]

- **Notes:**

  <*This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.*>

  [**TO BE ADDED LATER**]





## [3.5] **Delete a Customer**

Deletes the Customer object and returns a JSON object containing the deleted Customer.

- **URL**

  `/api/customers/:id`

- **Method:**

  `DELETE`

- **Authentication:** Sign In Required

- **Authorisation:** Admin Only

- **Headers**:

  **Required:**

  key: `x-auth-token` value: `[json web token]`

- **URL Params**

  **Required:**

  `id=[MongoDB ObjectId]`

- **Success Response:**

  - **Code:** 200
    **Content:** 

    ```js
    {
        "isGold": false,
        "_id": "6007e594d1fd424c5a024007",
        "name": "Shantilal Khurana",
        "phoneNumber": "9999999999",
        "__v": 0
    }
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND
    **Content:** `'Sorry, we are unable to find the requested customer in our records ...'`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks.`

- **Sample Call:**

  <*Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.*>

  [**TO BE ADDED LATER**]

- **Notes:**

  <*This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.*>

  [**TO BE ADDED LATER**]





# [4] **Movies**



## [4.1] **Create a new Movie**

Creates a movie and returns a JSON object containing all the properties of newly created movie object.

- **URL**

  `/api/movies`

- **Method:**

  `POST`

- **Authentication:** Sign In Required

- **Authorisation:** None

- **Headers**

  **Required:**

  key: `x-auth-token` value: `[json web token]`

- **Data Params**

  **Required Payload:**

  ```js
  {
  	"title": "Martian",
  	"genreId": "6007ab01d3b6651e3ece3b2a",
  	"numberInStock": 5
  	"dailyRentalRate": 1
  }
  ```

  **Payload Restrictions:**

  * Payload cannot be empty 
  * `title` field is required, it should be a string, minimum length 3 characters.
  * `genreId` field is required, it should be a string containing a valid ObjectId.
  * `numberInStock` is a number. It is not compulsory. If not specified, default value is automatically set to 0. The upper limit is set to 255. The lower limit is set to 0.
  * `dailyRentalRate` is a number. It is not compulsory. If not specified, default value is automatically set to 0. The upper limit is set to 255. The lower limit is set to 0.

- **Success Response:**

  - **Code:** 200
    **Content:** 

    ```js
    {
        "numberInStock": 5,
        "dailyRentalRate": 1,
        "_id": "603dff7ec7a0563b56871fe6",
        "title": "Martian",
        "genre": {
            "_id": "6007ab01d3b6651e3ece3b2a",
            "name": "Science Fiction"
        },
        "__v": 0
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST
    **Content:** `Joi Validation Error (Custom Message)` 

    This will be sent when payload restrictions are not met.

  OR

  * **Code:** 404 NOT FOUND
    **Content:** `'Invalid Genre, The selected genre does not exist in database ...'` 

    This will be sent when invalid GenreId is passed by user.

  OR

  - **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks.`

- **Sample Call:**

  <*Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.*>

  [**TO BE ADDED LATER**]

- **Notes:**

  <*This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.*>

  [**TO BE ADDED LATER**]



## [4.2] **Get all Movies**

Returns an array containing JSON objects containing data of all the available movies.

- **URL**

  `/api/movies`

- **Method:**

  `GET`

- **Authentication:** None

- **Authorisation:** None

- **Headers**: None

- **Success Response:**

  - **Code:** 200
    **Content:** 

    ```js
    [
        {
            "numberInStock": 4,
            "dailyRentalRate": 0,
            "_id": "600b013f103a640466fcad3d",
            "title": "Star Trek 2009",
            "genre": {
                "_id": "6007ab01d3b6651e3ece3b2a",
                "name": "Science Fiction"
            },
            "__v": 0
        },
        {
            "numberInStock": 9,
            "dailyRentalRate": 1,
            "_id": "600b0242103a640466fcad3f",
            "title": "Inception",
            "genre": {
                "_id": "6007ab01d3b6651e3ece3b2a",
                "name": "Science Fiction"
            },
            "__v": 0
        },
        ...MovieObjects
    ]
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks.`

- **Sample Call:**

  <*Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.*>

  [**TO BE ADDED LATER**]

- **Notes:**

  <*This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.*>

  [**TO BE ADDED LATER**]



## [4.3] **Get a single Movie**

Returns a JSON object containing data of the requested movie.

- **URL**

  `/api/movies/:id`

- **Method:**

  `GET`

- **Authentication:** None

- **Authorisation:** None

- **Headers**: None

- **URL Params**

  **Required:**

  `id=[MongoDB ObjectId]`

- **Success Response:**

  - **Code:** 200
    **Content:** 

    ```js
    {
        "numberInStock": 10,
        "dailyRentalRate": 1,
        "_id": "600b0242103a640466fcad3f",
        "title": "Inception",
        "genre": {
            "_id": "6007ab01d3b6651e3ece3b2a",
            "name": "Science Fiction"
        },
        "__v": 0
    }
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND
    **Content:** `Sorry, we are unable to find the movie you have requested!` 

  OR

  - **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks.`

- **Sample Call:**

  <*Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.*>

  [**TO BE ADDED LATER**]

- **Notes:**

  <*This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.*>

  [**TO BE ADDED LATER**]



## [4.4] **Update a Movie**

Updates a movie object and then returns it in a JSON object.

- **URL**

  `/api/movies/:id`

- **Method:**

  `PUT`

- **Authentication:** Sign In Required

- **Authorisation:** None

- **Headers**

  **Required:**

  key: `x-auth-token` value: `[json web token]`

- **URL Params**

  **Required:**

  `id=[MongoDB ObjectId]`

- **Data Params**

  **Required Payload:**

  ```js
  {
  	"title": "Inception",
  	"genreId": "6007ab01d3b6651e3ece3b2a",
  	"numberInStock": 10,
  	"dailyRentalRate": 1
  }
  ```

  **Payload Restrictions:**

  * Payload cannot be empty 
  * `title` field is required, it should be a string, minimum length 3 characters.
  * `genreId` field is required, it should be a string containing a valid ObjectId.
  * `numberInStock` is a number. It is not compulsory. If not specified, default value is automatically set to 0. The upper limit is set to 255. The lower limit is set to 0.
  * `dailyRentalRate` is a number. It is not compulsory. If not specified, default value is automatically set to 0. The upper limit is set to 255. The lower limit is set to 0.

- **Success Response:**

  - **Code:** 200
    **Content:** 

    ```js
    {
        "numberInStock": 10,
        "dailyRentalRate": 1,
        "_id": "600b0242103a640466fcad3f",
        "title": "Inception",
        "genre": {
            "_id": "6007ab01d3b6651e3ece3b2a",
            "name": "Science Fiction"
        },
        "__v": 0
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST
    **Content:** `Joi Validation Error (Custom Message)` 

    This will be sent when payload restrictions are not met.

  OR

  * **Code:** 404 NOT FOUND
    **Content:** `'Invalid Genre, The selected genre does not exist in database ...'` 

    This will be sent when invalid GenreId is passed by user.

  OR

  - **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks.`

- **Sample Call:**

  <*Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.*>

  [**TO BE ADDED LATER**]

- **Notes:**

  <*This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.*>

  [**TO BE ADDED LATER**]



## [4.5] **Delete a Movie**

Deletes the movie object and returns it in a JSON object.

- **URL**

  `/api/movies/:id`

- **Method:**

  `DELETE`

- **Authentication:** Sign In Required

- **Authorisation:** None

- **Headers**

  **Required:**

  key: `x-auth-token` value: `[json web token]`

- **URL Params**

  **Required:**

  `id=[MongoDB ObjectId]`

- **Success Response:**

  - **Code:** 200
    **Content:** 

    ```js
    {
        "numberInStock": 4,
        "dailyRentalRate": 0,
        "_id": "600b013f103a640466fcad3d",
        "title": "Star Trek 2009",
        "genre": {
            "_id": "6007ab01d3b6651e3ece3b2a",
            "name": "Science Fiction"
        },
        "__v": 0
    }
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND
    **Content:** `'Sorry, we are unable to find the movie you have requested to delete!'`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks.`

- **Sample Call:**

  <*Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.*>

  [**TO BE ADDED LATER**]

- **Notes:**

  <*This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.*>

  [**TO BE ADDED LATER**]



# [5] **Rentals**



## [5.1] **Create a Rental**

Creates a rental object and then returns the newly created rental object in a JSON object.

- **URL**

  `/api/rentals`

- **Method:**

  `POST`

- **Authentication:** Sign In Required

- **Authorisation:** None

- **Headers**

  **Required:**

  key: `x-auth-token` value: `[json web token]`

- **Data Params**

  **Required Payload:**

  ```js
  {
  	"customerId": "6007e6323ed4dd4ca07aab60",
  	"movieId": "600b0242103a640466fcad3f"
  }
  ```

  **Payload Restrictions:**

  * Payload cannot be empty 
  * `customerId` field is required, it should be a string containing a valid ObjectId.
  * `movieId` field is required, it should be a string containing a valid ObjectId.

- **Success Response:**

  - **Code:** 200
    **Content:** 

    ```js
    {
        "rentalFee": 5,
        "_id": "603e0227c7a0563b56871fe9",
        "customer": {
            "_id": "6007e6323ed4dd4ca07aab60",
            "name": "Banrang Bhaijan",
            "phoneNumber": "9400768200",
            "isGold": true
        },
        "movie": {
            "_id": "600b0242103a640466fcad3f",
            "title": "Inception",
            "dailyRentalRate": 1
        },
        "dateOut": "2021-03-02T09:15:19.472Z"
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST
    **Content:** `Joi Validation Error (Custom Message)` 

    This will be sent when payload restrictions are not met.

  OR

  * **Code:** 400 BAD REQUEST
    **Content:** `Sorry, the selected movie is out of stock` 

    This will be sent when an out of stock movie is requested.

  OR

  * **Code:** 404 NOT FOUND
    **Content:** `'Sorry, we are unable to find the movie you have requested!'` 

    This will be sent when invalid movieId is passed by user.

  OR

  * **Code:** 404 NOT FOUND
    **Content:** `'Sorry, we are unable to find the requested customer in our records ...'` 

    This will be sent when invalid customerId is passed by user.

  OR

  - **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks.`

- **Sample Call:**

  <*Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.*>

  [**TO BE ADDED LATER**]

- **Notes:**

  <*This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.*>

  [**TO BE ADDED LATER**]



## [5.2] **Get all Rentals**

Returns an array of JSON objects containing data of all the rental objects.

- **URL**

  `/api/rentals`

- **Method:**

  `GET`

- **Authentication:** Sign In Required

- **Authorisation:** None

- **Headers**

  **Required:**

  key: `x-auth-token` value: `[json web token]`

- **Success Response:**

  - **Code:** 200
    **Content:** 

    ```js
    [
        {
            "rentalFee": 5,
            "_id": "603e0227c7a0563b56871fe9",
            "customer": {
                "_id": "6007e6323ed4dd4ca07aab60",
                "name": "Banrang Bhaijan",
                "phoneNumber": "9400768200",
                "isGold": true
            },
            "movie": {
                "_id": "600b0242103a640466fcad3f",
                "title": "Inception",
                "dailyRentalRate": 1
            },
            "dateOut": "2021-03-02T09:15:19.472Z"
        },
        {
            "rentalFee": 5,
            "_id": "601cd9b5eeaf052c748b448d",
            "customer": {
                "_id": "6007e6323ed4dd4ca07aab60",
                "name": "Banrang Bhaijan",
                "phoneNumber": "9400768200",
                "isGold": true
            },
            "movie": {
                "_id": "600b0242103a640466fcad3f",
                "title": "Inception",
                "dailyRentalRate": 1
            },
            "dateOut": "2021-02-05T05:37:57.545Z"
        },
        ...RentalObjects
    ]
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR
    **Content:** `Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks.`

- **Sample Call:**

  <*Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.*>

  [**TO BE ADDED LATER**]

- **Notes:**

  <*This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.*>

  [**TO BE ADDED LATER**]







# [Project Log]

This project is a part of *Mosh Hamedani's* Udemy course on *node.js* 



### Genres API

Create a service for managing the list of movie genres. 

Route: `http://movie-rentals-app.com/api/genres`

**Rubric**

- [x] EndPoint for getting the list of all Genres
- [x] EndPoint for getting a single Genre
- [x] EndPoint for creating a new Genre
- [x] EndPoint for updating existing Genres
- [x] EndPoint for deleting existing Genres

### Restructure the movie-rentals-app

So far everything we have built will be in one file. It is not a good way to build an app. So, let's restructure it in a clean and manageable way.

**Rubric**

- [x] Create a new folder named `routes` to store all our routes for various endpoints.
- [x] We have already implemented the `generes` endpoint, move the code into a new file named `genres.js` and save it in `routes/` folder. 
- [x] Refactor all the code in `index.js` as well as in `genres.js`

### Add Persistence to Genres API

So far we have been storing our data in arrays, and all the data was wiped out once the code restarted. Now that we know how to work with `MongoDB` database let's add persistence to our project.

**Rubric**

- [x] Get rid of all the arrays
- [x] Create a new database for storing all the data for our movie-rentals-app
- [x] Refactor the code to use our new database while retaining all existing functionalities



### Customers API

Create a service to manage the details of customers

Route: `http://movie-rentals-app.com/api/customers`

**Rubric**

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

### Restructure the movie-rentals-app

**To keep our applications maintainable, we should ensure that each module is responsible for only and only one thing. This is called <u>Single Responsibility Principle</u>**

If you look at our app now, the `routes/genres.js`, and the `route/customers.js` have mongoose schemas, route handler functions, and `joi` validation schema+function. 

This makes the files too big ... <span style="color:red"><u>Difficult to Maintain!</u></span> 

Our route handler files should only be responsible to handle the routes, it should not be responsible for declaring schema and creating mongoose model. It should also not have the `Joi` Validator functions.

- [x] Move the Schema and `Joi` validator functions to `models/genres.js` and `models/customers.js`  files.
- [x] Refactor  `routes/genres.js`, and the `route/customers.js`

Now we have a singular responsibility for  `routes/genres.js`, and the `route/customers.js` and also for `models/genres.js` and `models/customers.js`



### Movies API

Create a new service to manage the catalogue of movies.

Route: `http://movie-rentals-app.com/api/movies`

**Rubric**

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



### Rentals API

- Create a new service to manage the catalogue of movies.
  
  Route: `http://movie-rentals-app.com/api/rentals`
  
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

### Adding Authentication and Authorization

Nearly all applications out there require some kind of *authentication* and *authorization*

#### Authentication (Users API & Login API)

The process of identifying if a person is who they claim they are.

That is verifying credentials at the time on logging in.

- **Create a new service for managing the users**

  Route: `http://movie-rentals-app.com/api/users`

  - [x] Create a new collection for users
    - [x] The shape of the `User` document should be:
      - [x] It should have `username` property. <u>For the username property, in the Schema Type object, **you must set unique property to true**.</u> This is to ensure that we don't store two documents with same username in our database.
      - [x] It should have an `email` property. <u>For the email property, in the Schema Type object, **you must set unique property to true**.</u> This is to ensure that we don't store two documents with same email in our database.
      - [x] It should have a `password` property. **<u>You must store only the hash of the password, not the plain-text password</u>**
      - [x] It should have `isAdmin` property. This is a Boolean field, and it must be used for protecting some routes such that only admins are allowed to access them.
      - [x] It should have its own method for generating a `Json Web Token (JWT)` for a User. As the payload of `JWT`, you should pass an object with properties `_id` and `isAdmin` [**Encapsulate JWT Generation Logic in Mongoose Models**]
        - [x] Use the `jsonwebtoken` package to generate `JWT`
        - [x] **<u>The private or secret key used to generate `JWT` must be read from an environment variable using the `config` module</u>** [Never store App Secrets in File Itself, Store them in environment variables on server]
    - [x] The API should have the following endpoints:
      - [x] Endpoint for registering a new `user`:
        - [x] An Http post request must be sent to the route `/api/users`
        - [x] **HTTP Post request because we are creating a new resource, In this case, a new user.** 
        - [x] The process of registering a new user should be:
          - [x] Client must send a json object in HTTP Post request containing properties `username`, `email`, and `password`. We can access this object from `req.body`
          - [x] First validate the `req.body` using `Joi`, if invalid object, return 400 Bad request error and terminate request
          - [x] Then check if the username or email already exist in our database, if they do, return 400 Bad request, and ask client to send new username or email and terminate request
          - [x] If everything is okay, hash the password using `bcrypt`
            - [x] first generate a random `salt` using `bcrypt` (async)
            - [x] then hash the plain-text password using `bcrypt` (async), then overwrite the plain-text password in the User object with its hash.
          - [x] Then save the User to our database
          - [x] Then generate a new `JWT` for this user using the method we defined in the User Schema
          - [x] Finally complete the registration process by sending the `JWT` to the client, along with his registered email and username (don't send back hashed password)
            - [x] The `JWT` must be sent in an http header under custom name like `x-auth-token`, so that the front-end client software can save this `JWT` for further authorisation in order to be able to access protected routes.
      - [x] Endpoint for accessing a `user's` profile:
        - [x] A logged in user should be able to access his profile using the route `/api/users/me`
        - [x] First check if the user is authorized to access the route using the authorization middleware. (if he sends a valid `JWT` in his request's header, he should be authorized.)
        - [x] Decode the payload sent by client in the `JWT`, read the `_id` of user from decoded payload, and fetch details from database and send it to the client (exclude password field).
      - [x] Endpoint for accessing all user's details <span style="color:red">[PROTECTED ROUTE: ADMIN ONLY]</span>: 
        - [x] Only a logged in user with admin privileges should be able to access this route: `/api/users/all`
        - [x] First check if the user is authorized to access the route using the authorization middlewares. (if he sends a valid `JWT` in his request's header and he is an Admin, he should be authorized.)
        - [x] Fetch all the users and send the data to the client.

- **Create a new service for allowing users to log in**

  Route: `http://movie-rentals-app.com/api/login`

  - [x] The API should have a single End Point to allow users to log in
    - [x] The module for handling this logic must be named `auth.js`
    - [x] An Http post request must be sent to `/api/login`
    - [x] We will be using an Http Post request here, because we are <u>creating</u> a new login request or a login command.
    - [x] Another reason for using Http Post request is sometimes we want to store all individual logins in our database. So it makes perfect sense to use Post request here.
    - [x] The process of logging in a user should be:
      - [x] Client must send in a valid Json object with properties username and password. We can access this object from `req.body`
      - [x] First validate the `req.body` using `Joi`, if invalid object, return 400 Bad request error and terminate request
      - [x] Then check if the username exists in our database, if not then terminate the request with 400 Bad request error, but <u>send a vague message saying username or password invalid.</u> We must never specify which one is wrong.
      - [x] If the username exists in our database, we compare the verify if the hash of the password sent by client matches with the hash stored in our database
        - [x] If the hash doesn't match, we terminate the request with 400 Bad request error, but <u>send a vague message saying username or password invalid.</u> We must never specify which one is wrong.
        - [x] If the hash matches, we generate a new `JWT` for this user using the method we defined in the User Schema
      - [x] Finally complete the login process by sending the `JWT` to the client, along with a message that login is successful.
        - [x] The `JWT` must be sent in an http header under custom name like `x-auth-token`, so that the front-end client software can save this `JWT` for further authorisation in order to be able to access protected routes.



#### Authorization

The process of determining whether a given user has the permission to perform a given operation.

Not all users can have all permissions. Certain routes need to be protected, so that only authorized users can access them.

<u>The best way to handle this is to put this authorization logic in a middleware function. Then we apply this middleware function to the route handlers that need to be protected. This middleware function sits in front of our route in the request-response pipeline, and only allows authorized users to pass through.</u>

- [x] Create a middleware function to verify that a user is logged in
  - [x] Once a user logs in, we send him a `jwt`, from then on, every time a user accesses any route, he is supposed to send this `jwt` as a part of his request headers. In this middleware, we verify the same.
  - Logic to be implemented:
    - [x] The `jwt` token should be available under `req.header` under the name `x-auth-token`. Try to read this token.
      - [x] If token is not found, terminate the request and send 401 request denied error.
      - [x] Otherwise, decode the token using the `jsonwebtoken` module.
        - [x] If the token is invalid, send 400 Bad Request error to the client with a message that the token is not valid
        - [x] If token is valid, then extract the payload, and populate the `req.user` property, so that further middlewares or route handlers can make use of the payload data
      - [x] If we were able to successfully decode the `jwt` that means user is authorized, and logged in. Now after populating the `req.user` property, we can pass control to the next middleware or route handler function by calling `next()`
- [x] Create a middleware function to verify that a user is Admin
  - [x] Some routes are to be protected such that only users with Admin privileges can access them. We will include the properties related to roles in our `jwt` payload, so that we can directly authorize the Admin user without having to look up into our database to check if the user is Admin.
  - [x] This middleware must be executed only after the first authorization middleware has been executed, i.e. the user is verified that he is logged in with a valid `jwt`, and the `req.user` property is populated
  - Logic to be implemented:
    - [x] Since we have an isAdmin property (Boolean) in our User's document, all we have to do is check if the isAdmin property in `req.user` (populated by first authorization middleware) set to true (if true, user is admin)
      - [x] If isAdmin = False, it means that the user is not an Admin, and he is not supposed to access this route, therefore terminate the request and send 403 Forbidden error with message that access denied
      - [x] If isAdmin = True, simply pass the control to the next middleware / route handler
- [x] Protecting the Routes
  - [x] **Genres API**
    - [x] Public access allowed (no login required)
      - [x] EndPoint for getting the list of all Genres
      - [x] EndPoint for getting a single Genre
    - [x] Only Logged In Users should be allowed to access these routes (Apply first authorization middleware `auth.js`)
      - [x] EndPoint for creating a new Genre
      - [x] EndPoint for updating existing Genres
    - [x] Only users with Admin privileges should be allowed to access these routes (Apply `auth.js` and `admin.js` ) 
      - [x] EndPoint for deleting existing Genres
  - [x] **Customers API**
    - [x] Only Logged In Users should be allowed to access these routes (Apply first authorization middleware `auth.js`)
      - [x] EndPoint for getting the list of all customers from the database
      - [x] EndPoint for getting a single customer document using id from the database
      - [x] EndPoint for creating a customer document in the database
      - [x] EndPoint for updating a customer document in the database
    - [x] Only users with Admin privileges should be allowed to access these routes (Apply `auth.js` and `admin.js` ) 
      - [x] EndPoint for Deleting a customer document in the database
  - [x] **Movies API**
    - [x] Public access allowed (no login required)
      - [x] Endpoint to get all movies
    - [x] Only Logged In Users should be allowed to access these routes (Apply first authorization middleware `auth.js`)
      - [x] Endpoint to create a new movie
      - [x] Endpoint to update a movie
      - [x] Endpoint to delete a move by its id
  - [x] **Rentals API**
    - [x] Only Logged In Users should be allowed to access these routes (Apply first authorization middleware `auth.js`)
      - [x] Endpoint to get the list of all rentals
      - [x] Endpoint to create a rental
  - [x] **Users API**
    - [x] Public access allowed (no login required)
      - [x] EndPoint to create a new user
    - [x] Only Logged In Users should be allowed to access these routes (Apply first authorization middleware `auth.js`)
      - [x] EndPoint to access user's personal profile
    - [x] Only users with Admin privileges should be allowed to access these routes (Apply `auth.js` and `admin.js` ) 
      - [x] EndPoint to access all users general profiles



### Refactor the Route Handlers: Express Error Middleware

In our current implementation, every route handler has a `try-catch` block. This is repetitive code in every `catch` block which we should move to the special Express Error Middleware Function.

#### Implement the Express Error Middleware

- [x] Make a new file in the *middleware/* folder named `error.js`
- [x] This file `error.js` should export a middleware function with four arguments: `error object`, `request object`, `response object` and the `next method`. It should have the following logic:
  - [ ] **TODO**: The logic to log errors
  - [x] Terminating the request-response cycle by sending a 500 Internal Server Error to the client with a friendly message.

#### Refactor the code to use Express Error Middleware

- [x] Replace the code in every route handler with a call to `next()` and pass the exception object to this method.
- [x] Import this error middleware function in the `index.js` file and register it after all the route handler middlewares.



### Refactor the Route Handlers: Remove Try-Catch Blocks

Right now in every Route Handler function we have a `try-catch` block. This distracts us from the actual logic inside these Route Handlers, and only adds extra noise to our code. Also, a part of the code is still being repeated, every `catch` block is still the same in every route handler, the only code that differs is the code inside the `try` block.

Ideally, we should move this high level code somewhere else in a single function. We need to have a template like function.

In order to do this, we have to satisfy two constraints: 

- The `app.get()` method requires a <u>function reference</u> which can accept the parameters: `request object`, `response object` and the `next method`.
- We need to pass the route handler function as an argument to our template `asyncMiddleware` function, so we compulsorily need to call this template function and pass our route handler function as an argument.

In order to satisfy both these constraints, our **`asyncMiddleware` function should behave like a factory function, i.e. whenever we call it and pass a route handler function, it should wrap this route handler function inside a `try-catch` block and return the whole thing as a new route handler function.**

Essentially this is what will happen:

- We will call this `asyncMiddleware` function inside `app.get()` or `router.get()`  or other http methods and pass our route handler function (without any try-catch block).
- Since express http methods require a <u>function reference</u> and not a function call, our `asyncMiddleware` function will return a function reference to a new route handler (wrapped in a try-catch block), which then express can call it during the runtime and pass `req`, `res` and `next` arguments.

#### Implement the `asyncMiddleware` factory function

- [x] `asyncMiddleware` should take in a route handler as an argument. This route handler will be an `async` function.
- [x] `asyncMiddleware` should return an anonymous `async` function definition
  - [x] This anonymous `async` function should accept three parameters: `req` a request object, `res` a response object, and `next` a method referencing to the next middleware. Express will call this anonymous function at runtime, and pass these three parameters at runtime.
  - [x] This anonymous `async` function should only contain a `try-catch` block.
    - [x] In the `try` block, we simply call and `await` for the route handler function that was passed as an argument to the `asyncMiddleware` function. <u>We also pass the the `req` and `res` as arguments to this route handler function call.</u>
    - [x] In the `catch` block, we simply call the `next()` method and pass our exception object to it as `next(exception)`. This tells express that in case of an exception, it must pass control to the special error middleware that we implemented in `error.js` and registered in `index.js` after all route handler middlewares.

#### Refactor the code to use `asyncMiddleware` and remove `try-catch`

- [x] In every module inside `routes/` folder where where have route handlers:
  - [x] Import the `asyncMiddleware` function using require statement
  - [x] In each route handler:
    - [x] Extract the code inside the `try` block to outside the `try` block, then remove the `try-catch` block.
    - [x] Wrap the route handler function inside the `asyncMiddleware` function call.

### Implement logic to log the errors in a log file

- [x] Install package `winston`
- [x] In the Express Error Middleware, implement logic to store all errors in a `logFile.log` file.
- [x] In the `index.js` implement logic to handle all unexpected exceptions, also log them.
- [x] In the `index.js` implement logic to handle all unexpected promise rejections, also log them.

### Refactor `index.js`

In `index.js`, currently we have a lack of separation of concerns. The are too many <u>require statements</u> in our `index.js`. Then we have code for handling and logging errors. Then we have something completely different, like configuration. Then we have logic for connecting to the database. Then we set up routes, middlewares etc... These are all different concerns, and mixing them together in a single module is not at all good.

Our `index.js` module should only <u>orchestrate</u> these different concerns. So, the details of this orchestration should be moved into other modules. For example, setting up routes and connecting to database are separate concerns, so they should be put in their own modules.

We can create a new folder named `startup/` where we can create new modules for each of these concerns and store details(code) there.



#### Extract all routes to a separate module

- [x] Create a new module named `startup/routes.js`
- [x] This module should export a function, which should take in `app` object of `expressjs` as an argument.
  - [x] We do this because we want to have a single `app` object in our entire application. We don't want to load express and create a new `app` object for each module. So, we pass a reference to this module while requiring it by calling the exported function and passing the `app` object.
- [x] Move all the code that require our route handler modules to this file
- [x] Move all the route handler middlewares to this file 
- [x] Move all the other dependencies that are required
- [x] Finally import this module in `index.js` and then call it to set up the routes



#### Extract and Refactor the database logic to a separate module

- [x] Create a new module named `startup/db.js`

- [x] This module should export a function, which when called will setup and connect our application to the database

- [x] Move the `mongoose.connect()` logic from `index.js` to `startup/db.js` along with all the dependencies, and remove them from `index.js`

- [x] Refactor the code:

  - [x] Currently our db initialisation looks like this:

    ```javascript
    mongoose
    	.connect(connStr, { useNewUrlParser: true, useUnifiedTopology: true })
    	.then(() => {
    		console.log('Connected to the database');
    	})
    	.catch(err => {
    		console.log('Could not connect to mongoDB', err);
    	});
    ```

    **Here, in the `.then()` block, we are simply printing to the console, we must instead use `winston` to log an informational message to our logs.**

    **Also, we have called `.catch()`, but we are not really doing anything here, in reality, if there is any error, we must log in using `winston`. So, what we should do is remove the `.catch()` block completely, so that it will become an unhandled promise rejection upon failure. This will then be catched by our global unhandled promise rejection handler logic automatically and logged into our logs and our process will be terminated.**



#### Extract the logging logic to a separate module

- [x] Create a new module named `startup/logging.js`
- [x] This module must export a function, which when called should setup the logic to handle and log unhandled exceptions and promise rejections



#### Extract the config logic to a separate module

- [x] Create a new module named `startup/config.js`
- [x] This module should export a function, which when called should check if essential config settings like if environment variables are set and so on...
- [x] Extract all the logic for checking essential config settings like if environment variables are set and so on... and move it to this module
- [x] Also, instead of manually logging an error here, throw an exception with `Error` object so that our global unhandled exception handler catches it. Don't simply throw a string error, as `Error` object will contain a stack trace, normal string won't contain that. 



# References

[API Documentation Style Guide](https://gist.github.com/iros/3426278)

[NodeJs Course](https://www.udemy.com/course/nodejs-master-class/)

