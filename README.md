# vidly-app

Vidly is an imaginary service for renting out movies. This project is a part of *Mosh Hamedani's* Udemy course on *node.js* 

### Genres EndPoint

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

- [ ] Create a new folder named `routes` to store all our routes for various endpoints.
- [ ] We have already implemented the `generes` endpoint, move the code into a new file named `genres.js` and save it in `routes/` folder. 
- [ ] Refactor all the code in `index.js` as well as in `genres.js`