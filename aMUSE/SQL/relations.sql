/*
User(id, email, password)
Object(id, name, exhibition, sector)
PersonalPhoto(id, user_id, commento)
UserBookmark(user_id, object_id)
UserComment(user_id, object_id, comment, verified)
*/

USE `amuse`; 
/*seleziona il database in cui creare le tabelle*/

CREATE TABLE `User` (
`user_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
`email` VARCHAR(255) UNIQUE KEY NOT NULL,
`password` CHAR(32) NOT NULL
) ENGINE=INNODB;

CREATE TABLE `Object` (
`object_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
`name` VARCHAR(255) UNIQUE KEY NOT NULL,
`exhibition` INT UNSIGNED NOT NULL,
`section` INT UNSIGNED NOT NULL,
INDEX(`exhibition`, `section`)
) ENGINE=INNODB;

CREATE TABLE `PersonalPhoto` (
`personal_photo_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
`user_id` INT UNSIGNED NOT NULL,
`object_id` INT UNSIGNED NOT NULL,
`comment` TEXT,
CONSTRAINT FOREIGN KEY (`object_id`) REFERENCES `Object`(`object_id`) ON UPDATE CASCADE,
CONSTRAINT FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON UPDATE CASCADE
) ENGINE=INNODB;

CREATE TABLE `UserBookmark` (
`user_id` INT UNSIGNED,
`object_id` INT UNSIGNED,
PRIMARY KEY (`user_id`, `object_id`),
CONSTRAINT FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON UPDATE CASCADE,
CONSTRAINT FOREIGN KEY (`object_id`) REFERENCES `Object`(`object_id`) ON UPDATE CASCADE
) ENGINE=INNODB;

CREATE TABLE `UserComment` (
`user_id` INT UNSIGNED,
`object_id` INT UNSIGNED,
`comment` TEXT NOT NULL,
`verified` BOOLEAN NOT NULL,
INDEX(`verified`),
PRIMARY KEY (`user_id`, `object_id`),
CONSTRAINT FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON UPDATE CASCADE,
CONSTRAINT FOREIGN KEY (`object_id`) REFERENCES `Object`(`object_id`) ON UPDATE CASCADE
) ENGINE=INNODB;