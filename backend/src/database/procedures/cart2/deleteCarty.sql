CREATE OR ALTER PROCEDURE deleteCarty(@cart_id VARCHAR(255))
AS
BEGIN
    DELETE FROM Carty WHERE cart_id = @cart_id
END