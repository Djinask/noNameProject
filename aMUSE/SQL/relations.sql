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
`id` UNSIGNED INT PRIMARY KEY AUTO_INCREMENT,
`email` VARCHAR(255) UNIQUE KEY,
`password` CHAR(32)
) ENGINE=INNODB, CHARACTER_SET=utf8, COLLATE=utf8_unicode_ci;

CREATE TABLE `PersonalPhoto` (
`id` UNSIGNED INT PRIMARY KEY AUTO_INCREMENT,
`comment` TEXT
) ENGINE=INNODB, CHARACTER_SET=utf8, COLLATE=utf8_unicode_ci;

CREATE TABLE `Object` (
`id` UNSIGNED INT PRIMARY KEY AUTO_INCREMENT,
`name` VARCHAR(255) UNIQUE KEY,
`exhibition` UNSIGNED INT INDEX,
`section` UNSIGNED INT INDEX
) ENGINE=INNODB, CHARACTER_SET=utf8, COLLATE=utf8_unicode_ci;

CREATE TABLE `UserPhoto` (
`user_id` UNSIGNED INT,
`personal_photo_id` UNSIGNED INT
) ENGINE=INNODB, CHARACTER_SET=utf8, COLLATE=utf8_unicode_ci;

CREATE TABLE `PhotoReference` (
`personal_photo_id` UNSIGNED INT,
`object_id` UNSIGNED INT
) ENGINE=INNODB, CHARACTER_SET=utf8, COLLATE=utf8_unicode_ci;

CREATE TABLE `UserBookmark` (
`user_id` UNSIGNED INT,
`object_id` UNSIGNED INT
) ENGINE=INNODB, CHARACTER_SET=utf8, COLLATE=utf8_unicode_ci;

CREATE TABLE `UserComment` (
`user_id` UNSIGNED INT,
`object_id` UNSIGNED INT,
`comment` TEXT,
`verified` BOOLEAN INDEX
) ENGINE=INNODB, CHARACTER_SET=utf8, COLLATE=utf8_unicode_ci;