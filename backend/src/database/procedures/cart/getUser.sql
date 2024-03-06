CREATE OR ALTER PROCEDURE getUserCart 
    @user_id VARCHAR(255)
AS
BEGIN
    -- Check if the user ID exists
    IF EXISTS (SELECT 1 FROM Users WHERE user_id = @user_id)
    BEGIN
        -- Retrieve cart records for the specified user
        SELECT * FROM Cart WHERE user_id = @user_id;
    END
    ELSE
    BEGIN
        -- User ID does not exist, raise an error
        DECLARE @ErrorMessage NVARCHAR(4000) = 'User ID ' + @user_id + ' does not exist';
        RAISERROR(@ErrorMessage, 16, 1);
    END
END
