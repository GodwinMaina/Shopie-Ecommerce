CREATE OR ALTER PROCEDURE createCart (
    @user_id VARCHAR(250),
    @cart_id VARCHAR(250), 
    @product_id VARCHAR(250),
    @name NVARCHAR(250),
    @category VARCHAR(250),
    @description NVARCHAR(250),
    @price VARCHAR(250),
    @quantity VarChar(250),
    @image NVARCHAR(250)
)
AS
BEGIN
    INSERT INTO Cart(cart_id, user_id, product_id, name, description, price, category, quantity, image)
    VALUES(@cart_id, @user_id, @product_id, @name, @description, @price, @category, @quantity, @image)
END