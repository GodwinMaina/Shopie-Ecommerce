CREATE OR ALTER PROCEDURE deleteProduct(
    @product_id VARCHAR(250)
    )
AS
BEGIN
    DELETE FROM Products WHERE product_id = @product_id;
END
