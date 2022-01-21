/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50729
Source Host           : localhost:3306
Source Database       : news

Target Server Type    : MYSQL
Target Server Version : 50729
File Encoding         : 65001

Date: 2021-08-23 15:00:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for column
-- ----------------------------
DROP TABLE IF EXISTS `column`;
CREATE TABLE `column` (
  `column_id` int(11) NOT NULL AUTO_INCREMENT,
  `column_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`column_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of column
-- ----------------------------
INSERT INTO `column` VALUES ('1', '国内');
INSERT INTO `column` VALUES ('2', '国际');
INSERT INTO `column` VALUES ('3', '军事');
INSERT INTO `column` VALUES ('4', '娱乐');
INSERT INTO `column` VALUES ('5', '体育');
INSERT INTO `column` VALUES ('6', '科技');
INSERT INTO `column` VALUES ('7', '互联网');
INSERT INTO `column` VALUES ('8', '经济');
INSERT INTO `column` VALUES ('9', '汽车');
INSERT INTO `column` VALUES ('10', '房产');

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `account` varchar(20) NOT NULL,
  `password` varchar(30) NOT NULL,
  `tel` varchar(11) NOT NULL,
  `portrait` varchar(50) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `remark` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`account`),
  KEY `account` (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for login
-- ----------------------------
DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `username` varchar(20) NOT NULL,
  `password` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`username`),
  CONSTRAINT `login_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of login
-- ----------------------------
INSERT INTO `login` VALUES ('admin', '123456');
INSERT INTO `login` VALUES ('lisi', '666888');
INSERT INTO `login` VALUES ('wang5', '54321');
INSERT INTO `login` VALUES ('zhs', '123321');

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `news_id` bigint(20) NOT NULL,
  `author` varchar(20) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` varchar(255) NOT NULL,
  `date` varchar(255) DEFAULT NULL,
  `column_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `verify` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`news_id`),
  KEY `author` (`author`),
  KEY `column_id` (`column_id`),
  CONSTRAINT `news_ibfk_1` FOREIGN KEY (`author`) REFERENCES `user` (`username`),
  CONSTRAINT `news_ibfk_2` FOREIGN KEY (`column_id`) REFERENCES `column` (`column_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for note
-- ----------------------------
DROP TABLE IF EXISTS `note`;
CREATE TABLE `note` (
  `id` varchar(20) NOT NULL,
  `news_id` bigint(20) DEFAULT NULL,
  `account` varchar(20) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `favor` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `account` (`account`),
  KEY `news_id` (`news_id`),
  CONSTRAINT `note_ibfk_1` FOREIGN KEY (`account`) REFERENCES `customer` (`account`),
  CONSTRAINT `note_ibfk_2` FOREIGN KEY (`news_id`) REFERENCES `news` (`news_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of note
-- ----------------------------

-- ----------------------------
-- Table structure for reply
-- ----------------------------
DROP TABLE IF EXISTS `reply`;
CREATE TABLE `reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(20) NOT NULL,
  `note_id` varchar(20) NOT NULL,
  `date` varchar(20) NOT NULL,
  `text` varchar(255) NOT NULL,
  `favor` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `account` (`account`),
  KEY `note_id` (`note_id`),
  CONSTRAINT `reply_ibfk_1` FOREIGN KEY (`account`) REFERENCES `customer` (`account`),
  CONSTRAINT `reply_ibfk_2` FOREIGN KEY (`note_id`) REFERENCES `note` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of reply
-- ----------------------------

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `authority` varchar(10) DEFAULT NULL,
  `uri` varchar(20) NOT NULL,
  `remark` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', '管理员', '/', '拥有所有权限');
INSERT INTO `role` VALUES ('2', '新闻管理', '/news/', '增删改新闻');
INSERT INTO `role` VALUES ('3', '评论管理', '/comment/', '删除评论');
INSERT INTO `role` VALUES ('4', '审核员', '/verify/', '审核新闻及评论');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `role_id` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `tel` varchar(11) NOT NULL,
  `status` int(11) DEFAULT '0',
  `remark` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`username`),
  KEY `username` (`username`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('u1000', 'admin', '1', 'aowin@126.com', '88390609', '0', '');
INSERT INTO `user` VALUES ('u1001', 'zhs', '2', 'zhs@163.com', '18524739576', '0', null);
INSERT INTO `user` VALUES ('u1002', 'lisi', '3', 'lisi@yahoo.com', '13787213326', '0', null);
INSERT INTO `user` VALUES ('u1003', 'wang5', '4', 'wang5@gmail.com', '18634528865', '0', null);
