 CREATE TABLE `player` (
	`player_id` INT NOT NULL AUTO_INCREMENT,
	`user_name` VARCHAR(255) UNIQUE,
	`avatar` VARCHAR(255),
	`is_playing` BOOLEAN NOT NULL,
	`wins` INT NOT NULL,
	`loses` INT NOT NULL,
	`authentification_token` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`player_id`)
);

CREATE TABLE `messages` (
	`id_msg` INT NOT NULL AUTO_INCREMENT,
	`content` TIME,
	`created_at` DATETIME NOT NULL,
	`chat_room` INT NOT NULL AUTO_INCREMENT,
	`player` INT NOT NULL,
	PRIMARY KEY (`id_msg`)
);

CREATE TABLE `Game_history` (
	`id_game` INT NOT NULL AUTO_INCREMENT,
	`winner_id` INT NOT NULL,
	`loser_id` INT NOT NULL,
	`winner_score` INT NOT NULL,
	`loser_score` INT NOT NULL,
	`played_at` DATETIME NOT NULL,
	PRIMARY KEY (`id_game`)
);

CREATE TABLE `chat_room` (
	`chat_id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL UNIQUE,
	`is_channel` BOOLEAN NOT NULL,
	`is_Public` BOOLEAN NOT NULL,
	`password` VARCHAR(255) NOT NULL,
	`created_at` DATETIME NOT NULL,
	`update_at` DATETIME NOT NULL,
	PRIMARY KEY (`chat_id`)
);

CREATE TABLE `membership` (
	`id_membership` INT NOT NULL AUTO_INCREMENT,
	`role` VARCHAR(255),
	`is_banned` BOOLEAN,
	`is_muted` BOOLEAN,
	`chat_id` INT NOT NULL,
	`player` INT NOT NULL,
	PRIMARY KEY (`id_membership`)
);

CREATE TABLE `relationship` (
	`id_relation` BINARY NOT NULL AUTO_INCREMENT,
	`creator` INT NOT NULL AUTO_INCREMENT,
	`reciver` INT NOT NULL AUTO_INCREMENT,
	`relation status` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id_relation`)
);

ALTER TABLE `messages` ADD CONSTRAINT `messages_fk0` FOREIGN KEY (`chat_room`) REFERENCES `chat_room`(`chat_id`);

ALTER TABLE `messages` ADD CONSTRAINT `messages_fk1` FOREIGN KEY (`player`) REFERENCES `player`(`player_id`);

ALTER TABLE `Game_history` ADD CONSTRAINT `Game_history_fk0` FOREIGN KEY (`winner_id`) REFERENCES `player`(`player_id`);

ALTER TABLE `Game_history` ADD CONSTRAINT `Game_history_fk1` FOREIGN KEY (`loser_id`) REFERENCES `player`(`player_id`);

ALTER TABLE `membership` ADD CONSTRAINT `membership_fk0` FOREIGN KEY (`chat_id`) REFERENCES `chat_room`(`chat_id`);

ALTER TABLE `membership` ADD CONSTRAINT `membership_fk1` FOREIGN KEY (`player`) REFERENCES `player`(`player_id`);

ALTER TABLE `relationship` ADD CONSTRAINT `relationship_fk0` FOREIGN KEY (`creator`) REFERENCES `player`(`player_id`);

ALTER TABLE `relationship` ADD CONSTRAINT `relationship_fk1` FOREIGN KEY (`reciver`) REFERENCES `player`(`player_id`);

