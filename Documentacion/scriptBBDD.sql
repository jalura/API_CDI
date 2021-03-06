CREATE DATABASE `IMSS_CDI` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;


-- IMSS_CDI.SIAC_ENTIDAD definition

CREATE TABLE `SIAC_ENTIDAD` (
  `CVE_ENTIDAD` int NOT NULL AUTO_INCREMENT,
  `NOM_NOMBRE` varchar(100) NOT NULL,
  `FEC_EXPIRA` date DEFAULT NULL,
  `FEC_ALTA` date NOT NULL,
  `FEC_ACTUALIZACION` date DEFAULT NULL,
  `FEC_BAJA` date DEFAULT NULL,
  PRIMARY KEY (`CVE_ENTIDAD`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- IMSS_CDI.SIAC_NIVEL definition

CREATE TABLE `SIAC_NIVEL` (
  `CVE_NIVEL` int NOT NULL AUTO_INCREMENT,
  `NOM_NOMBRE` varchar(50) NOT NULL,
  `NUM_NIVEL` int NOT NULL,
  `FEC_EXPIRA` date DEFAULT NULL,
  `FEC_ALTA` date NOT NULL,
  `FEC_ACTUALIZACION` date DEFAULT NULL,
  `FEC_BAJA` date DEFAULT NULL,
  PRIMARY KEY (`CVE_NIVEL`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- IMSS_CDI.SIAC_OOAD definition

CREATE TABLE `SIAC_OOAD` (
  `CVE_OOAD` int NOT NULL AUTO_INCREMENT,
  `NOM_NOMBRE` varchar(150) NOT NULL,
  `NOM_CORTO` varchar(100) NOT NULL,
  `NOM_OOAD` varchar(100) NOT NULL,
  `CVE_CORREO_TITULAR` varchar(50) NOT NULL,
  `CVE_TIPO_OOAD` int NOT NULL,
  `CVE_ENTIDAD` int NOT NULL,
  `CVE_ZONA` int NOT NULL,
  `FEC_EXPIRA` date DEFAULT NULL,
  `FEC_ALTA` date NOT NULL,
  `FEC_ACTUALIZACION` date DEFAULT NULL,
  `FEC_BAJA` date DEFAULT NULL,
  PRIMARY KEY (`CVE_OOAD`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- IMSS_CDI.SIAC_OOAD_PROBLEMATICA definition

CREATE TABLE `SIAC_OOAD_PROBLEMATICA` (
  `CVE_OOAD_PROBLEMATICA` int NOT NULL AUTO_INCREMENT,
  `NOM_RESPONSABLE` varchar(50) NOT NULL,
  `DES_OTRO` varchar(256) DEFAULT NULL,
  `CVE_OOAD` int NOT NULL,
  `CVE_PROBLEMATICA` int NOT NULL,
  `CVE_NIVEL` int NOT NULL,
  `FEC_EXPIRA` date DEFAULT NULL,
  `FEC_ALTA` date NOT NULL,
  `FEC_ACTUALIZACION` date DEFAULT NULL,
  `FEC_BAJA` date DEFAULT NULL,
  PRIMARY KEY (`CVE_OOAD_PROBLEMATICA`),
  KEY `fk_SIAC_OOAD_PROBLEMATICA_SIAC_PROBLEMATICA_idx` (`CVE_PROBLEMATICA`),
  KEY `fk_SIAC_OOAD_PROBLEMATICA_SIAC_OOAD_idx` (`CVE_OOAD`),
  KEY `fk_SIAC_OOAD_PROBLEMATICA_SIAC_NIVEL_idx` (`CVE_NIVEL`),
  CONSTRAINT `fk_SIAC_OOAD_PROBLEMATICA_SIAC_NIVEL` FOREIGN KEY (`CVE_NIVEL`) REFERENCES `SIAC_NIVEL` (`CVE_NIVEL`),
  CONSTRAINT `fk_SIAC_OOAD_PROBLEMATICA_SIAC_PROBLEMATICA` FOREIGN KEY (`CVE_PROBLEMATICA`) REFERENCES `SIAC_PROBLEMATICA` (`CVE_PROBLEMATICA`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- IMSS_CDI.SIAC_PROBLEMATICA definition

CREATE TABLE `SIAC_PROBLEMATICA` (
  `CVE_PROBLEMATICA` int NOT NULL AUTO_INCREMENT,
  `NOM_NOMBRE` varchar(50) NOT NULL,
  `CVE_TIPO_PROBLEMATICA` int NOT NULL,
  `FEC_EXPIRA` date DEFAULT NULL,
  `FEC_ALTA` date NOT NULL,
  `FEC_ACTUALIZACION` date DEFAULT NULL,
  `FEC_BAJA` date DEFAULT NULL,
  PRIMARY KEY (`CVE_PROBLEMATICA`),
  KEY `fk_SIAC_PROBLEMATICA_SIAC_TIPO_PROBLEMATICA_idx` (`CVE_TIPO_PROBLEMATICA`),
  CONSTRAINT `fk_SIAC_PROBLEMATICA_SIAC_TIPO_PROBLEMATICA` FOREIGN KEY (`CVE_TIPO_PROBLEMATICA`) REFERENCES `SIAC_TIPO_PROBLEMATICA` (`CVE_TIPO_PROBLEMATICA`)
) ENGINE=InnoDB AUTO_INCREMENT=197 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- IMSS_CDI.SIAC_TIPO_PROBLEMATICA definition

CREATE TABLE `SIAC_TIPO_PROBLEMATICA` (
  `CVE_TIPO_PROBLEMATICA` int NOT NULL AUTO_INCREMENT,
  `NOM_NOMBRE` varchar(50) NOT NULL,
  `FEC_EXPIRA` date DEFAULT NULL,
  `FEC_ALTA` date NOT NULL,
  `FEC_ACTUALIZACION` date DEFAULT NULL,
  `FEC_BAJA` date DEFAULT NULL,
  PRIMARY KEY (`CVE_TIPO_PROBLEMATICA`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;



-- IMSS_CDI.SIAT_USUARIOS definition

CREATE TABLE `SIAT_USUARIOS` (
  `CVE_USUARIO` int NOT NULL AUTO_INCREMENT,
  `NOM_NOMBRE` varchar(50) NOT NULL,
  `NOM_APELLIDOPATERNO` varchar(50) NOT NULL,
  `NOM_APELLIDOMATERNO` varchar(50) DEFAULT NULL,
  `CVE_MATRICULA` varchar(45) NOT NULL,
  `CVE_CORREO` varchar(100) NOT NULL,
  `NOM_CUENTAMETRO` varchar(100) NOT NULL,
  `FEC_EXPIRA` date DEFAULT NULL,
  `FEC_ALTA` date NOT NULL,
  `FEC_ACTUALIZACION` date DEFAULT NULL,
  `FEC_BAJA` date DEFAULT NULL,
  PRIMARY KEY (`CVE_USUARIO`),
  UNIQUE KEY `SIAT_USUARIOS_CVE_CORREO_IDX` (`CVE_CORREO`) USING BTREE,
  UNIQUE KEY `SIAT_USUARIOS_CVE_MATRICULA_IDX` (`CVE_MATRICULA`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

