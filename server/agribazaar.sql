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
INSERT INTO `Cart` VALUES (2,1,10,'buying',1,1),(2,2,5,'buying',2,1),(3,1,20,'bought',4,1),(2,1,1,'buying',5,1),(2,1,20,'bought',6,1),(2,2,20,'bought',7,1),(3,2,20,'buying',8,1);
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
 1 AS `quantity`,
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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ItemSeller`
--

LOCK TABLES `ItemSeller` WRITE;
/*!40000 ALTER TABLE `ItemSeller` DISABLE KEYS */;
INSERT INTO `ItemSeller` VALUES (1,1,5.00,'Rupees/Kg',8,1,NULL,NULL),(1,2,10.00,'Rupees/Kg',10,2,NULL,NULL),(4,1,4.00,'Rupees/Kg',10,3,NULL,NULL),(10,2,234.00,'Rupees/Kg',10,4,NULL,NULL),(1,1,100.00,'unit',100,5,'itemImagein','tagsin'),(1,1,67.00,'ghjkl',67,6,'rtyujkl;','fghjk'),(1,2,232.00,'rupee/kg',782367,7,'undefined','#rice'),(1,2,234.00,'rupee/kg',2312,8,'facafb3b-f11d-40dd-8aeb-982e73dfb9f4-img_20190309_185722.jpg','#Urad dal'),(1,2,234.00,'rupee/kg',2312,9,'ddf24b0b-efc4-494b-ab3a-084ac5fed416-img_20190309_185722.jpg','#Urad dal'),(1,2,234.00,'rupee/kg',2312,10,'581e1f94-9e59-4d8b-acb4-dad92290e74a-img_20190309_185722.jpg','#Urad dal'),(1,2,345543.00,'rupee/kg',43432,11,'6cf47d2a-f744-4941-88fb-757d7eae1264-53fdaec0bdf65a97.jpg','#idk'),(1,1,4325.00,'rupee/kg',235,12,'f192ed36-134a-46fe-bd50-d4de12cde648-53fdaec0bdf65a97.jpg','25'),(1,2,345.00,'rupee/kg',456,13,'3fca86e7-2352-455f-aa01-134b4a2d3bd2-53fdaec0bdf65a97.jpg','qrew'),(1,2,3241.00,'rupee/kg',34,14,'3311b3cf-d7e2-4375-809d-c4fe55ae8eeb-53fdaec0bdf65a97.jpg','14132'),(1,2,524.00,'rupee/kg',25,15,'becb3b98-4bcc-44f1-82cf-1e4f7370fce4-53fdaec0bdf65a97.jpg','34ed'),(1,2,234.00,'rupee/kg',243,16,'b8cd16cb-9680-45b8-82ff-5e4bb67f2216-53fdaec0bdf65a97.jpg','243'),(1,2,234.00,'rupee/kg',243,17,'8f6cfe5c-1573-4438-838b-fe239d60b748-53fdaec0bdf65a97.jpg','243'),(1,2,234.00,'rupee/kg',243,18,'8b072fc3-0352-45b5-96dd-bf756121f705-53fdaec0bdf65a97.jpg','243'),(1,2,234.00,'rupee/kg',243,19,'d737a859-77e7-4135-90d8-809a1ad2ff34-53fdaec0bdf65a97.jpg','243'),(1,2,234.00,'rupee/kg',243,20,'9cff3a0a-2634-43ba-98a2-aa33665fb7c4-53fdaec0bdf65a97.jpg','243'),(1,2,234.00,'rupee/kg',243,21,'c9561520-8a9a-4ef4-b944-62762c87359a-53fdaec0bdf65a97.jpg','243'),(1,2,234.00,'rupee/kg',243,22,'a21fc9e4-1142-465e-b869-fb4ad8a03808-53fdaec0bdf65a97.jpg','243'),(1,2,234.00,'rupee/kg',243,23,'1c964e02-0523-43c6-8216-68ee3e9afc52-53fdaec0bdf65a97.jpg','243'),(1,2,234.00,'rupee/kg',243,24,'88d3b076-0f27-4f9c-943c-22d6f7a2394c-53fdaec0bdf65a97.jpg','243'),(1,2,234.00,'rupee/kg',243,25,'4acf98cc-7224-4c0e-841d-b7930984c0bb-53fdaec0bdf65a97.jpg','243'),(1,2,234.00,'rupee/kg',243,26,'0a3a0494-fbd7-4953-8905-49519f026967-53fdaec0bdf65a97.jpg','243'),(1,2,234.00,'rupee/kg',243,27,'442155a7-a9bf-45de-83fe-9dad5844a58b-53fdaec0bdf65a97.jpg','243'),(1,2,234.00,'rupee/kg',243,28,'24936442-9ac2-4915-b9e6-d523a6801a97-53fdaec0bdf65a97.jpg','243'),(1,2,234.00,'rupee/kg',243,29,'8850edaa-13d5-4234-8610-669852cecec1-53fdaec0bdf65a97.jpg','243'),(1,2,234.00,'rupee/kg',243,30,'db05c6e7-a4d1-42df-8b68-948bd18a0a73-53fdaec0bdf65a97.jpg','243'),(1,2,234.00,'rupee/kg',243,31,'795362af-3275-4f72-85c8-75fae29f1919-53fdaec0bdf65a97.jpg','243'),(1,2,234.00,'rupee/kg',243,32,'45235a13-3e97-4bc2-a1dc-f71b58f8e97e-53fdaec0bdf65a97.jpg','243'),(1,2,234.00,'rupee/kg',243,33,'23a57bcf-465e-473a-ac13-a01abfe3ae0f-53fdaec0bdf65a97.jpg','243'),(1,2,234.00,'rupee/kg',243,34,'be22e350-780b-48ba-a2c3-d4af313e4e96-53fdaec0bdf65a97.jpg','243'),(1,2,234.00,'rupee/kg',243,35,'049d1d75-4914-4d2c-a83e-bda804e14ff1-53fdaec0bdf65a97.jpg','243');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Items`
--

