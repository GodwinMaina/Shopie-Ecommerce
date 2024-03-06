CREATE TABLE Kings (
    cart_id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    products TEXT,
    isPaid BIT DEFAULT 0
);