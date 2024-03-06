CREATE OR ALTER PROCEDURE CartAdd (
    @cart_id VARCHAR(255), 
    @user_id VARCHAR(255),
    @products NVARCHAR(MAX) 
)
AS
BEGIN
    INSERT INTO Kings(cart_id, user_id,products)
    VALUES(@cart_id, @user_id, @products)
END