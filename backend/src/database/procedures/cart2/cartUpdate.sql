CREATE OR ALTER PROCEDURE updateCartItem(
    @user_id VARCHAR(250),
    @product_id VARCHAR(250),
    @quantity INT
)
AS
BEGIN
    UPDATE Carty
    SET quantity = @quantity
    WHERE user_id = @user_id AND product_id = @product_id;
END;
