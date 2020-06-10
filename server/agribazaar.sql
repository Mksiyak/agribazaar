-- MySQL dump 10.13  Distrib 8.0.20, for Linux (x86_64)
--
-- Host: localhost    Database: agribazaar
-- ------------------------------------------------------
-- Server version	8.0.20-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Cart`
--

DROP TABLE IF EXISTS `Cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cart` (
  `userid` int DEFAULT NULL,
  `itemno` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `itemStatus` varchar(20) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `itemSellerId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `itemSellerId` (`itemSellerId`),
  CONSTRAINT `Cart_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `Users` (`id`),
  CONSTRAINT `Cart_ibfk_2` FOREIGN KEY (`itemSellerId`) REFERENCES `ItemSeller` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cart`
--

LOCK TABLES `Cart` WRITE;
/*!40000 ALTER TABLE `Cart` DISABLE KEYS */;
INSERT INTO `Cart` VALUES (11,1,10,'buying',1,1),(12,1,5,'buying',2,2),(13,1,20,'bought',4,1),(14,1,20,'buying',5,4),(15,13,20,'bought',6,5),(11,14,20,'bought',7,6),(12,2,20,'buying',8,7);
/*!40000 ALTER TABLE `Cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `CartView`
--

DROP TABLE IF EXISTS `CartView`;
/*!50001 DROP VIEW IF EXISTS `CartView`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `CartView` AS SELECT 
 1 AS `id`,
 1 AS `username`,
 1 AS `name`,
 1 AS `description`,
 1 AS `category`,
 1 AS `BuyerQty`,
 1 AS `SellerQty`,
 1 AS `itemStatus`,
 1 AS `pricePerItem`,
 1 AS `unit`,
 1 AS `fullname`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `ItemComments`
--

DROP TABLE IF EXISTS `ItemComments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ItemComments` (
  `review` varchar(100) DEFAULT NULL,
  `userid` int NOT NULL,
  `itemsellerid` int NOT NULL,
  `rating` float DEFAULT NULL,
  KEY `userid` (`userid`),
  KEY `itemsellerid` (`itemsellerid`),
  CONSTRAINT `ItemComments_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `Users` (`id`),
  CONSTRAINT `ItemComments_ibfk_2` FOREIGN KEY (`itemsellerid`) REFERENCES `ItemSeller` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ItemComments`
--

LOCK TABLES `ItemComments` WRITE;
/*!40000 ALTER TABLE `ItemComments` DISABLE KEYS */;
/*!40000 ALTER TABLE `ItemComments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ItemSeller`
--

DROP TABLE IF EXISTS `ItemSeller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ItemSeller` (
  `sellerId` int DEFAULT NULL,
  `itemId` int DEFAULT NULL,
  `pricePerItem` float(10,2) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `itemImage` text,
  `tags` text,
  PRIMARY KEY (`id`),
  KEY `sellerId` (`sellerId`),
  KEY `itemId` (`itemId`),
  CONSTRAINT `ItemSeller_ibfk_1` FOREIGN KEY (`sellerId`) REFERENCES `Users` (`id`),
  CONSTRAINT `ItemSeller_ibfk_2` FOREIGN KEY (`itemId`) REFERENCES `Items` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ItemSeller`
--

LOCK TABLES `ItemSeller` WRITE;
/*!40000 ALTER TABLE `ItemSeller` DISABLE KEYS */;
INSERT INTO `ItemSeller` VALUES (1,1,5.00,'Rupees/Kg',8,1,NULL,NULL),(2,1,4.00,'Rupees/Kg',52,2,NULL,NULL),(3,1,6.00,'Rupees/Kg',65,3,NULL,NULL),(4,1,2.00,'Rupees/Kg',55,4,NULL,NULL),(5,1,9.00,'Rupees/Kg',5,5,NULL,NULL),(5,2,6.00,'Rupees/Kg',55,6,NULL,NULL),(6,2,3.00,'Rupees/Kg',8,7,NULL,NULL),(7,2,6.00,'Rupees/Kg',55,8,NULL,NULL),(8,2,3.00,'Rupees/Kg',89,9,NULL,NULL),(1,3,5.00,'Rupees/Kg',8,11,NULL,NULL),(2,4,4.00,'Rupees/Kg',52,12,NULL,NULL),(3,3,6.00,'Rupees/Kg',65,13,NULL,NULL),(4,5,2.00,'Rupees/Kg',55,14,NULL,NULL),(8,5,9.00,'Rupees/Kg',5,15,NULL,NULL),(3,5,6.00,'Rupees/Kg',55,16,NULL,NULL),(6,7,3.00,'Rupees/Kg',8,17,NULL,NULL),(7,8,6.00,'Rupees/Kg',55,18,NULL,NULL),(8,6,3.00,'Rupees/Kg',89,19,NULL,NULL),(1,6,5.00,'Rupees/Kg',8,21,NULL,NULL),(2,7,4.00,'Rupees/Kg',52,22,NULL,NULL),(3,8,6.00,'Rupees/Kg',65,23,NULL,NULL),(4,3,2.00,'Rupees/Kg',55,24,NULL,NULL),(5,4,9.00,'Rupees/Kg',5,25,NULL,NULL),(5,7,6.00,'Rupees/Kg',55,26,NULL,NULL),(6,8,3.00,'Rupees/Kg',8,27,NULL,NULL),(7,6,6.00,'Rupees/Kg',55,28,NULL,NULL),(8,1,3.00,'Rupees/Kg',89,29,NULL,NULL),(1,11,52.00,'Rupees/Kg',8,31,NULL,NULL),(2,12,45.00,'Rupees/Kg',52,32,NULL,NULL),(3,13,64.00,'Rupees/Kg',65,33,NULL,NULL),(4,14,25.00,'Rupees/Kg',55,34,NULL,NULL),(8,15,95.00,'Rupees/Kg',5,35,NULL,NULL),(3,11,65.00,'Rupees/Kg',55,36,NULL,NULL),(6,13,38.00,'Rupees/Kg',8,37,NULL,NULL),(7,14,68.00,'Rupees/Kg',55,38,NULL,NULL),(8,15,39.00,'Rupees/Kg',89,39,NULL,NULL);
/*!40000 ALTER TABLE `ItemSeller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Items`
--

DROP TABLE IF EXISTS `Items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Items` (
  `name` varchar(20) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(20) NOT NULL,
  `tags` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Items`
--

LOCK TABLES `Items` WRITE;
/*!40000 ALTER TABLE `Items` DISABLE KEYS */;
INSERT INTO `Items` VALUES ('Rice','Basmati Rice',1,'Cereals',NULL),('Wheat','Whole Grain',2,'Cereals',NULL),('Barley','Nutritious',3,'Cereals',NULL),('Oat','Morning Breakfast',4,'Cereals',NULL),('Millet','Pearl Millet',5,'Cereals',NULL),('Jawar','Sorghum',6,'Cereals',NULL),('Bajra','Staple',7,'Cereals',NULL),('Maize','Sweet Corn',8,'Cereals',NULL),('Moong','Green Moong Dal',11,'Lentils',NULL),('Moong','Yellow Moong Dal',12,'Lenntilss',NULL),('Urad','Unpolished',13,'Lentils',NULL),('Channa','Large to Small',14,'Lentils',NULL),('Rajma','Red Kidney Beans',15,'Cereals',NULL);
/*!40000 ALTER TABLE `Items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `SearchView`
--

DROP TABLE IF EXISTS `SearchView`;
/*!50001 DROP VIEW IF EXISTS `SearchView`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `SearchView` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `description`,
 1 AS `category`,
 1 AS `SellerCount`,
 1 AS `AvgPrice`,
 1 AS `SellerNames`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `SellerItemList`
--

DROP TABLE IF EXISTS `SellerItemList`;
/*!50001 DROP VIEW IF EXISTS `SellerItemList`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `SellerItemList` AS SELECT 
 1 AS `itemId`,
 1 AS `SellerNames`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(10) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `role` varchar(20) NOT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(20) DEFAULT NULL,
  `pin_code` int DEFAULT NULL,
  `house_no` int DEFAULT NULL,
  `street` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UniqueConstraint` (`username`,`email`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'nirmal','8017d27151912033277faad0effc8662e0686b3602989ca7c382e77d0f7a8095','nirmal@agribazaar.com','farmer','Nirmal','Khedkar',568916,24,'Civil Lines','Nashik','Maharashtra','India','2020-06-08 22:16:30'),(2,'manoj','8017d27151912033277faad0effc8662e0686b3602989ca7c382e77d0f7a8095','manoj@agribazaar.com','farmer','Manoj','Singh',156995,45,'Civil Lines','Jaipur','Rajasthan','India','2020-06-08 22:16:30'),(3,'bhupesh','8017d27151912033277faad0effc8662e0686b3602989ca7c382e77d0f7a8095','bhupesh@agribazaar.com','farmer','Bhupesh','Sahu',486182,59,'Civil Lines','Raipur','Chhattisgarh','India','2020-06-08 22:16:30'),(4,'kiran','8017d27151912033277faad0effc8662e0686b3602989ca7c382e77d0f7a8095','kiran@agribazaar.com','farmer','Kiran','Ghosh',648156,69,'Civil Lines','Kolkata','West Bengal','India','2020-06-08 22:16:30'),(5,'surya','8017d27151912033277faad0effc8662e0686b3602989ca7c382e77d0f7a8095','surya@agribazaar.com','farmer','Surya','Rao',464935,98,'Civil Lines','Guntur','Andhra Pradesh','India','2020-06-08 22:16:30'),(6,'geet','8017d27151912033277faad0effc8662e0686b3602989ca7c382e77d0f7a8095','geet@agribazaar.com','farmer','Geet','Patel',481682,96,'Civil Lines','Surat','Gujarat','India','2020-06-08 22:16:30'),(7,'soumya','8017d27151912033277faad0effc8662e0686b3602989ca7c382e77d0f7a8095','soumya@agribazaar.com','farmer','Soumya','Patil',234649,23,'Civil Lines','Belgavi','Karnataka','India','2020-06-08 22:16:30'),(8,'vishesh','8017d27151912033277faad0effc8662e0686b3602989ca7c382e77d0f7a8095','visheshl@agribazaar.com','farmer','Vishessh','Kumar',568465,65,'Civil Lines','Gaya','Bihar','India','2020-06-08 22:16:30'),(11,'mukesh','648461bf64b0639d7944cd41b49df473405921f3d69f79ffcb4d5066794996e4','mukesh@agribazaar.com','shopper','Mukesh','Siyak',456813,51,'Civil Lines','Ambala','Haryana','India','2020-06-08 22:16:30'),(12,'prateek','648461bf64b0639d7944cd41b49df473405921f3d69f79ffcb4d5066794996e4','prateek@agribazaar.com','shopper','Prateek','Sinha',654565,16,'Civil Lines','Ujjain','Madhya Pradesh','India','2020-06-08 22:16:30'),(13,'jayesh','648461bf64b0639d7944cd41b49df473405921f3d69f79ffcb4d5066794996e4','jayesh@agribazaar.com','shopper','Jayesh','Rawat',125242,91,'Civil Lines','Nainital','Uttrakhand','India','2020-06-08 22:16:30'),(14,'biswa','648461bf64b0639d7944cd41b49df473405921f3d69f79ffcb4d5066794996e4','biswa@agribazaar.com','shopper','Biswa','Sharma',754625,64,'Civil Lines','Dispur','Assam','India','2020-06-08 22:16:30'),(15,'karthik','648461bf64b0639d7944cd41b49df473405921f3d69f79ffcb4d5066794996e4','karthik@agribazaar.com','shopper','Karthik','Ramakant',146427,50,'Civil Lines','Madurai','Tamil Nadu','India','2020-06-08 22:16:30');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `User_deleteExistence` BEFORE DELETE ON `Users` FOR EACH ROW BEGIN
DELETE FROM Cart where OLD.id=Cart.userid;
DELETE FROM ItemSeller WHERE OLD.id=ItemSeller.sellerId;
DELETE FROM Cart where OLD.id=Cart.itemSellerId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping routines for database 'agribazaar'
--
/*!50003 DROP PROCEDURE IF EXISTS `AddItem` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddItem`(in itemIdin int,in sellerIdin int,in pricePerItemin float,in unitin varchar(10),in quantity int,in itemImagein text,in tagsin text)
begin
insert into ItemSeller (sellerId,itemId,pricePerItem,unit,quantity,itemImage,tags) values (sellerIdin,itemIdin,pricePerItemin,unitin,quantity,itemImagein,tagsin);
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cart_AddItems` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `cart_AddItems`(in user_userid int,in item_itemno int,in item_quantity int,in item_price int,in item_itemSellerId int)
begin insert into Cart(userid,itemno,quantity,itemStatus,price,itemSellerId) values(user_userid,item_itemno,item_quantity,"buying",item_price,item_itemSellerId); end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Cart_clearAll` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Cart_clearAll`(in user_userid int)
begin
DELETE FROM Cart WHERE userid=user_userid AND itemStatus="buying";
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Cart_getItems` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Cart_getItems`(in user_username varchar(10))
begin
select * from CartView where username=user_username;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Cart_getOrderHistory` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Cart_getOrderHistory`(in user_username varchar(10))
begin select * from CartView where username=user_username AND itemStatus="bought"; end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Items_getRandomN` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Items_getRandomN`(in count int)
begin
select * from SearchView ORDER BY RAND() LIMIT count;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Item_getComments` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Item_getComments`(in item_id int)
begin select review,rating,Buyer.username as "buyerusername",CONCAT(Seller.first_name," ",Seller.last_name) as "sellerfullname",itemid from ItemComments JOIN ItemSeller ON itemsellerid=ItemSeller.id JOIN Users as Buyer ON ItemComments.userid=Buyer.id JOIN Users as Seller ON ItemSeller.sellerid=Seller.id WHERE itemid=item_id ORDER BY rating DESC; end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `loginCheck` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `loginCheck`(
in emailGiven varchar(50),
in passwdGiven varchar(25),
out id int,
out username varchar(10),
out role varchar(20))
begin
select Users.id,Users.username,Users.role into id,username,role from Users where Users.email=emailGiven and Users.password=passwdGiven; 
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `search_All` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `search_All`(in query varchar(50))
begin
select * from SearchView where name like concat("%",query,"%") or description like concat("%",query,"%") or category like concat("%",query,"%") or SellerNames like concat("%",query,"%");
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `search_getSellers` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `search_getSellers`(in itmid int)
begin
select sellerId,CONCAT(Users.first_name," ",Users.last_name) as "sellerName",pricePerItem,unit,quantity from ItemSeller join Users on ItemSeller.sellerId=Users.id where itemId=itmid;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Seller_getLastSales` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Seller_getLastSales`(in slrid int)
select Cart.userid as "userid",Users.address as "useraddress",Items.name as "itemname",Cart.quantity as "quantity",price,Items.category as "category"  from Cart join Users on Cart.userid=Users.id join Items on Items.id=Cart.itemno where itemSellerId=slrid and Cart.itemStatus="bought" ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Users_Edit_NP` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Users_Edit_NP`(in usernamein varchar(30),in emailin varchar(50),in first_namein varchar(20),in last_namein varchar(20),in pin_codein int,in house_noin int,in cityin varchar(50),in streetin varchar(50),in statein varchar(50),in countryin varchar(50))
begin
update Users set email=emailin,first_name = first_namein ,last_name=last_namein ,pin_code=pin_codein ,house_no=house_noin ,city=cityin ,street=streetin ,state=statein ,country=countryin where username=usernamein;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Users_Edit_password` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Users_Edit_password`(in usernamein varchar(30),in passwordin varchar(50))
begin update Users set password = passwordin where username=usernamein; end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Users_getDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Users_getDetails`(in usrid int)
select * from Users where id = usrid ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Users_getDetailsByUsername` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Users_getDetailsByUsername`(in uname varchar(50))
select * from Users where username = uname ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Users_register` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Users_register`(in username varchar(30),in password varchar(100),in email varchar(50),in role varchar(20),in first_name varchar(20),in last_name varchar(20),in pin_code int,in house_no int,in city varchar(50),in street varchar(50),in state varchar(50),in country varchar(50))
begin
insert into Users(username,password,email,role,first_name,last_name,pin_code,house_no,city,street,state,country) values (username,password,email,role,first_name,last_name,pin_code,house_no,city,street,state,country);
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Users_verify` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Users_verify`(in usrname varchar(50), in pswd varchar(200))
begin
select id,email,CONCAT(first_name," ",last_name),username,role FROM Users WHERE (email=usrname OR username=usrname) AND password=pswd;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `User_deleteAccount` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `User_deleteAccount`(in user_userid int)
begin
DELETE FROM Users WHERE Users.id=user_userid;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `CartView`
--

/*!50001 DROP VIEW IF EXISTS `CartView`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `CartView` AS select `Cart`.`id` AS `id`,`Shopper`.`username` AS `username`,`Items`.`name` AS `name`,`Items`.`description` AS `description`,`Items`.`category` AS `category`,`Cart`.`quantity` AS `BuyerQty`,`ItemSeller`.`quantity` AS `SellerQty`,`Cart`.`itemStatus` AS `itemStatus`,`ItemSeller`.`pricePerItem` AS `pricePerItem`,`ItemSeller`.`unit` AS `unit`,concat(`Seller`.`first_name`,' ',`Seller`.`last_name`) AS `fullname` from ((((`Cart` join `Users` `Shopper` on((`Shopper`.`id` = `Cart`.`userid`))) join `Users` `Seller` on((`Seller`.`id` = `Cart`.`itemSellerId`))) join `Items` on((`Cart`.`itemno` = `Items`.`id`))) join `ItemSeller` on(((`ItemSeller`.`sellerId` = `Cart`.`itemSellerId`) and (`ItemSeller`.`itemId` = `Cart`.`itemno`)))) order by `Cart`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `SearchView`
--

/*!50001 DROP VIEW IF EXISTS `SearchView`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `SearchView` AS select `Items`.`id` AS `id`,`Items`.`name` AS `name`,`Items`.`description` AS `description`,`Items`.`category` AS `category`,(select count(`ItemSeller`.`sellerId`) from `ItemSeller` where (`ItemSeller`.`itemId` = `Items`.`id`)) AS `SellerCount`,(select avg(`ItemSeller`.`pricePerItem`) from `ItemSeller` where (`ItemSeller`.`itemId` = `Items`.`id`)) AS `AvgPrice`,`SellerItemList`.`SellerNames` AS `SellerNames` from (`Items` join `SellerItemList` on((`Items`.`id` = `SellerItemList`.`itemId`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `SellerItemList`
--

/*!50001 DROP VIEW IF EXISTS `SellerItemList`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `SellerItemList` AS select `ItemSeller`.`itemId` AS `itemId`,group_concat(concat(`Users`.`first_name`,' ',`Users`.`last_name`) separator ',') AS `SellerNames` from (`Users` join `ItemSeller` on((`ItemSeller`.`sellerId` = `Users`.`id`))) group by `ItemSeller`.`itemId` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-10 19:02:20
