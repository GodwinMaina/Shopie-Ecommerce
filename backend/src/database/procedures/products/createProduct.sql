
CREATE OR ALTER PROCEDURE createProduct(
    @product_id VARCHAR(250),
    @name VARCHAR(250),
    @image VARCHAR(250),
    @description VARCHAR(250),
    @quantity VARCHAR(250),
    @category VARCHAR(250),
    @price VARCHAR(250)  
)
AS
BEGIN
    INSERT INTO Products (product_id, name ,image ,description,quantity,category,price )
    VALUES (@product_id, @name, @image, @description, @quantity, @category, @price)
END

