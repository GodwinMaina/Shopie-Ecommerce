CREATE OR ALTER PROCEDURE getCartItem(

    @user_id VARCHAR(250),

    @product_id VARCHAR(250)
)
AS
BEGIN
    SELECT *
    FROM Carty
    WHERE user_id = @user_id AND product_id = @product_id;
END;
