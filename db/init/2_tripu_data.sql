-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: tripulaciones
-- ------------------------------------------------------
-- Server version	8.0.34
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

/*!50503 SET NAMES utf8 */
;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;

/*!40103 SET TIME_ZONE='+00:00' */
;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Dumping data for table `tbBranches`
--
LOCK TABLES `tbBranches` WRITE;

/*!40000 ALTER TABLE `tbBranches` DISABLE KEYS */
;

INSERT INTO
    `tbBranches`
VALUES
    (
        1,
        1,
        'Central Office Madrid',
        'Plaza Energía 001',
        'Madrid',
        'Spain',
        'Central office in Madrid'
    ),
(
        2,
        1,
        'Northern HQ',
        'Avenida del Norte 002',
        'Bilbao',
        'Spain',
        'Headquarters for the Northern region'
    ),
(
        3,
        1,
        'Rome Branch',
        'Via Energetica 003',
        'Rome',
        'Italy',
        'Italian branch office'
    ),
(
        4,
        1,
        'Barcelona Tech Center',
        'Tech Innovation Street 004',
        'Barcelona',
        'Spain',
        'Technology innovation center in Barcelona'
    ),
(
        5,
        1,
        'Lisbon Operations',
        'Operations Avenue 005',
        'Lisbon',
        'Portugal',
        'Operational center in Lisbon'
    ),
(
        6,
        1,
        'Frankfurt Logistics',
        'Logistics Platz 006',
        'Frankfurt',
        'Germany',
        'Logistics center in Frankfurt'
    ),
(
        7,
        1,
        'London Finance Office',
        'Finance Road 007',
        'London',
        'United Kingdom',
        'Finance office in London'
    ),
(
        8,
        1,
        'Amsterdam Research Hub',
        'Research Lane 008',
        'Amsterdam',
        'Netherlands',
        'Research hub in Amsterdam'
    ),
(
        9,
        2,
        'Main Office Barcelona',
        'Avenida Farmacia 101',
        'Barcelona',
        'Spain',
        'Main office in Barcelona'
    ),
(
        10,
        2,
        'Southern Research Center',
        'Research Street 102',
        'Seville',
        'Spain',
        'Research center in Southern Spain'
    ),
(
        11,
        2,
        'Paris Branch',
        'Pharma Avenue 103',
        'Paris',
        'France',
        'Branch office in Paris'
    ),
(
        12,
        2,
        'Munich Logistics',
        'Logistics Platz 104',
        'Munich',
        'Germany',
        'Logistics center in Munich'
    ),
(
        13,
        2,
        'Lisbon Operations',
        'Operations Avenue 105',
        'Lisbon',
        'Portugal',
        'Operational center in Lisbon'
    ),
(
        14,
        2,
        'London Marketing Office',
        'Marketing Road 106',
        'London',
        'United Kingdom',
        'Marketing office in London'
    ),
(
        15,
        2,
        'Brussels Sales Center',
        'Sales Lane 107',
        'Brussels',
        'Belgium',
        'Sales center in Brussels'
    ),
(
        16,
        2,
        'Zurich Innovation Hub',
        'Innovation Platz 108',
        'Zurich',
        'Switzerland',
        'Innovation hub in Zurich'
    ),
(
        17,
        3,
        'Headquarters',
        'Consulting St. 111',
        'Barcelona',
        'Spain',
        'Global headquarters'
    ),
(
        18,
        3,
        'Southern Office',
        'Advisors Ave. 222',
        'Lisbon',
        'Portugal',
        'Southern regional office'
    ),
(
        19,
        3,
        'London Branch',
        'Consultancy Road 333',
        'London',
        'United Kingdom',
        'UK branch office'
    ),
(
        20,
        4,
        'Main Office',
        'Oil Street 555',
        'Madrid',
        'Spain',
        'Main office location'
    ),
