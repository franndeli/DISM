-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-10-2024 a las 10:17:26
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prac1_dism`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apikey`
--

CREATE TABLE `apikey` (
  `idKey` int(11) NOT NULL,
  `NombreKey` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fichajes`
--

CREATE TABLE `fichajes` (
  `idFichaje` int(11) NOT NULL,
  `FechaHoraEntrada` datetime NOT NULL,
  `FechaHoraSalida` datetime NOT NULL,
  `HorasTrabajadas` int(11) NOT NULL,
  `idTrabajo` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `GeolocalizacionLatitud` float NOT NULL,
  `GeolocalizacionLongitud` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `fichajes`
--

INSERT INTO `fichajes` (`idFichaje`, `FechaHoraEntrada`, `FechaHoraSalida`, `HorasTrabajadas`, `idTrabajo`, `idUsuario`, `GeolocalizacionLatitud`, `GeolocalizacionLongitud`) VALUES
(1, '2024-10-21 08:00:00', '2024-10-21 17:00:00', 100, 1, 1, 40.4168, -3.70379),
(2, '2024-10-25 17:41:02', '2024-10-25 17:41:02', 54, 3, 1, 213124, 65464),
(3, '2024-10-25 17:41:37', '2024-10-25 17:41:37', 39, 2, 2, 213124, 54325300),
(4, '2024-10-21 08:00:00', '2024-10-21 17:00:00', 100, 1, 1, 40.4168, -3.70379);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajos`
--

CREATE TABLE `trabajos` (
  `idTrabajo` int(11) NOT NULL,
  `Nombre` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `trabajos`
--

INSERT INTO `trabajos` (`idTrabajo`, `Nombre`) VALUES
(1, 'Desarrollo Web'),
(2, 'Limpieza baños'),
(3, 'Organizar reuniones'),
(4, 'Mantenimiento general');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Usuario` varchar(50) DEFAULT NULL,
  `Clave` varchar(50) DEFAULT NULL,
  `Tipo` enum('Administrador','Usuario') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `Nombre`, `Usuario`, `Clave`, `Tipo`) VALUES
(1, 'Francisco', 'frandeli_01', '1234', 'Usuario'),
(2, 'Celia', 'celia_02', '1234', 'Usuario');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `apikey`
--
ALTER TABLE `apikey`
  ADD PRIMARY KEY (`idKey`);

--
-- Indices de la tabla `fichajes`
--
ALTER TABLE `fichajes`
  ADD PRIMARY KEY (`idFichaje`),
  ADD KEY `idTrabajo` (`idTrabajo`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `trabajos`
--
ALTER TABLE `trabajos`
  ADD PRIMARY KEY (`idTrabajo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `apikey`
--
ALTER TABLE `apikey`
  MODIFY `idKey` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fichajes`
--
ALTER TABLE `fichajes`
  MODIFY `idFichaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `fichajes`
--
ALTER TABLE `fichajes`
  ADD CONSTRAINT `idTrabajoFichajes_idTrabajo` FOREIGN KEY (`idTrabajo`) REFERENCES `trabajos` (`idTrabajo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idUsuarioFichajes_idUsuariol` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
