
CREATE OR ALTER PROCEDURE resetPassword(@email VARCHAR(250), @password VARCHAR(250))
AS
BEGIN
    UPDATE Users SET password = @password WHERE email=@email
END