(
        21,
        4,
        'Northern Branch',
        'Petroleum Blvd 666',
        'Oslo',
        'Norway',
        'Northern regional branch'
    ),
(
        22,
        4,
        'Milan Office',
        'Drilling Lane 777',
        'Milan',
        'Italy',
        'Italian branch office'
    ),
(
        23,
        5,
        'Tech Hub',
        'Innovation St. 888',
        'Barcelona',
        'Spain',
        'Main innovation center'
    ),
(
        24,
        5,
        'Berlin Office',
        'Tech Road 999',
        'Berlin',
        'Germany',
        'Berlin tech office'
    ),
(
        25,
        5,
        'Amsterdam Branch',
        'Innovate Lane 1010',
        'Amsterdam',
        'Netherlands',
        'Netherlands branch'
    ),
(
        26,
        6,
        'Sede Central BILBAO',
        'Av. Kuna 123',
        'Bilbao',
        'Spain',
        'Oficina principal'
    );

/*!40000 ALTER TABLE `tbBranches` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `tbComments`
--
LOCK TABLES `tbComments` WRITE;

/*!40000 ALTER TABLE `tbComments` DISABLE KEYS */
;

INSERT INTO
    `tbComments`
VALUES
    (1, 1, 1, 'Me cae mal mi jefe.'),
(
        2,
        2,
        1,
        'El parking para empleados está muy lejos de la fábrica.'
    ),
(3, 3, 1, 'Tengo mucha carga de trabajo.'),
(
        4,
        4,
        1,
        'La cafetería necesita más opciones saludables.'
    ),
(
        5,
        5,
        1,
        'Las reuniones suelen ser demasiado largas.'
    ),
(
        6,
        6,
        1,
        'Me gustaría más oportunidades de formación.'
    ),
(7, 7, 1, 'El ambiente de trabajo es muy bueno.'),
(
        8,
        8,
        1,
        'Necesitamos mejores equipos informáticos.'
    ),
(
        9,
        9,
        1,
        'El sistema de climatización no funciona bien.'
    ),
(
        10,
        10,
        1,
        'Sería útil tener más flexibilidad en los horarios.'
    );

/*!40000 ALTER TABLE `tbComments` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `tbCompanies`
--
LOCK TABLES `tbCompanies` WRITE;

/*!40000 ALTER TABLE `tbCompanies` DISABLE KEYS */
;

INSERT INTO
    `tbCompanies`
VALUES
    (
        1,
        'B12345678',
        'PHARMA SOLUTIONS',
        'Soluciones Farmacéuticas S.A.',
        NULL
    ),
(
        2,
        'C98765432',
        'GLOBAL CONSULTING',
        'Consultores Globales S.L.',
        NULL
    ),
(
        3,
        'D55555555',
        'OIL MASTERS',
        'Maestros del Petróleo S.A.',
        NULL
    ),
(
        4,
        'E87654321',
        'TECH INNOVATORS',
        'Innovadores Tecnológicos S.A.',
        NULL
    ),
(
        5,
        'F99999999',
        'GREEN POWER CORP',
        'Corporación de Energía Verde S.A.',
        NULL
    ),
(
        6,
        'A48484848',
        'BBK BOOTCAMPS BY THE BRIDGE',
        'THE BRIDGE S.A.',
        NULL
    );

/*!40000 ALTER TABLE `tbCompanies` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `tbDepartments`
--
LOCK TABLES `tbDepartments` WRITE;

/*!40000 ALTER TABLE `tbDepartments` DISABLE KEYS */
;

INSERT INTO
    `tbDepartments`
VALUES
    (
        1,
        1,
        'Research and Development',
        'Pharmaceutical research and development department'
    ),
(
        2,
        1,
        'Quality Assurance',
        'Quality control and assurance department'
    ),
(
        3,
        1,
        'Sales and Marketing',
        'Sales and marketing department'
    ),
