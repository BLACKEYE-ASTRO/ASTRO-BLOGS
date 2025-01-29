CREATE DATABASE blogdb;

\c blogdb;

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO blogs (title, image, description,)
VALUES 
('Is it worth investing in real estate?', 'https://picsum.photos/id/200/300/200', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...', 0),
('Technology trends in 2025', 'https://picsum.photos/id/208/300/200', 'This blog explores the upcoming technology trends...', 5),
('How to travel on a budget?', 'https://picsum.photos/id/203/300/200', 'Traveling doesn''t have to be expensive. Here are some tips...', 3);

