USE poke_corp;

-- CREATE TABLE IF NOT EXISTS pokemon_type (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(50) UNIQUE NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS town (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(50) UNIQUE NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS trainer (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(50) NOT NULL,
--     town_id INT,
--     FOREIGN KEY (town_id) REFERENCES town(id)
-- );

-- CREATE TABLE IF NOT EXISTS pokemon (
--     id INT PRIMARY KEY,
--     name VARCHAR(50) NOT NULL,
--     height FLOAT,
--     weight FLOAT,
--     type_id INT,
--     FOREIGN KEY (type_id) REFERENCES pokemon_type(id)
-- );

-- CREATE TABLE IF NOT EXISTS pokemon_trainer (
--     pokemon_id INT,
--     trainer_id INT,
--     PRIMARY KEY (pokemon_id, trainer_id),
--     FOREIGN KEY (pokemon_id) REFERENCES pokemon(id),
--     FOREIGN KEY (trainer_id) REFERENCES trainer(id)
-- );