(
        4,
        1,
        'Logistics and Distribution',
        'Logistics and distribution department'
    ),
(
        5,
        1,
        'Finance and Accounting',
        'Finance and accounting department'
    ),
(
        6,
        2,
        'Consulting Services',
        'Consulting services department'
    ),
(
        7,
        2,
        'Human Resources',
        'Human resources department'
    ),
(
        8,
        2,
        'Information Technology',
        'IT services and technology department'
    ),
(9, 2, 'Legal Affairs', 'Legal affairs department'),
(
        10,
        2,
        'Marketing and Communications',
        'Marketing and communications department'
    ),
(
        11,
        3,
        'Exploration and Production',
        'Exploration and production department'
    ),
(
        12,
        3,
        'Health, Safety, and Environment',
        'HSE department'
    ),
(
        13,
        3,
        'Engineering and Operations',
        'Engineering and operations department'
    ),
(
        14,
        3,
        'Supply Chain and Procurement',
        'Supply chain and procurement department'
    ),
(
        15,
        3,
        'Finance and Planning',
        'Finance and planning department'
    ),
(
        16,
        4,
        'Research and Development',
        'Technology research and development department'
    ),
(
        17,
        4,
        'Software Development',
        'Software development and programming department'
    ),
(
        18,
        4,
        'Hardware Engineering',
        'Hardware engineering and design department'
    ),
(
        19,
        4,
        'Project Management',
        'Project management and coordination department'
    ),
(
        20,
        4,
        'Quality Assurance',
        'Quality assurance and testing department'
    ),
(
        21,
        5,
        'Renewable Energy Research',
        'Renewable energy research and development department'
    ),
(
        22,
        5,
        'Environmental Affairs',
        'Environmental affairs and sustainability department'
    ),
(
        23,
        5,
        'Business Development',
        'Business development and strategy department'
    ),
(
        24,
        5,
        'Operations and Maintenance',
        'Operations and maintenance department'
    ),
(
        25,
        5,
        'Finance and Investments',
        'Finance and investments department'
    ),
(26, 6, 'Full Stack', ''),
(27, 6, 'Data Science', ''),
(28, 6, 'UX/UI Designer', ''),
(29, 6, 'Ciberseguridad', ''),
(30, 6, 'Marketing Digital', ''),
(31, 6, 'DevOps', '');

/*!40000 ALTER TABLE `tbDepartments` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `tbEmployees`
--
LOCK TABLES `tbEmployees` WRITE;

/*!40000 ALTER TABLE `tbEmployees` DISABLE KEYS */
;

INSERT INTO
    `tbEmployees`
VALUES
    (
        1,
        1,
        1,
        1,
        1,
        'Juan',
        'López',
        'juan.lopez@empresa1.com',
        '12345678A',
        '+123456789',
        '',
        'hash',
        1,
        0
    ),
(
        2,
        1,
        2,
        1,
        2,
        'María',
        'García',
        'maria.garcia@empresa1.com',
        '23456789B',
        '+234567890',
        '',
        'hash',
        0,
        0
    ),
(
        3,
        1,
        3,
        1,
        3,
        'Carlos',
        'Martínez',
        'carlos.martinez@empresa1.com',
        '34567890C',
        '+345678901',
        '',
        'hash',
        0,
        0
    ),
(
        4,
        1,
        4,
        1,
        1,
        'Laura',
        'Sánchez',
        'laura.sanchez@empresa1.com',
        '45678901D',
        '+456789012',
        '',
        'hash',
        0,
        0
    ),
(
        5,
        1,
        5,
        1,
        2,
        'Pedro',
        'Rodríguez',
        'pedro.rodriguez@empresa1.com',
        '56789012E',
        '+567890123',
        '',
        'hash',
        0,
        0
    ),
(
        6,
        1,
        1,
        2,
        3,
        'Ana',
        'Fernández',
        'ana.fernandez@empresa1.com',
        '67890123F',
        '+678901234',
        '',
        'hash',
        0,
        0
    ),
