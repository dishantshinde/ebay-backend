# Backend for eBay Backend

This is the backend for the eBay clone project. It is built using Node.js and Express to handle server-side logic and API requests.

## Features

- RESTful API for handling requests.
- CRUD operations (Create, Read, Update, Delete).
- Database integration using [MySQL/MongoDB/Your Database].
- Authentication (Optional: JWT, OAuth, etc.).
- CORS support for handling cross-origin requests.

## Prerequisites

Before running the project, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (v12 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/dishantshinde/ebay-backend.git
   ```

2. Navigate to project directory:
   cd ebay-backend
3. Install dependencies:
   npm install
   To Start backend server:
   npm start
   This will start the server on the default port 4000.

API Documentation
This project provides a set of RESTful APIs to manage product and user data. Below are the details of the available endpoints, their request types, parameters, and responses.

Product Routes

Add Products
Endpoint: /products
Method: POST
Description: Adds a new product with associated deals to the database.

Request Body:
{
"data": {
"product": [
{
"productPhoto": "string",
"productPrice": "string",
"productTitle": "string",
"productAsin": "string"
}
],
"deals": [
{
"dealBadge": "string",
"dealTitle": "string",
"dealPhoto": "string",
"dealUrl": "string",
"dealType": "string",
"dealId": "string",
"productAsin": "string"
}
]
}
}
Responses:
201: {
"message": "Products added to the database successfully",
"newData": {}
}
400:{ "message": "Data incomplete" }
500:{ "message": "Server error" }
Add All Products
Endpoint: /allproducts
Method: POST
Description: Adds multiple products to the database.

Request Body:
[
{
"productPhoto": "string",
"productTitle": "string",
"productAsin": "string"
}
]
Responses:
201:{ "message": "All products added to the database" }
500:{ "message": "Server error" }
Get Products by Search

Endpoint: /getsearched
Method: GET
Description: Retrieves products based on a search query.
Query Parameters:
search (string): The search term to match against product titles.
Responses:
200:{
"message": "Products retrieved",
"products": []
}
500:{ "message": "Server error" }
Get Dashboard Products

Endpoint: /dashboardData
Method: GET
Description: Retrieves the first set of products and deals for the dashboard.
Responses:
200:
{ "products": [] }
500:{ "message": "Server error" }
User Routes

Add User on Login

Endpoint: /user/login
Method: POST
Description: Adds a new user or retrieves existing user data.
Request Body:
{
"email": "user@example.com"
}
Responses:
201:{ "message": "New user added successfully" }
200:{ "message": "User already exists", "user": {} }
400:{ "message": "Email is required" }
500:{ "message": "Server error" }

Add User Orders

Endpoint: /user/orders
Method: POST
Description: Adds a new order to the user's account.
Request Body:
{
"email": "user@example.com",
"cartlist": [
{
"image": "string",
"name": "string",
"quantity": 1,
"price": "string"
}
],
"order": {
"totalItems": 1,
"totalAmount": 100
}
}
Responses:
201:{
"message": "Order added to the user's orders",
"orders": []
}
400:{ "message": "User not found" }
500:{ "message": "Server error" }

Get All Orders
Endpoint: /user/orders
Method: GET
Description: Retrieves all orders for a specific user.

Query Parameters:
email (string): The email of the user.
Responses:
200: { "data": [] }
400: { "message": "User not found" }
500: { "message": "Server error" }

Remove Order

Endpoint: /user/orders/remove
Method: DELETE
Description: Removes an order from a user's account.

Request Body:

{
"email": "user@example.com",
"id": "order_id"
}
Responses:
200:
{ "message": "Order removed successfully" }
400:
{ "message": "User not found" }
404:
{ "message": "Order not found" }
500:
{ "message": "Server error" }

Deployment
To deploy this project on a platform like Render, follow these steps:

Push your code to a Git repository (e.g., GitHub).
Connect the repository to Render and create a new web service.
Set the build and start commands:
Build Command: npm install
Start Command: npm start
Configure environment variables in the Render dashboard.
Contributing
Contributions are welcome! Please follow these steps to contribute:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Commit your changes (git commit -m "Add a new feature").
Push to the branch (git push origin feature-branch).
Open a Pull Request.
