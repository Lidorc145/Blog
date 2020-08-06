CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `full_name` varchar(255),
  `username` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255),
  `type` ENUM ('admin', 'auther')
);

CREATE TABLE `posts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `summary` varchar(255),
  `content` varchar(1000),
  `image` varchar(255),
  `auther_id` int,
  `creation_date` datetime DEFAULT (now()),
  `last_update_date` datetime,
  `publish_date` datetime,
  `num_of_views` int,
  `tags_list` varchar(255)
);

CREATE TABLE `comments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `post_id` int,
  `title` varchar(255),
  `content` varchar(255),
  `publish_date` datetime,
  `approved` bool
);

CREATE TABLE `pages` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `content` varchar(1000),
  `href` varchar(255),
  `menu_title` varchar(255),
  `menu_location` int
);

CREATE TABLE `tags` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `tag_name` varchar(255) UNIQUE
);

ALTER TABLE `posts` ADD FOREIGN KEY (`auther_id`) REFERENCES `users` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);