(
        7,
        1,
        2,
        2,
        1,
        'Diego',
        'López',
        'diego.lopez@empresa1.com',
        '78901234G',
        '+789012345',
        '',
        'hash',
        0,
        0
    ),
(
        8,
        1,
        3,
        2,
        2,
        'Sara',
        'Gómez',
        'sara.gomez@empresa1.com',
        '89012345H',
        '+890123456',
        '',
        'hash',
        0,
        0
    ),
(
        9,
        1,
        4,
        2,
        3,
        'Javier',
        'Pérez',
        'javier.perez@empresa1.com',
        '90123456I',
        '+901234567',
        '',
        'hash',
        0,
        0
    ),
(
        10,
        1,
        5,
        2,
        1,
        'Carmen',
        'Hernández',
        'carmen.hernandez@empresa1.com',
        '01234567J',
        '+0123456789',
        '',
        'hash',
        0,
        0
    ),
(
        11,
        1,
        1,
        3,
        2,
        'Mario',
        'Díaz',
        'mario.diaz@empresa1.com',
        '12345678K',
        '+1234567890',
        '',
        'hash',
        0,
        0
    ),
(
        12,
        1,
        2,
        3,
        3,
        'Elena',
        'Álvarez',
        'elena.alvarez@empresa1.com',
        '23456789L',
        '+2345678901',
        '',
        'hash',
        0,
        0
    ),
(
        13,
        1,
        3,
        3,
        1,
        'Alberto',
        'Romero',
        'alberto.romero@empresa1.com',
        '34567890M',
        '+3456789012',
        '',
        'hash',
        0,
        0
    ),
(
        14,
        1,
        4,
        3,
        2,
        'Marta',
        'Fuentes',
        'marta.fuentes@empresa1.com',
        '45678901N',
        '+4567890123',
        '',
        'hash',
        0,
        0
    ),
(
        15,
        1,
        5,
        3,
        3,
        'Luis',
        'Ortega',
        'luis.ortega@empresa1.com',
        '56789012O',
        '+5678901234',
        '',
        'hash',
        0,
        0
    ),
(
        16,
        6,
        26,
        26,
        NULL,
        'Víctor',
        'Campos',
        'victor@bbkbootcamps.com',
        '11114444Z',
        '666555444',
        '',
        'hash',
        0,
        1
    ),
(
        17,
        6,
        26,
        26,
        NULL,
        'Esther',
        'Carmona',
        'esther@bbkbootcamps.com',
        '22225555W',
        '666444555',
        '',
        'hash',
        0,
        1
    ),
(
        18,
        6,
        26,
        26,
        NULL,
        'Alex',
        'Basurto',
        'alex@bbkbootcamps.com',
        '33337777Y',
        '666454545',
        '',
        'hash',
        0,
        1
    );

/*!40000 ALTER TABLE `tbEmployees` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `tbFeelings`
--
LOCK TABLES `tbFeelings` WRITE;

/*!40000 ALTER TABLE `tbFeelings` DISABLE KEYS */
;

INSERT INTO
    `tbFeelings`
VALUES
    (1, 'Tristeza'),
(2, 'Alegría'),
(3, 'Frustración'),
(4, 'Motivación'),
(5, 'Estrés'),
(6, 'Satisfacción'),
(7, 'Ansiedad'),
(8, 'Entusiasmo'),
(9, 'Cansancio');

/*!40000 ALTER TABLE `tbFeelings` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `tbReasons`
--
LOCK TABLES `tbReasons` WRITE;

/*!40000 ALTER TABLE `tbReasons` DISABLE KEYS */
;

INSERT INTO
    `tbReasons`
VALUES
    (1, 'Transporte'),
