CREATE TABLE Cart (
    cart_id VARCHAR(250) PRIMARY KEY,
    user_id VARCHAR(250),
    product_id VARCHAR(250),
    name NVARCHAR(250),
    description NVARCHAR(250),
    price VarChar(250),
    quantity VarChar(250),
    category NVARCHAR(250),
    image NVARCHAR(250),
    isPaid BIT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);