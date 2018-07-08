DROP TABLE IF EXISTS users;

CREATE TABLE users(
   id SERIAL PRIMARY KEY,
   first VARCHAR(200) NOT NULL,
   last VARCHAR(200) NOT NULL,
   email VARCHAR(200) NOT NULL UNIQUE,
   hash_password VARCHAR(100) NOT NULL,
   image VARCHAR(350),
   bio VARCHAR(350)
);

DROP TABLE IF EXISTS friendships;
CREATE TABLE friendships(
	id SERIAL PRIMARY KEY,
	sender_id INTEGER NOT NULL,
	recipient_id INTEGER NOT null,
	status INTEGER,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS chatmessages;
CREATE TABLE chatmessages(
	id SERIAL PRIMARY KEY,
	sender_id INTEGER NOT NULL,
	message VARCHAR(350),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO friendships (sender_id, recipient_id, status) VALUES (
    2,
	3,
    1
);
