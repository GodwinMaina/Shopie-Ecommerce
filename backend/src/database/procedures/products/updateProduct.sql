
CREATE OR ALTER PROCEDURE updateProduct(
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
    UPDATE Products

    SET 
      name = @name,
      image = @image,
      description = @description,
      quantity = @quantity,
      category =@category,
      price = @price
        
    WHERE product_id = @product_id;
END