(2, 'Relación con los compañeros'),
(3, 'Relación con el jefe'),
(4, 'Motivos personales'),
(5, 'Salario poco competitivo'),
(6, 'Incumplimiento jornada laboral'),
(7, 'Falta de reconocimiento'),
(8, 'Condiciones de trabajo'),
(9, 'Carga de trabajo'),
(10, 'Oportunidades de promoción'),
(11, 'Ambiente laboral'),
(12, 'Equilibrio vida laboral/personal');

/*!40000 ALTER TABLE `tbReasons` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `tbScores`
--
LOCK TABLES `tbScores` WRITE;

/*!40000 ALTER TABLE `tbScores` DISABLE KEYS */
;

INSERT INTO
    `tbScores`
VALUES
    (1, 'MUY MAL'),
(2, 'MAL'),
(3, 'REGULAR'),
(4, 'BIEN'),
(5, 'MUY BIEN');

/*!40000 ALTER TABLE `tbScores` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `tbShifts`
--
LOCK TABLES `tbShifts` WRITE;

/*!40000 ALTER TABLE `tbShifts` DISABLE KEYS */
;

INSERT INTO
    `tbShifts`
VALUES
    (1, 1, 'Mañanas', ''),
(2, 1, 'Tardes', ''),
(3, 1, 'Noches', ''),
(4, 3, 'Mañanas', ''),
(5, 3, 'Tardes', ''),
(6, 3, 'Noches', ''),
(7, 5, 'Mañanas', ''),
(8, 5, 'Tardes', ''),
(9, 5, 'Noches', '');

/*!40000 ALTER TABLE `tbShifts` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `tbVoting`
--
LOCK TABLES `tbVoting` WRITE;

/*!40000 ALTER TABLE `tbVoting` DISABLE KEYS */
;

INSERT INTO
    `tbVoting`
VALUES
    (1, 1, 1, '2024-01-03', 4, '2024-01-04', 5),
