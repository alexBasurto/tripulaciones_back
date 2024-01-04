-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: tripulaciones
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `tbBranches`
--

LOCK TABLES `tbBranches` WRITE;
/*!40000 ALTER TABLE `tbBranches` DISABLE KEYS */;
INSERT INTO `tbBranches` VALUES (1,1,'Central Office Madrid','Plaza Energía 001','Madrid','Spain','Central office in Madrid'),(2,1,'Northern HQ','Avenida del Norte 002','Bilbao','Spain','Headquarters for the Northern region'),(3,1,'Rome Branch','Via Energetica 003','Rome','Italy','Italian branch office'),(4,1,'Barcelona Tech Center','Tech Innovation Street 004','Barcelona','Spain','Technology innovation center in Barcelona'),(5,1,'Lisbon Operations','Operations Avenue 005','Lisbon','Portugal','Operational center in Lisbon'),(6,1,'Frankfurt Logistics','Logistics Platz 006','Frankfurt','Germany','Logistics center in Frankfurt'),(7,1,'London Finance Office','Finance Road 007','London','United Kingdom','Finance office in London'),(8,1,'Amsterdam Research Hub','Research Lane 008','Amsterdam','Netherlands','Research hub in Amsterdam'),(9,2,'Main Office Barcelona','Avenida Farmacia 101','Barcelona','Spain','Main office in Barcelona'),(10,2,'Southern Research Center','Research Street 102','Seville','Spain','Research center in Southern Spain'),(11,2,'Paris Branch','Pharma Avenue 103','Paris','France','Branch office in Paris'),(12,2,'Munich Logistics','Logistics Platz 104','Munich','Germany','Logistics center in Munich'),(13,2,'Lisbon Operations','Operations Avenue 105','Lisbon','Portugal','Operational center in Lisbon'),(14,2,'London Marketing Office','Marketing Road 106','London','United Kingdom','Marketing office in London'),(15,2,'Brussels Sales Center','Sales Lane 107','Brussels','Belgium','Sales center in Brussels'),(16,2,'Zurich Innovation Hub','Innovation Platz 108','Zurich','Switzerland','Innovation hub in Zurich'),(17,3,'Headquarters','Consulting St. 111','Barcelona','Spain','Global headquarters'),(18,3,'Southern Office','Advisors Ave. 222','Lisbon','Portugal','Southern regional office'),(19,3,'London Branch','Consultancy Road 333','London','United Kingdom','UK branch office'),(20,4,'Main Office','Oil Street 555','Madrid','Spain','Main office location'),(21,4,'Northern Branch','Petroleum Blvd 666','Oslo','Norway','Northern regional branch'),(22,4,'Milan Office','Drilling Lane 777','Milan','Italy','Italian branch office'),(23,5,'Tech Hub','Innovation St. 888','Barcelona','Spain','Main innovation center'),(24,5,'Berlin Office','Tech Road 999','Berlin','Germany','Berlin tech office'),(25,5,'Amsterdam Branch','Innovate Lane 1010','Amsterdam','Netherlands','Netherlands branch'),(26,6,'Sede Central BILBAO','Av. Kuna 123','Bilbao','Spain','Oficina principal');
/*!40000 ALTER TABLE `tbBranches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbComments`
--

LOCK TABLES `tbComments` WRITE;
/*!40000 ALTER TABLE `tbComments` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbComments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbCompanies`
--

LOCK TABLES `tbCompanies` WRITE;
/*!40000 ALTER TABLE `tbCompanies` DISABLE KEYS */;
INSERT INTO `tbCompanies` VALUES (1,'B12345678','PHARMA SOLUTIONS','Soluciones Farmacéuticas S.A.',NULL),(2,'C98765432','GLOBAL CONSULTING','Consultores Globales S.L.',NULL),(3,'D55555555','OIL MASTERS','Maestros del Petróleo S.A.',NULL),(4,'E87654321','TECH INNOVATORS','Innovadores Tecnológicos S.A.',NULL),(5,'F99999999','GREEN POWER CORP','Corporación de Energía Verde S.A.',NULL),(6,'A48484848','BBK BOOTCAMPS BY THE BRIDGE','THE BRIDGE S.A.',NULL);
/*!40000 ALTER TABLE `tbCompanies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbDepartments`
--

LOCK TABLES `tbDepartments` WRITE;
/*!40000 ALTER TABLE `tbDepartments` DISABLE KEYS */;
INSERT INTO `tbDepartments` VALUES (1,1,'Research and Development','Pharmaceutical research and development department'),(2,1,'Quality Assurance','Quality control and assurance department'),(3,1,'Sales and Marketing','Sales and marketing department'),(4,1,'Logistics and Distribution','Logistics and distribution department'),(5,1,'Finance and Accounting','Finance and accounting department'),(6,2,'Consulting Services','Consulting services department'),(7,2,'Human Resources','Human resources department'),(8,2,'Information Technology','IT services and technology department'),(9,2,'Legal Affairs','Legal affairs department'),(10,2,'Marketing and Communications','Marketing and communications department'),(11,3,'Exploration and Production','Exploration and production department'),(12,3,'Health, Safety, and Environment','HSE department'),(13,3,'Engineering and Operations','Engineering and operations department'),(14,3,'Supply Chain and Procurement','Supply chain and procurement department'),(15,3,'Finance and Planning','Finance and planning department'),(16,4,'Research and Development','Technology research and development department'),(17,4,'Software Development','Software development and programming department'),(18,4,'Hardware Engineering','Hardware engineering and design department'),(19,4,'Project Management','Project management and coordination department'),(20,4,'Quality Assurance','Quality assurance and testing department'),(21,5,'Renewable Energy Research','Renewable energy research and development department'),(22,5,'Environmental Affairs','Environmental affairs and sustainability department'),(23,5,'Business Development','Business development and strategy department'),(24,5,'Operations and Maintenance','Operations and maintenance department'),(25,5,'Finance and Investments','Finance and investments department'),(26,6,'Full Stack',''),(27,6,'Data Science',''),(28,6,'UX/UI Designer',''),(29,6,'Ciberseguridad',''),(30,6,'Marketing Digital',''),(31,6,'DevOps','');
/*!40000 ALTER TABLE `tbDepartments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbEmployees`
--

LOCK TABLES `tbEmployees` WRITE;
/*!40000 ALTER TABLE `tbEmployees` DISABLE KEYS */;
INSERT INTO `tbEmployees` VALUES (1,1,1,1,1,'Juan','López','juan.lopez@empresa1.com','12345678A','+123456789','','hash',1,0),(2,1,2,1,2,'María','García','maria.garcia@empresa1.com','23456789B','+234567890','','hash',0,0),(3,1,3,1,3,'Carlos','Martínez','carlos.martinez@empresa1.com','34567890C','+345678901','','hash',0,0),(4,1,4,1,1,'Laura','Sánchez','laura.sanchez@empresa1.com','45678901D','+456789012','','hash',0,0),(5,1,5,1,2,'Pedro','Rodríguez','pedro.rodriguez@empresa1.com','56789012E','+567890123','','hash',0,0),(6,1,1,2,3,'Ana','Fernández','ana.fernandez@empresa1.com','67890123F','+678901234','','hash',0,0),(7,1,2,2,1,'Diego','López','diego.lopez@empresa1.com','78901234G','+789012345','','hash',0,0),(8,1,3,2,2,'Sara','Gómez','sara.gomez@empresa1.com','89012345H','+890123456','','hash',0,0),(9,1,4,2,3,'Javier','Pérez','javier.perez@empresa1.com','90123456I','+901234567','','hash',0,0),(10,1,5,2,1,'Carmen','Hernández','carmen.hernandez@empresa1.com','01234567J','+0123456789','','hash',0,0),(11,1,1,3,2,'Mario','Díaz','mario.diaz@empresa1.com','12345678K','+1234567890','','hash',0,0),(12,1,2,3,3,'Elena','Álvarez','elena.alvarez@empresa1.com','23456789L','+2345678901','','hash',0,0),(13,1,3,3,1,'Alberto','Romero','alberto.romero@empresa1.com','34567890M','+3456789012','','hash',0,0),(14,1,4,3,2,'Marta','Fuentes','marta.fuentes@empresa1.com','45678901N','+4567890123','','hash',0,0),(15,1,5,3,3,'Luis','Ortega','luis.ortega@empresa1.com','56789012O','+5678901234','','hash',0,0),(16,6,26,26,NULL,'Víctor','Campos','victor@bbkbootcamps.com','11114444Z','666555444','','hash',0,1),(17,6,26,26,NULL,'Esther','Carmona','esther@bbkbootcamps.com','22225555W','666444555','','hash',0,1),(18,6,26,26,NULL,'Alex','Basurto','alex@bbkbootcamps.com','33337777Y','666454545','','hash',0,1);
/*!40000 ALTER TABLE `tbEmployees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbFeelings`
--

LOCK TABLES `tbFeelings` WRITE;
/*!40000 ALTER TABLE `tbFeelings` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbFeelings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbReasons`
--

LOCK TABLES `tbReasons` WRITE;
/*!40000 ALTER TABLE `tbReasons` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbReasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbScores`
--

LOCK TABLES `tbScores` WRITE;
/*!40000 ALTER TABLE `tbScores` DISABLE KEYS */;
INSERT INTO `tbScores` VALUES (1,'MUY MAL'),(2,'MAL'),(3,'REGULAR'),(4,'BIEN'),(5,'MUY BIEN');
/*!40000 ALTER TABLE `tbScores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbShifts`
--

LOCK TABLES `tbShifts` WRITE;
/*!40000 ALTER TABLE `tbShifts` DISABLE KEYS */;
INSERT INTO `tbShifts` VALUES (1,1,'Mañanas',''),(2,1,'Tardes',''),(3,1,'Noches',''),(4,3,'Mañanas',''),(5,3,'Tardes',''),(6,3,'Noches',''),(7,5,'Mañanas',''),(8,5,'Tardes',''),(9,5,'Noches','');
/*!40000 ALTER TABLE `tbShifts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbVoting`
--

LOCK TABLES `tbVoting` WRITE;
/*!40000 ALTER TABLE `tbVoting` DISABLE KEYS */;
INSERT INTO `tbVoting` VALUES (1,1,1,'2024-01-03',4,'2024-01-04',5);
/*!40000 ALTER TABLE `tbVoting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbVotingFeelings`
--

LOCK TABLES `tbVotingFeelings` WRITE;
/*!40000 ALTER TABLE `tbVotingFeelings` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbVotingFeelings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tbVotingReasons`
--

LOCK TABLES `tbVotingReasons` WRITE;
/*!40000 ALTER TABLE `tbVotingReasons` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbVotingReasons` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-04 17:51:39
