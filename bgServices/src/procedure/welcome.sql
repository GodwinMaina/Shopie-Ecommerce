CREATE PROCEDURE WELCOMEUSER
AS
BEGIN
    SELECT *
    FROM Users
    WHERE isWelcomed = 0 and isDeleted = 0
END


UPDATE Users 
SET isWelcomed = 0
