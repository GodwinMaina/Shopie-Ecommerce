CREATE OR ALTER PROCEDURE deleteCart(@cart_id VARCHAR(255))
AS
BEGIN
    DELETE FROM Cart WHERE cart_id = @cart_id
END