(2, 2, 1, '2024-01-01', 3, '2024-01-02', 4),
(3, 2, 1, '2024-01-02', 4, '2024-01-03', 3),
(4, 2, 1, '2024-01-03', 3, '2024-01-04', 5),
(5, 2, 1, '2024-01-04', 5, '2024-01-05', 2),
(6, 2, 1, '2024-01-05', 2, '2024-01-06', 3),
(7, 2, 1, '2024-01-06', 3, '2024-01-07', 4),
(8, 2, 1, '2024-01-07', 4, '2024-01-08', 3),
(9, 2, 1, '2024-01-08', 3, '2024-01-09', 2),
(10, 2, 1, '2024-01-09', 2, '2024-01-10', 4),
(11, 2, 1, '2024-01-10', 4, '2024-01-11', 5),
(12, 2, 1, '2024-01-11', 5, '2024-01-12', 3),
(13, 2, 1, '2024-01-12', 3, '2024-01-13', 4),
(14, 2, 1, '2024-01-13', 4, '2024-01-14', 2),
(15, 2, 1, '2024-01-14', 2, '2024-01-15', 3),
(16, 2, 1, '2024-01-15', 3, '2024-01-16', 4),
(17, 2, 1, '2024-01-16', 4, '2024-01-17', 2),
(18, 2, 1, '2024-01-17', 2, '2024-01-18', 5),
(19, 2, 1, '2024-01-18', 5, '2024-01-19', 3),
(20, 2, 1, '2024-01-19', 3, '2024-01-20', 4),
(21, 2, 1, '2024-01-20', 4, '2024-01-21', 2),
(22, 2, 1, '2024-01-21', 2, '2024-01-22', 3),
(23, 2, 1, '2024-01-22', 3, '2024-01-23', 5),
(24, 2, 1, '2024-01-23', 5, '2024-01-24', 4),
(25, 2, 1, '2024-01-24', 4, '2024-01-25', 2),
(26, 2, 1, '2024-01-25', 2, '2024-01-26', 3),
(27, 2, 1, '2024-01-26', 3, '2024-01-27', 5),
(28, 2, 1, '2024-01-27', 5, '2024-01-28', 4),
(29, 2, 1, '2024-01-28', 4, '2024-01-29', 3),
(30, 2, 1, '2024-01-29', 3, '2024-01-30', 2),
(31, 2, 1, '2024-01-30', 2, '2024-01-31', 4),
(32, 1, 1, '2024-01-01', 3, '2024-01-02', 4),
(33, 1, 1, '2024-01-02', 4, '2024-01-03', 3),
(34, 1, 1, '2024-01-03', 3, '2024-01-04', 5),
(35, 1, 1, '2024-01-04', 5, '2024-01-05', 2),
(36, 1, 1, '2024-01-05', 2, '2024-01-06', 3),
(37, 1, 1, '2024-01-06', 3, '2024-01-07', 4),
(38, 1, 1, '2024-01-07', 4, '2024-01-08', 3),
(39, 1, 1, '2024-01-08', 3, '2024-01-09', 2),
(40, 1, 1, '2024-01-09', 2, '2024-01-10', 4),
(41, 1, 1, '2024-01-10', 4, '2024-01-11', 5),
(42, 1, 1, '2024-01-11', 5, '2024-01-12', 3),
(43, 1, 1, '2024-01-12', 3, '2024-01-13', 4),
(44, 1, 1, '2024-01-13', 4, '2024-01-14', 2),
(45, 1, 1, '2024-01-14', 2, '2024-01-15', 3),
(46, 1, 1, '2024-01-15', 3, '2024-01-16', 4),
(47, 1, 1, '2024-01-16', 4, '2024-01-17', 2),
(48, 1, 1, '2024-01-17', 2, '2024-01-18', 5),
(49, 1, 1, '2024-01-18', 5, '2024-01-19', 3),
(50, 1, 1, '2024-01-19', 3, '2024-01-20', 4),
(51, 1, 1, '2024-01-20', 4, '2024-01-21', 2),
(52, 1, 1, '2024-01-21', 2, '2024-01-22', 3),
(53, 1, 1, '2024-01-22', 3, '2024-01-23', 5),
(54, 1, 1, '2024-01-23', 5, '2024-01-24', 4),
(55, 1, 1, '2024-01-24', 4, '2024-01-25', 2),
(56, 1, 1, '2024-01-25', 2, '2024-01-26', 3),
(57, 1, 1, '2024-01-26', 3, '2024-01-27', 5),
(58, 1, 1, '2024-01-27', 5, '2024-01-28', 4),
(59, 1, 1, '2024-01-28', 4, '2024-01-29', 3),
(60, 1, 1, '2024-01-29', 3, '2024-01-30', 2),
(61, 1, 1, '2024-01-30', 2, '2024-01-31', 4),
(62, 3, 1, '2024-01-01', 3, '2024-01-02', 4),
(63, 3, 1, '2024-01-02', 4, '2024-01-03', 3),
(64, 3, 1, '2024-01-03', 3, '2024-01-04', 5),
(65, 3, 1, '2024-01-04', 5, '2024-01-05', 2),
(66, 3, 1, '2024-01-05', 2, '2024-01-06', 3),
(67, 3, 1, '2024-01-06', 3, '2024-01-07', 4),
(68, 3, 1, '2024-01-07', 4, '2024-01-08', 3),
(69, 3, 1, '2024-01-08', 3, '2024-01-09', 2),
(70, 3, 1, '2024-01-09', 2, '2024-01-10', 4),
(71, 3, 1, '2024-01-10', 4, '2024-01-11', 5),
(72, 3, 1, '2024-01-11', 5, '2024-01-12', 3),
(73, 3, 1, '2024-01-12', 3, '2024-01-13', 4),
(74, 3, 1, '2024-01-13', 4, '2024-01-14', 2),
(75, 3, 1, '2024-01-14', 2, '2024-01-15', 3),
(76, 3, 1, '2024-01-15', 3, '2024-01-16', 4),
(77, 3, 1, '2024-01-16', 4, '2024-01-17', 2),
(78, 3, 1, '2024-01-17', 2, '2024-01-18', 5),
(79, 3, 1, '2024-01-18', 5, '2024-01-19', 3),
(80, 3, 1, '2024-01-19', 3, '2024-01-20', 4),
(81, 3, 1, '2024-01-20', 4, '2024-01-21', 2),
(82, 3, 1, '2024-01-21', 2, '2024-01-22', 3),
(83, 3, 1, '2024-01-22', 3, '2024-01-23', 5),
(84, 3, 1, '2024-01-23', 5, '2024-01-24', 4),
(85, 3, 1, '2024-01-24', 4, '2024-01-25', 2),
(86, 3, 1, '2024-01-25', 2, '2024-01-26', 3),
(87, 3, 1, '2024-01-26', 3, '2024-01-27', 5),
(88, 3, 1, '2024-01-27', 5, '2024-01-28', 4),
(89, 3, 1, '2024-01-28', 4, '2024-01-29', 3),
(90, 3, 1, '2024-01-29', 3, '2024-01-30', 2),
(91, 3, 1, '2024-01-30', 2, '2024-01-31', 4);

