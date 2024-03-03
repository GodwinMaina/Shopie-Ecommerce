
CREATE OR ALTER PROCEDURE loginUser(@email VARCHAR(250), @password VARCHAR(250))
AS
BEGIN
    SELECT * FROM Users WHERE email = @email
END
