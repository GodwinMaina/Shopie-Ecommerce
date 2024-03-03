
CREATE OR ALTER PROCEDURE userRegister
   ( @user_id NVARCHAR(250),
    @firstName NVARCHAR(250),
    @lastName NVARCHAR(250),
    @email NVARCHAR(250),
    @password NVARCHAR(250)
    )
AS
BEGIN
    INSERT INTO Users (user_id, firstName, lastName, email, password)
    VALUES (@user_id, @firstName, @lastName, @email, @password)
END
