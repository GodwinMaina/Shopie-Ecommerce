CREATE OR ALTER PROCEDURE insertCartItem(

    @cart_id VARCHAR(250),
     @user_id VARCHAR(250),
    @product_id VARCHAR(250),
    @name NVARCHAR(250),
    @description NVARCHAR(250),
    @price VARCHAR(250),
    @category VARCHAR(250),
    @quantity INT,
    @image NVARCHAR(250)
)
AS
BEGIN
    INSERT INTO Carty (cart_id,user_id, product_id, name, description, price, category, quantity, image)
    VALUES (@cart_id,@user_id, @product_id, @name, @description, @price, @category, @quantity, @image);
END;