/*!40000 ALTER TABLE `tbVoting` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `tbVotingFeelings`
--
LOCK TABLES `tbVotingFeelings` WRITE;

/*!40000 ALTER TABLE `tbVotingFeelings` DISABLE KEYS */
;

INSERT INTO
    `tbVotingFeelings`
VALUES
    (1, 1, 1),
(2, 1, 2),
(3, 2, 2),
(4, 3, 3),
(5, 4, 4),
(6, 4, 1),
(7, 5, 5),
(8, 6, 6),
(9, 6, 2),
(10, 6, 3),
(11, 7, 7),
(12, 8, 8),
(13, 9, 9),
(14, 9, 4),
(15, 10, 1),
(16, 11, 2),
(17, 12, 3),
(18, 13, 4),
(19, 14, 5),
(20, 15, 6),
(21, 15, 1),
(22, 16, 7),
(23, 17, 8),
(24, 17, 2),
(25, 18, 9),
(26, 19, 1),
(27, 20, 2),
(28, 20, 3),
(29, 21, 3),
(30, 22, 4),
(31, 23, 5),
(32, 24, 6),
(33, 24, 4),
(34, 25, 7),
(35, 26, 8),
(36, 27, 9),
(37, 27, 1),
(38, 28, 1),
(39, 29, 2),
(40, 30, 3),
(41, 31, 4),
(42, 32, 5),
(43, 33, 6),
(44, 33, 2),
(45, 34, 7),
(46, 35, 8),
(47, 36, 9),
(48, 36, 3),
(49, 37, 1),
(50, 38, 2),
(51, 39, 3),
(52, 40, 4),
(53, 41, 5),
(54, 42, 6),
(55, 43, 7),
(56, 43, 4),
(57, 44, 8),
(58, 45, 9),
(59, 46, 1),
(60, 46, 5),
(61, 47, 2),
(62, 48, 3),
(63, 49, 4),
(64, 50, 5),
(65, 51, 6),
(66, 52, 7),
(67, 53, 8),
(68, 53, 6),
(69, 54, 9),
(70, 55, 1),
(71, 56, 2),
(72, 56, 7),
(73, 57, 3),
(74, 58, 4),
(75, 59, 5),
(76, 60, 6),
(77, 61, 7),
(78, 62, 8),
(79, 63, 9),
(80, 63, 1),
(81, 64, 1),
(82, 65, 2),
(83, 66, 3),
(84, 66, 8),
(85, 67, 4),
(86, 68, 5),
(87, 69, 6),
(88, 70, 7),
(89, 71, 8),
(90, 72, 9),
(91, 73, 1),
(92, 73, 9),
(93, 74, 2),
(94, 75, 3),
(95, 76, 4),
(96, 76, 2),
(97, 77, 5),
(98, 78, 6),
(99, 79, 7),
(100, 80, 8),
(101, 81, 9),
(102, 82, 1),
(103, 83, 2),
(104, 83, 3),
(105, 84, 4),
(106, 85, 5),
(107, 86, 6),
(108, 86, 4),
(109, 87, 7),
(110, 88, 8),
(111, 89, 9),
(112, 89, 5),
(113, 90, 1),
(114, 91, 2);

