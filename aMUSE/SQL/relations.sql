/*
User(id, email, password)
PersonalPhoto(id, commento)
Object(id, name, exhibition, sector)
UserPhoto(user_id, personal_photo_id)
PhotoReference(personal_photo_id, object_id)
UserBookmark(user_id, object_id)
UserComment(user_id, object_id, comment, verified)
*/

CREATE TABLE `User` (
`user_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
`email` VARCHAR(255) UNIQUE KEY,
`password` CHAR(32) NOT NULL
) ENGINE=INNODB;

CREATE TABLE `PersonalPhoto` (
`personal_photo_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
`comment` TEXT
) ENGINE=INNODB;

CREATE TABLE `Object` (
`object_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
`name` VARCHAR(255) UNIQUE KEY,
`exhibition` INT UNSIGNED INDEX,
`section` INT UNSIGNED INDEX
) ENGINE=INNODB;

CREATE TABLE `UserPhoto` (
`user_id` INT UNSIGNED,
`personal_photo_id` INT UNSIGNED,
PRIMARY KEY (`user_id`, `personal_photo_id`),
CONSTRAINT FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`),
CONSTRAINT FOREIGN KEY (`personal_photo_id`) REFERENCES `PersonalPhoto`(`personal_photo_id`)
) ENGINE=INNODB;

CREATE TABLE `PhotoReference` (
`personal_photo_id` INT UNSIGNED,
`object_id` INT UNSIGNED,
PRIMARY KEY (`personal_photo_id`, `object_id`),
CONSTRAINT FOREIGN KEY (`object_id`) REFERENCES `Object`(`object_id`),
CONSTRAINT FOREIGN KEY (`personal_photo_id`) REFERENCES `PersonalPhoto`(`personal_photo_id`)
) ENGINE=INNODB;

CREATE TABLE `UserBookmark` (
`user_id` INT UNSIGNED,
`object_id` INT UNSIGNED,
PRIMARY KEY (`user_id`, `object_id`),
CONSTRAINT FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`),
CONSTRAINT FOREIGN KEY (`object_id`) REFERENCES `Object`(`object_id`)
) ENGINE=INNODB;

CREATE TABLE `UserComment` (
`user_id` INT UNSIGNED,
`object_id` INT UNSIGNED,
`comment` TEXT NOT NULL,
`verified` BOOLEAN NOT NULL INDEX,
PRIMARY KEY (`user_id`, `object_id`),
CONSTRAINT FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`),
CONSTRAINT FOREIGN KEY (`object_id`) REFERENCES `Object`(`object_id`)
) ENGINE=INNODB;