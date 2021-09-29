-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 29, 2021 at 02:12 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_reg`
--

CREATE TABLE `admin_reg` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `email_address` varchar(50) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `confirm_password` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin_reg`
--

INSERT INTO `admin_reg` (`id`, `first_name`, `last_name`, `email_address`, `password`, `confirm_password`) VALUES
(1, 'THARINDU', 'SENEVIRATHNA', 'tharindupriyashan18@gmail.com', '1996com10', '1996com10'),
(2, 'Dinushi', 'Rajapasksha', 'dinu@net.com', '1997com05', '1997com05'),
(3, 'lasith', 'malinga', 'mailinga@net.com', 'mali123', 'mali123'),
(4, 'THARINDU', 'SENEVIRATHNA', 'tharindupriyashan18@gmail.com', 'asd', 'asd'),
(5, 'Gimhana', 'Deshan', 'gimhana@gmail.com', '12345', '12345'),
(6, 'admin', 'admin', 'admin@net.com', '123', '123'),
(7, 'admin2', 'admin2', 'admin2@net.com', 'admin2', 'admin2');

-- --------------------------------------------------------

--
-- Table structure for table `class_category`
--

CREATE TABLE `class_category` (
  `class_id` int(20) NOT NULL,
  `class_name` varchar(50) NOT NULL,
  `grade` varchar(50) DEFAULT NULL,
  `medium` varchar(50) DEFAULT NULL,
  `cost` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `class_category`
--

INSERT INTO `class_category` (`class_id`, `class_name`, `grade`, `medium`, `cost`) VALUES
(11, 'Mathemtaics', 'Grade 10', 'Sinhala', 900),
(15, 'Mathemtaics', 'Grade 10', 'English', 12121),
(17, 'Science', 'Grade 11', 'Sinhala', 121212),
(18, 'Science', 'Grade 11', 'English', 500),
(19, 'Mathemtaics', 'Grade 10', 'English', 32323),
(20, 'Science', 'Grade 10', 'English', 2323),
(21, 'Mathemtaics', 'Grade 10', 'English', 12121);

-- --------------------------------------------------------

--
-- Table structure for table `class_library`
--

CREATE TABLE `class_library` (
  `id` int(10) NOT NULL,
  `class_date` date DEFAULT NULL,
  `week` varchar(20) DEFAULT NULL,
  `video_src` text DEFAULT NULL,
  `class_note` text DEFAULT NULL,
  `assign_submit` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `class_library`
--

INSERT INTO `class_library` (`id`, `class_date`, `week`, `video_src`, `class_note`, `assign_submit`) VALUES
(1, '0000-00-00', 'dsad', 'dsad', 'http://127.0.0.1:3001/docs/b6899d20-20ee-11ec-9cf3-7fc0e12e7109Tharindu Priyashan (1).pdf', NULL),
(2, '2021-09-07', '4', 'dsdsad', 'http://127.0.0.1:3001/docs/3ae616f0-210a-11ec-a80a-c98ce0a46acaGoogle UX Design Certificate - Create a Research Presentation for Movie Trailer app.pdf', NULL),
(3, '2021-09-15', '5', 'dsadsadsad', 'http://127.0.0.1:3001/docs/9c08f250-2113-11ec-8d1d-db70bc60eb03students-image.bin', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `class_link`
--

CREATE TABLE `class_link` (
  `Id` int(11) NOT NULL,
  `class_date` date NOT NULL,
  `class_time` time NOT NULL,
  `class_name` varchar(30) NOT NULL,
  `grade` varchar(30) NOT NULL,
  `medium` varchar(30) NOT NULL,
  `Link` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `class_link`
--

INSERT INTO `class_link` (`Id`, `class_date`, `class_time`, `class_name`, `grade`, `medium`, `Link`) VALUES
(1, '2021-09-07', '07:36:00', 'Science', 'Grade 10', 'Sinhala', 'dsdsadasd'),
(2, '2021-09-07', '07:36:00', 'Science', 'Grade 10', 'Sinhala', 'dsdsadasd');

-- --------------------------------------------------------

--
-- Table structure for table `cmaths`
--

CREATE TABLE `cmaths` (
  `std_id` int(11) NOT NULL,
  `course_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `course_category`
--

CREATE TABLE `course_category` (
  `course_id` varchar(20) NOT NULL,
  `course_name` varchar(50) NOT NULL,
  `cost` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `physics`
--

CREATE TABLE `physics` (
  `std_id` int(11) NOT NULL,
  `course_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `std_id` int(11) NOT NULL,
  `fname` varchar(200) NOT NULL,
  `lname` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `school` varchar(100) NOT NULL,
  `grade` varchar(100) DEFAULT NULL,
  `medium` varchar(100) DEFAULT NULL,
  `image` blob DEFAULT NULL,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`std_id`, `fname`, `lname`, `phone`, `email`, `school`, `grade`, `medium`, `image`, `username`, `password`) VALUES
(21, 'THARINDU', 'SENEVIRATHNA', '+94766354069', 'tharindupriyashan18@gmail.com', 'ddsda', 'Grade 11', 'English', NULL, 'admin', '123'),
(22, 'Gimhana', 'Deshan', '3232323', 'gimhana@gmail.com', 'dsdsad', 'Grade 11', 'Sinhala', NULL, NULL, NULL),
(24, 'lasith', 'dsdsa', '0765112582', 'mailinga@net.com', 'dwd', 'Grade 11', 'English', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student_login`
--

CREATE TABLE `student_login` (
  `std_id` int(11) NOT NULL,
  `std_name` varchar(200) NOT NULL,
  `user_name` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_login`
--

INSERT INTO `student_login` (`std_id`, `std_name`, `user_name`, `password`) VALUES
(1, 'Dinushi Rajapasksha', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_reg`
--
ALTER TABLE `admin_reg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class_category`
--
ALTER TABLE `class_category`
  ADD PRIMARY KEY (`class_id`);

--
-- Indexes for table `class_library`
--
ALTER TABLE `class_library`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class_link`
--
ALTER TABLE `class_link`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `cmaths`
--
ALTER TABLE `cmaths`
  ADD KEY `std_id` (`std_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `course_category`
--
ALTER TABLE `course_category`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `physics`
--
ALTER TABLE `physics`
  ADD KEY `std_id` (`std_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`std_id`);

--
-- Indexes for table `student_login`
--
ALTER TABLE `student_login`
  ADD PRIMARY KEY (`std_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_reg`
--
ALTER TABLE `admin_reg`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `class_category`
--
ALTER TABLE `class_category`
  MODIFY `class_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `class_library`
--
ALTER TABLE `class_library`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `class_link`
--
ALTER TABLE `class_link`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `std_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `student_login`
--
ALTER TABLE `student_login`
  MODIFY `std_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cmaths`
--
ALTER TABLE `cmaths`
  ADD CONSTRAINT `cmaths_ibfk_1` FOREIGN KEY (`std_id`) REFERENCES `students` (`std_id`),
  ADD CONSTRAINT `cmaths_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course_category` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `physics`
--
ALTER TABLE `physics`
  ADD CONSTRAINT `physics_ibfk_1` FOREIGN KEY (`std_id`) REFERENCES `students` (`std_id`),
  ADD CONSTRAINT `physics_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course_category` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
