# Open Commerce

Creator: Yan Hong (http://onlyhongyan.com)

## Run Server

`npm start` or `node server.js`

## API Docs

### Signup
POST

http://open-commerce.herokuapp.com/api/signup

Body
```
{
  username: String,
  password: String
}
```

### Login
POST

http://open-commerce.herokuapp.com/api/login

Body
```
{
  username: String,
  password: String
}
```
Response
```
{
  "success": true,
  "message": "Enjoy your token!",
  "token": "TOKEN"
}
```

### List Products
GET

http://open-commerce.herokuapp.com/api/products

Header
```
{
  x-access-token: "TOKEN"
}
```

### Product Detail

POST

http://open-commerce.herokuapp.com/api/products/:product_id

Header
```
{
  x-access-token: "TOKEN"
}
```

### Create A Product
POST

http://open-commerce.herokuapp.com/api/products

Header
```
{
  x-access-token: "TOKEN"
}
```

Body
```
{
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  stock: Number
}
```

### Update Product Detail

PUT

http://open-commerce.herokuapp.com/api/products/:product_id

Header
```
{
  x-access-token: "TOKEN"
}
```
Body
```
{
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  stock: Number
}
```

### Delete A Product

DELETE

http://open-commerce.herokuapp.com/api/products/:product_id

Header
```
{
  x-access-token: "TOKEN"
}
```

### List Orders

GET

http://open-commerce.herokuapp.com/api/orders

Header
```
{
  x-access-token: "TOKEN"
}
```

### Create An Order

POST

http://open-commerce.herokuapp.com/api/orders/

Header
```
{
  x-access-token: "TOKEN"
}
```

Body
```
{
	"products": [String]
}
```

### Show Order Detail

GET

http://open-commerce.herokuapp.com/api/orders/:order_id

Header
```
{
  x-access-token: "TOKEN"
}
```

### Update An Order


### Delete An Order