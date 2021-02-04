[toc]

# vidly-app

Vidly is an imaginary service for renting out movies. This project is a part of *Mosh Hamedani's* Udemy course on *node.js* 



### Genres API

Create a service for managing the list of movie genres. 

Route: `http://vidly.com/api/genres`

**Rubric**

- [x] EndPoint for getting the list of all Genres
- [x] EndPoint for getting a single Genre
- [x] EndPoint for creating a new Genre
- [x] EndPoint for updating existing Genres
- [x] EndPoint for deleting existing Genres

### Restructure the vidly-app

So far everything we have built will be in one file. It is not a good way to build an app. So, let's restructure it in a clean and manageable way.

**Rubric**

- [x] Create a new folder named `routes` to store all our routes for various endpoints.
- [x] We have already implemented the `generes` endpoint, move the code into a new file named `genres.js` and save it in `routes/` folder. 
- [x] Refactor all the code in `index.js` as well as in `genres.js`

### Add Persistence to Genres API

So far we have been storing our data in arrays, and all the data was wiped out once the code restarted. Now that we know how to work with `MongoDB` database let's add persistence to our project.

**Rubric**

- [x] Get rid of all the arrays
- [x] Create a new database for storing all the data for our vidly-app
- [x] Refactor the code to use our new database while retaining all existing functionalities



### Customers API

Create a service to manage the details of customers

Route: `http://vidly.com/api/customers`

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

### Restructure the vidly-app

**To keep our applications maintainable, we should ensure that each module is responsible for only and only one thing. This is called <u>Single Responsibility Principle</u>**

If you look at our app now, the `routes/genres.js`, and the `route/customers.js` have mongoose schemas, route handler functions, and `joi` validation schema+function. 

This makes the files too big ... <span style="color:red"><u>Difficult to Maintain!</u></span> 

Our route handler files should only be responsible to handle the routes, it should not be responsible for declaring schema and creating mongoose model. It should also not have the `Joi` Validator functions.

- [x] Move the Schema and `Joi` validator functions to `models/genres.js` and `models/customers.js`  files.
- [x] Refactor  `routes/genres.js`, and the `route/customers.js`

Now we have a singular responsibility for  `routes/genres.js`, and the `route/customers.js` and also for `models/genres.js` and `models/customers.js`



### Movies API

Create a new service to manage the catalogue of movies.

Route: `http://vidly.com/api/movies`

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

### Adding Authentication and Authorization

Nearly all applications out there require some kind of *authentication* and *authorization*

#### Authentication (Users API & Login API)

The process of identifying if a person is who they claim they are.

That is verifying credentials at the time on logging in.

- **Create a new service for managing the users**

  Route: `http://vidly.com/api/users`

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

  Route: `http://vidly.com/api/login`

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

- [ ] Make a new file in the *middleware/* folder named `error.js`
- [ ] This file `error.js` should export a middleware function with four arguments: `error object`, `request object`, `response object` and the `next method`. It should have the following logic:
  - [ ] **TODO**: The logic to log errors
  - [ ] Terminating the request-response cycle by sending a 500 Internal Server Error to the client with a friendly message.