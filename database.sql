-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: localhost    Database: hotelcompany
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bookings` (
  `bookingID` mediumint(9) NOT NULL AUTO_INCREMENT,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `num_guests` tinyint(1) NOT NULL,
  PRIMARY KEY (`bookingID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `businesses`
--

DROP TABLE IF EXISTS `businesses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `businesses` (
  `ABN` mediumint(9) NOT NULL,
  `email` char(50) NOT NULL,
  `currID` char(255) DEFAULT NULL,
  `name` text NOT NULL,
  `address` char(255) NOT NULL,
  `city` char(255) NOT NULL,
  `contact` char(20) NOT NULL,
  `rating` tinyint(4) DEFAULT '0',
  `numRatings` mediumint(9) DEFAULT '0',
  `pool` tinyint(1) NOT NULL DEFAULT '0',
  `spa` tinyint(1) NOT NULL DEFAULT '0',
  `wifi` tinyint(1) NOT NULL DEFAULT '0',
  `fitness` tinyint(1) NOT NULL DEFAULT '0',
  `parking` tinyint(1) NOT NULL DEFAULT '0',
  `restaurant` tinyint(1) NOT NULL DEFAULT '0',
  `lat` double(30,20) NOT NULL,
  `lng` double(30,20) NOT NULL,
  PRIMARY KEY (`ABN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `businesses`
--

LOCK TABLES `businesses` WRITE;
/*!40000 ALTER TABLE `businesses` DISABLE KEYS */;
INSERT INTO `businesses` VALUES (1234,'hilton@adelaide.com.au',NULL,'Hilton Adelaide','233 Victoria Square','Adelaide','(08) 8217 2000',4,10,0,1,1,1,1,1,-34.92914300000000000000,138.59890620000000000000),(525433,'The Victoria Hotel Melbourne',NULL,'atlantis@vichotels.com.au','215 Little Collins St','Melbourne','(03) 9669 0000',1,69,1,1,1,1,1,1,-37.81430560000000000000,144.96714260000000000000),(923415,'atlantis@vichotels.com.au',NULL,'Atlantis Hotel','300 Spencer St','Melbourne','(03) 9600 2900',2,6,0,1,1,0,1,1,-37.81361940000000000000,144.95192350000002000000),(1231235,'pullman@accordhotels.com.au',NULL,'Pullman Adelaide','16 Hindmarsh Square','Adelaide','(08) 8206 8888',3,21,0,1,1,1,0,1,-34.92324730000000000000,138.60630879999997000000),(1231513,'crown@metropol.com.au',NULL,'Crown Metropol','8 Whiteman St','Southbank Vic','(03) 9292 6211',3,24,0,1,1,0,1,1,-37.82586700000000000000,144.95764329999997000000),(1823659,'intercontinental@adelaidehotels.com.au',NULL,'Intercontinental Adelaide','146 North Terrace','Adelaide','(08) 8238 2400',4,105,0,1,1,0,1,0,-34.92067900000000000000,138.59651099999996000000),(8094879,'minima@majestic.com.au',NULL,'Majestic Minima Hotel','146 Melbourne St','North','(08) 8334 7766',5,89,0,1,1,1,1,0,-34.90730900000000000000,138.60633499999994000000);
/*!40000 ALTER TABLE `businesses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `rooms` (
  `roomID` mediumint(9) NOT NULL AUTO_INCREMENT,
  `ABN` mediumint(9) NOT NULL,
  `room_title` char(255) NOT NULL,
  `description` text,
  `currency` char(4) NOT NULL DEFAULT 'AUD',
  `price` mediumint(9) NOT NULL DEFAULT '0',
  `max_guests` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`roomID`),
  KEY `ABN` (`ABN`),
  CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`ABN`) REFERENCES `businesses` (`abn`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,1823659,'Standard Suite','Luxurious standard suite with a great city view. Has room for two people.','AUD',129,2);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `userID` char(30) NOT NULL,
  `email` char(50) NOT NULL,
  `currID` char(255) DEFAULT NULL,
  `first_name` char(100) DEFAULT NULL,
  `last_name` char(100) DEFAULT NULL,
  `gender` char(50) DEFAULT NULL,
  `address` char(255) DEFAULT NULL,
  `postcode` char(10) DEFAULT NULL,
  `country` char(100) DEFAULT NULL,
  `card_type` char(30) DEFAULT NULL,
  `cardNo` char(30) DEFAULT NULL,
  `cardVV` char(5) DEFAULT NULL,
  `expiryM` char(2) DEFAULT NULL,
  `expiryY` char(2) DEFAULT NULL,
  `logged_in` tinyint(1) NOT NULL DEFAULT '0',
  `city` char(255) DEFAULT NULL,
  `contact` char(255) DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('118158547846447151658','bradmorgan1296@gmail.com','C1LaY57woJwNfnX2s_Yd0DWMQ_647GLd','Bradley','Morgan','Male','34 No Street','5096','Australia',NULL,NULL,NULL,NULL,NULL,1,'Adelaide','0422999999');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-29 15:02:24
