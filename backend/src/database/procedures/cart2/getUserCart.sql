CREATE OR ALTER PROCEDURE getUserCart (@user_id VARCHAR(250))
AS
BEGIN
SELECT * FROM Carty
WHERE user_id = @user_id
END


