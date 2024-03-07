CREATE TABLE Carty (

    cart_id VARCHAR(250) PRIMARY KEY,
    user_id VARCHAR(250) ,
    product_id VARCHAR(250) ,
    name NVARCHAR(250) ,
    description NVARCHAR(250) ,
    price VARCHAR(250) ,
    category VARCHAR(250) ,
    quantity INT ,
    image NVARCHAR(250) ,
     isPaid BIT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
