\connect pong_db;

CREATE TABLE player (
    id_player SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NOT NULL,
    level INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    wins INT NOT NULL,
    loses INT NOT NULL,
    two_fa BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE message (
    id_message SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE relation (
  id_relation SERIAL PRIMARY KEY,
  relationStatus VARCHAR(255),
  receiver INTEGER
);

CREATE TABLE Game_history (
  id_gamehistory SERIAL PRIMARY KEY,
  mode VARCHAR(255),
  winner INTEGER,
  loser INTEGER,
  winner_score INTEGER,
  loser_score INTEGER,
  created_at TIMESTAMP
);

CREATE TABLE chat_room (
  id_chatroom SERIAL PRIMARY KEY,
  name VARCHAR(255),
  isChannel BOOLEAN,
  isPublic BOOLEAN,
  password VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE membership (
  id_membership SERIAL PRIMARY KEY,
  role VARCHAR(255),
  isBanned BOOLEAN,
  isMuted BOOLEAN,
  user_id INTEGER,
  chatroom_id INTEGER
);

ALTER TABLE relation
  ADD FOREIGN KEY (receiver) REFERENCES player(id_player);

ALTER TABLE Game_history
  ADD FOREIGN KEY (winner) REFERENCES player(id_player),
  ADD FOREIGN KEY (loser) REFERENCES player(id_player);

ALTER TABLE message
  ADD COLUMN sender_id INTEGER;

ALTER TABLE message
  ADD FOREIGN KEY (sender_id) REFERENCES player(id_player);

ALTER TABLE membership
  ADD FOREIGN KEY (user_id) REFERENCES player(id_player);

ALTER TABLE message
  ADD COLUMN chatroom_id INTEGER;

ALTER TABLE message
  ADD FOREIGN KEY (chatroom_id) REFERENCES chat_room(id_chatroom);

ALTER TABLE membership
  ADD FOREIGN KEY (chatroom_id) REFERENCES chat_room(id_chatroom);


