# Open Commerce

## MongoDB

Connect to DB via terminal
`mongo ds127938.mlab.com:27938/open-commerce -u yan -p hong`

## Run Server

`node server.js`

## API Docs

* Login
POST
http://open-commerce.herokuapp.com/api/login
body:
{
  username: String,
  password: String
}
response example:
{
  "success": true,
  "message": "Enjoy your token!",
  "token": "TOKEN"
}


* Signup
POST
http://open-commerce.herokuapp.com/api/signup
{
  username: String,
  password: String
}

* List Products
GET
http://open-commerce.herokuapp.com/api/products
Header:
{
  x-access-token: "TOKEN"
}

* Create Products
POST
http://open-commerce.herokuapp.com/api/products
Header:
{
  x-access-token: "TOKEN"
}
Body:
{
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  stock: Number
}

* Show Product Detail
POST
http://open-commerce.herokuapp.com/api/products/:product_id
Header:
{
  x-access-token: "TOKEN"
}

* Update Product Detail
PUT
http://open-commerce.herokuapp.com/api/products/:product_id
Header:
{
  x-access-token: "TOKEN"
}
Body:
{
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  stock: Number
}

* Update Product Detail
DELETE
http://open-commerce.herokuapp.com/api/products/:product_id
Header:
{
  x-access-token: "TOKEN"
}

* List Orders
GET
http://open-commerce.herokuapp.com/api/orders
Header:
{
  x-access-token: "TOKEN"
}

* Show Orders Detail
GET
http://open-commerce.herokuapp.com/api/orders/:order_id
Header:
{
  x-access-token: "TOKEN"
}