CREATE OR ALTER PROCEDURE updateCart(
    @user_id VARCHAR(255),
    @cart_id VARCHAR(255),
    @products NVARCHAR(MAX),
    @date DATETIME
) AS 
BEGIN 
    UPDATE Cart 
    SET 
        cart_id = @cart_id,
        products = @products,
        [date] = @date
    WHERE 
        user_id = @user_id;
END;
