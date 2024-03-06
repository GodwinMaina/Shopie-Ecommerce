

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



Delete Cart


SELECT *FROM Cart

DROP TABLE Cart;


-- SELECT * FROM cart
-- ALTER TABLE cart
-- ALTER COLUMN products NVARCHAR(MAX);

-- DELETE FROM cart WHERE id ='d94eaad7-ba18-4222-b676-2d325f2f2ad6'
-- DELETE FROM cart
-- ALTER TABLE cart
-- ADD isPaid BIT DEFAULT 0;