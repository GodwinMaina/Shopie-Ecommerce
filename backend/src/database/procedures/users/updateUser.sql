
CREATE OR ALTER PROCEDURE updateUser(
    @user_id VARCHAR(250),
    @firstName VARCHAR(250),
    @lastName VARCHAR(250),
    @email VARCHAR(250), 
    @password VARCHAR(250) 
)

AS
BEGIN
    UPDATE Users 
    SET 
        firstName = @firstName,
        lastName = @lastName,
        email = @email,
        password = @password
        
    WHERE user_id = @user_id;
END