LOCK TABLES `Items` WRITE;
/*!40000 ALTER TABLE `Items` DISABLE KEYS */;
INSERT INTO `Items` VALUES ('Rice','Basmati Indian Rice',1,'Cereals',NULL),('Urad Dal','Skinned Urad Dal',2,'Lentils',NULL),('idk','idk',3,'idk','idk');
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
  `city` varchar(50) DEFAULT NULL,
  `street` varchar(50) DEFAULT NULL,
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
INSERT INTO `Users` VALUES (1,'nirmal','8017d27151912033277faad0effc8662e0686b3602989ca7c382e77d0f7a8095','nirmal@agribazaar.com','farmer',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-06-08 22:16:30'),(2,'mukesh','648461bf64b0639d7944cd41b49df473405921f3d69f79ffcb4d5066794996e4','mukesh@agribazaar.com','shopper',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-06-08 22:16:30'),(3,'yash','262cc47030b1803064844b94c1cb0054a247d1e550e26bb33f215149d8b2c72e','yash@agribazaar.com','shopper',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-06-08 22:16:30'),(4,'john','eb045d78d273107348b0300c01d29b7552d622abbc6faf81b3ec55359aa9950c','john@agribazar.com','farmer',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-06-08 22:16:30'),(8,'mksiyak','MUKESH','MUKESH','farmer','MUKESH','MUKESH',123,12,'MUKESH','MUKESH','MUKESH','MUKESH','2020-06-08 22:40:00'),(10,'mks','mksiyak','mk@agrimail.com','farmer','mukesh','kumar',332312,10,'sikar','ghana','Raj','India','2020-06-08 22:44:01'),(12,'Mksiyak2','6db92827f1264540771ad58b281396fe227dad7e','mksiyak@agrimail.com','shopper','mukesh','kumar',332312,10,'idk','idk','Raj','India','2020-06-08 23:22:49'),(16,'Mksiyak3','6db92827f1264540771ad58b281396fe227dad7e','mksiyak3@agrimail.com','shopper','mukesh','kumar',332312,10,'idk','idk','Raj','India','2020-06-08 23:27:07'),(18,'','da39a3ee5e6b4b0d3255bfef95601890afd80709','','','','',12,2,'','','','','2020-06-08 23:31:56'),(19,'mksiyak4','256d23ebdfeb388c10a3019a2c223ca5c90edfcc','mukesh4@agribazaar.com','shopper','mukesh','kumar',12,2,'','','','','2020-06-08 23:37:15'),(20,'mksiyak5','256d23ebdfeb388c10a3019a2c223ca5c90edfcc','mukesh5@agribazaar.com','shopper','mukesh','kumar',12,2,'','','','','2020-06-08 23:38:24'),(21,'Mksiya6','5bff30a5ff9fd838331d873e25b55dc7886a3efe','afds@ds.dfs','','asfd','afds',23,32,'','','','','2020-06-08 23:40:45'),(22,'aasdf','4d903ce56d8a0509ebd1450fbe43c0fe412a1a1d','fasdfaf@dsaf.fasd','','afdsafs','afdsdsaf',12321,321,'','','','','2020-06-08 23:48:50'),(23,'asfd','27e86d8cb3f56985c625d61921ccdce960cab2be','jlklerqwj@jsadf.afsd','','afds','afsd',23,423,'','','','','2020-06-08 23:58:48'),(24,'asfahk','256d23ebdfeb388c10a3019a2c223ca5c90edfcc','mukesh324@agribazaar.com','farmer','afsdjafjk','jklafsdlkj',1423,234,'kljfqdkjjk','afdsjl','fadskjf;lsad','afjfdkjl','2020-06-09 20:28:29'),(25,'afdsjkl','256d23ebdfeb388c10a3019a2c223ca5c90edfcc','mukes4343h@agribazaar.com','farmer','kjafds','fads',34,53,'afdsa','rewfqwer','ljk','asfdjkl','2020-06-09 20:52:54'),(26,'jkadsf','256d23ebdfeb388c10a3019a2c223ca5c90edfcc','muafsdkesh@agribazaar.com','shopper','kljhfsdaiojk','kjjkfsdn,',34,523,'','','','','2020-06-09 20:54:30');
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
/*!50001 VIEW `CartView` AS select `Cart`.`id` AS `id`,`Shopper`.`username` AS `username`,`Items`.`name` AS `name`,`Items`.`description` AS `description`,`Items`.`category` AS `category`,`Cart`.`quantity` AS `quantity`,`Cart`.`itemStatus` AS `itemStatus`,`ItemSeller`.`pricePerItem` AS `pricePerItem`,`ItemSeller`.`unit` AS `unit`,concat(`Seller`.`first_name`,' ',`Seller`.`last_name`) AS `fullname` from ((((`Cart` join `Users` `Shopper` on((`Shopper`.`id` = `Cart`.`userid`))) join `Users` `Seller` on((`Seller`.`id` = `Cart`.`itemSellerId`))) join `Items` on((`Cart`.`itemno` = `Items`.`id`))) join `ItemSeller` on(((`ItemSeller`.`sellerId` = `Cart`.`itemSellerId`) and (`ItemSeller`.`itemId` = `Cart`.`itemno`)))) order by `Cart`.`id` */;
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

-- Dump completed on 2020-06-10 11:45:36
