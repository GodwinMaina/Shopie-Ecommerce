

CREATE TABLE Users
(
     user_id VARCHAR(250) PRIMARY KEY,
     firstName VARCHAR(250) NOT NULL,
     lastName VARCHAR(250) NOT NULL,
     email VARCHAR(250) NOT NULL UNIQUE,
     password VARCHAR(250) NOT NULL,
     isAdmin BIT DEFAULT 0,
     isDeleted BIT DEFAULT 0 
)


SELECT *FROM Users


UPDATE Users
SET isAdmin=1
 WHERE email='chombasheila980@gmail.com'