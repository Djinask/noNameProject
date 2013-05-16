/*
User(id, email, password)
Object(id, name, exhibition, sector)
PersonalPhoto(id, user_id, commento)
UserBookmark(user_id, object_id)
UserComment(user_id, object_id, comment, verified)
*/

USE `amuse`; 
/*seleziona il database in cui creare le tabelle*/

CREATE TABLE `aMuseUser` (
`user_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
`user_email` VARCHAR(255) UNIQUE KEY NOT NULL,
`user_password` CHAR(32) NOT NULL,
`user_reg_time` TIMESTAMP CURRENT_TIMESTAMP
) ENGINE=MYISAM;

CREATE TABLE `aMuseObject` (
`object_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
`object_name` VARCHAR(255) NOT NULL,
`exhibition_id` INT UNSIGNED NOT NULL,
`section_id` INT UNSIGNED NOT NULL,
`author_id` INT UNSIGNED NOT NULL,
`object_description` TEXT,
INDEX(`exhibition_id`, `section_id`, `author_id`, `object_name`),
FULLTEXT INDEX(`object_name`,`object_description`)
) ENGINE=MYISAM;

CREATE TABLE `aMuseExhibition` (
`exhibition_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
`exhibition_name` VARCHAR(255),
`exhibition_begin` DATE,
`exhibition_end` DATE,
`exhibition_description` TEXT,
INDEX(`exhibition_name`, `exhibition_begin`, `exhibition_end`),
FULLTEXT INDEX(`exhibition_name`,`exhibition_description`)
) ENGINE=MYISAM;

CREATE TABLE `aMuseSection` (
`section_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
`section_name` VARCHAR(255),
INDEX(`section_name`),
FULLTEXT INDEX(`section_name`)
) ENGINE=MYISAM;

CREATE TABLE `aMuseAuthor` (
`author_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
`author_name` VARCHAR(255),
INDEX(`author_name`),
FULLTEXT INDEX(`author_name`)
) ENGINE=MYISAM;

CREATE TABLE `aMusePersonalPhoto` (
`personalphoto_id` INT UNSIGNED AUTO_INCREMENT,
`user_id` INT UNSIGNED NOT NULL,
`object_id` INT UNSIGNED NOT NULL,
`visit_id` INT UNSIGNED NOT NULL,
`personalphoto_name` VARCHAR(255),
`personalphoto_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
`personalphoto_comment` TEXT,
PRIMARY KEY (`personalphoto_id`),
INDEX(`user_id`,`visit_id`,`object_id`,`personalphoto_time`)
) ENGINE=MYISAM;

CREATE TABLE `aMuseVisit` (
`visit_id` INT UNSIGNED AUTO_INCREMENT,
`user_id` INT UNSIGNED,
`visit_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`user_id`, `visit_id`)
) ENGINE=MYISAM;

CREATE TABLE `aMuseUserBookmark` (
`user_id` INT UNSIGNED,
`object_id` INT UNSIGNED,
`visit_id` INT UNSIGNED,
PRIMARY KEY (`user_id`, `object_id`),
INDEX(`visit_id`)
) ENGINE=MYISAM;