/*!40000 ALTER TABLE `tbVotingFeelings` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `tbVotingReasons`
--
LOCK TABLES `tbVotingReasons` WRITE;

/*!40000 ALTER TABLE `tbVotingReasons` DISABLE KEYS */
;

INSERT INTO
    `tbVotingReasons`
VALUES
    (1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 3, 4),
(5, 4, 5),
(6, 4, 1),
(7, 5, 6),
(8, 6, 7),
(9, 6, 2),
(10, 6, 3),
(11, 7, 8),
(12, 8, 9),
(13, 9, 10),
(14, 9, 4),
(15, 10, 11),
(16, 11, 12),
(17, 12, 1),
(18, 13, 2),
(19, 14, 3),
(20, 15, 4),
(21, 15, 5),
(22, 16, 6),
(23, 17, 7),
(24, 17, 8),
(25, 18, 9),
(26, 19, 10),
(27, 20, 11),
(28, 20, 12),
(29, 21, 1),
(30, 22, 2),
(31, 23, 3),
(32, 24, 4),
(33, 24, 5),
(34, 25, 6),
(35, 26, 7),
(36, 27, 8),
(37, 27, 9),
(38, 28, 10),
(39, 29, 11),
(40, 30, 12),
(41, 31, 1),
(42, 32, 2),
(43, 33, 3),
(44, 33, 4),
(45, 34, 5),
(46, 35, 6),
(47, 36, 7),
(48, 36, 8),
(49, 37, 9),
(50, 38, 10),
(51, 39, 11),
(52, 40, 12),
(53, 41, 1),
(54, 42, 2),
(55, 43, 3),
(56, 43, 4),
(57, 44, 5),
(58, 45, 6),
(59, 46, 7),
(60, 46, 8),
(61, 47, 9),
(62, 48, 10),
(63, 49, 11),
(64, 50, 12),
(65, 51, 1),
(66, 52, 2),
(67, 53, 3),
(68, 53, 4),
(69, 54, 5),
(70, 55, 6),
(71, 56, 7),
(72, 56, 8),
(73, 57, 9),
(74, 58, 10),
(75, 59, 11),
(76, 60, 12),
(77, 61, 1),
(78, 62, 2),
(79, 63, 3),
(80, 63, 4),
(81, 64, 5),
(82, 65, 6),
(83, 66, 7),
(84, 66, 8),
(85, 67, 9),
(86, 68, 10),
(87, 69, 11),
(88, 70, 12),
(89, 71, 1),
(90, 72, 2),
(91, 73, 3),
(92, 73, 4),
(93, 74, 5),
(94, 75, 6),
(95, 76, 7),
(96, 76, 8),
(97, 77, 9),
(98, 78, 10),
(99, 79, 11),
(100, 80, 12),
(101, 81, 1),
(102, 82, 2),
(103, 83, 3),
(104, 83, 4),
(105, 84, 5),
(106, 85, 6),
(107, 86, 7),
(108, 86, 8),
(109, 87, 9),
(110, 88, 10),
(111, 89, 11),
(112, 89, 12),
(113, 90, 1),
(114, 91, 2);

/*!40000 ALTER TABLE `tbVotingReasons` ENABLE KEYS */
;

UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2024-01-05 11:03:25