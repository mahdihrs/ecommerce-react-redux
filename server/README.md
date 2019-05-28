# mini-wordpress-server

### User End Points
|Route|HTTP|Header(s)|Body|Description|Success|Error
|---------|---------|---------|---------|---------|-------------|---------------|
|_/users/register_|**POST**|none|name, email, password, address|Manual sign up|Status(201); Data: {...} | 1. Status(400); [ ... ] 2. Status(500); {...}|
|_/users/login_|**POST**|none|email, password|Login|Status(200); Data: {...} | 1. Status(422); {...} 2. Status(500); {...}|
|_/users_|**GET**|none|none|Get all users|Status(200); [{ ... }] | 1. Status(500); {...}|
|_/users/:id_|**GET**|none|none|Find a user|Status(200); Data: { ... } | 1. Status(500); {...}|
|_/users/:id_|**PATCH**|none|access_token|Edit a user|Status(200); { ... } | 1. Status(500); {...}|


### Products End Points
|Route|HTTP|Header(s)|Body|Description|Success|Error
|---------|---------|---------|---------|---------|-------------|---------------|
|_/products/_|**GET**|none|none|Get all products|Status(200); [{...}] | 1. Status(500); {...}|
|_/products_|**POST**|access_token|name, description, stock, price, image|Add Product|Status(201); { ...} | 1. Status(400); [ ... ] 2. Status(500); {...}|
|_/products/:id_|**GET**|none|none|Find a product|Status(200); { ... } | 1. Status(500); {...}|
|_/products/:id_|**PUT**|access_token|none|Edit product|Status(200); { ... } | 1. Status(400); [ ... ] 2. Status(500); {...}|
|_/products/:id_|**DELETE**|access_token|none|Remove a product|Status(200); { ... } | 1. Status(500); {...} |

### Cart End Points
|Route|HTTP|Header(s)|Body|Description|Success|Error
|---------|---------|---------|---------|---------|-------------|---------------|
|_/carts_|**GET**|access_token|none|Find user cart|Status(200); Data: {...} | 1. Status(500); {...} |
|_/carts_|**POST**|access_token|user, products|Add Cart|Status(201); Data: { ...} | 1. Status(500); {...} |
|_/carts_|**DELETE**|access_token|none|Clear cart|Status(200); { ... } | 1. Status(500); {...} |
|_/carts/remove-products/:productId_|**PUT**|access_token|none|Remove a kind of product from cart|Status(200); { ... } | 1. Status(500); {...} |
|_/carts/add-to-cart/:productId_|**PUT**|access_token|none|Add a piece of product in cart|Status(200); { ... } | 1. Status(500); {...} |
|_/carts/remove-product-from-cart/:productId_|**PUT**|access_token|none|Remove a piece of product in cart|Status(200); { ... } | 1. Status(500); {...} |

### Transaction End Points
|Route|HTTP|Header(s)|Body|Description|Success|Error
|---------|---------|---------|---------|---------|-------------|---------------|
|_/transactions_|**GET**|access_token|none|Get all transactions|Status(200); Data: [{...}] | 1. Status(500); { ... }|
|_/transactions_|**POST**|access_token|cart [{...}], price | Create transactions|Status(201); Data: { ... } | 1. Status(400) [ ... ] 2. Status(500); { ... }|
|_/transactions/:id_|**GET**|access_token|none|Find a transaction|Status(200); Data: { ... } | 1. Status(500); { ... }|
|_/transactions/my-transactions|**GET**|access_token|none|Get user's transactions | Status(200); Data: [{ ... }] | 1. Status(400); [ ... ] 2. Status(500); {...}|
|_/transactions/confirmation/:id_|**PUT**|access_token|none|User's confirmation when the product(s) arrived|Status(200); { ... } | 1. Status(500) { ... } |

## Usage
```
npm install
npm start
live-server --host=localhost (Run it on client side)
```
> Run on http://localhost:8080