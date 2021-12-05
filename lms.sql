-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2021 at 06:17 AM
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
(7, 'admin2', 'admin2', 'admin2@net.com', 'admin2', 'admin2'),
(8, 'admin3', 'admin3', 'admin3@net.com', '1234', '1234'),
(9, 'tharindu', 'admin', 'tharindu@net.com', '123', '123'),
(10, 'tharindu', 'admin', 'tharindu@net.com', '123', '123'),
(11, 'lasith', 'malinga', 'mailinga@net.com', '123', '123'),
(12, 'admin5', 'admin', 'admin5@net.com', '123', '123'),
(13, 'admin10', 'admin', 'admin10@net.com', '123', '123'),
(14, 'tharindu', 'tps', 'tps@net.com', '123', '123');

-- --------------------------------------------------------

--
-- Table structure for table `afterolcmath`
--

CREATE TABLE `afterolcmath` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `medium` varchar(30) NOT NULL,
  `video1` text NOT NULL,
  `week1` text NOT NULL,
  `video2` text NOT NULL,
  `week2` text NOT NULL,
  `video3` text NOT NULL,
  `week3` text NOT NULL,
  `video4` text NOT NULL,
  `week4` text NOT NULL,
  `video5` text NOT NULL,
  `week5` text NOT NULL,
  `submit` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `afterolphy`
--

CREATE TABLE `afterolphy` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `medium` varchar(30) NOT NULL,
  `video1` text NOT NULL,
  `week1` text NOT NULL,
  `video2` text NOT NULL,
  `week2` text NOT NULL,
  `video3` text NOT NULL,
  `week3` text NOT NULL,
  `video4` text NOT NULL,
  `week4` text NOT NULL,
  `video5` text NOT NULL,
  `week5` text NOT NULL,
  `submit` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `afterolphy`
--

INSERT INTO `afterolphy` (`id`, `date`, `medium`, `video1`, `week1`, `video2`, `week2`, `video3`, `week3`, `video4`, `week4`, `video5`, `week5`, `submit`) VALUES
(5, '2021-10-19', 'Sinhala', 'https://youtu.be/--PikweL_PU?list=PLHjwuoik-ep1Vb4RPXNUbAVHxB1rJRC8W', 'https://drive.google.com/file/d/1nbGD97wxjjFvkBWKo0j5H2fL-MmtHqc4/view?usp=sharing', 'https://youtu.be/aCjbDGkryec?list=PLHjwuoik-ep1Vb4RPXNUbAVHxB1rJRC8W', 'https://drive.google.com/file/d/1nbGD97wxjjFvkBWKo0j5H2fL-MmtHqc4/view?usp=sharing', '', '', '', '', '', '', '');

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
(20, 'Science', 'Grade 10', 'English', 2323),
(32, 'Science', 'Grade 11', 'English', 1000),
(33, 'Mathematics', 'Grade 11', 'Sinhala', 1000),
(34, 'Mathematics', 'Grade 10', 'Sinhala', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `class_library`
--

CREATE TABLE `class_library` (
  `id` int(10) NOT NULL,
  `class_name` varchar(255) NOT NULL,
  `class_date` date DEFAULT NULL,
  `grade` varchar(255) NOT NULL,
  `medium` varchar(255) NOT NULL,
  `week` varchar(20) DEFAULT NULL,
  `video_src` text DEFAULT NULL,
  `class_note` text DEFAULT NULL,
  `assign_submit` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `class_library`
--

INSERT INTO `class_library` (`id`, `class_name`, `class_date`, `grade`, `medium`, `week`, `video_src`, `class_note`, `assign_submit`) VALUES
(8, 'Mathemtaics', '2021-10-12', 'Grade 11', 'Sinhala', '4', 'dsdasd', 'http://127.0.0.1:3001/docs/f64a2ed0-24da-11ec-81bc-2d1479d5b970Booking (1).png', NULL);

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
(4, '2021-08-31', '10:10:00', 'Science', 'Grade 11', 'Sinhala', 'dsdasd'),
(5, '2021-10-12', '02:14:00', 'Science', 'Grade 11', 'Sinhala', 'dsadas'),
(6, '2021-10-13', '13:25:00', 'Science', 'After O/L', 'Sinhala', 'dsdsadasd'),
(11, '2021-10-15', '11:10:00', 'Mathemtaics', 'Grade 10', 'English', 'https://zoom.us/j/96882375268?pwd=Y2lWNmVNL2V6dW9JNm5RZFViSXVEUT09'),
(12, '2021-10-07', '23:17:00', 'Mathemtaics', 'Grade 10', 'English', 'https://zoom.us/j/96882375268?pwd=Y2lWNmVNL2V6dW9JNm5RZFViSXVEUT09'),
(13, '2021-10-07', '10:25:00', 'Science', 'Grade 10', 'English', 'https://zoom.us/j/96882375268?pwd=Y2lWNmVNL2V6dW9JNm5RZFViSXVEUT09'),
(14, '2021-10-12', '17:00:00', 'Mathemtaics', 'Grade 10', 'Sinhala', 'https://zoom.us/j/96882375268?pwd=Y2lWNmVNL2V6dW9JNm5RZFViSXVEUT09'),
(15, '2021-10-11', '13:12:00', 'Mathemtaics', 'Grade 10', 'Sinhala', 'https://zoom.us/j/96882375268?pwd=Y2lWNmVNL2V6dW9JNm5RZFViSXVEUT09'),
(16, '2021-10-17', '03:32:00', 'Mathemtaics', 'Grade 11', 'English', 'https://zoom.us/j/96882375268?pwd=Y2lWNmVNL2V6dW9JNm5RZFViSXVEUT09'),
(17, '2021-10-22', '23:30:00', 'Mathemtaics', 'Grade 10', 'English', '');

-- --------------------------------------------------------

--
-- Table structure for table `class_works`
--

CREATE TABLE `class_works` (
  `id` int(11) NOT NULL,
  `class_works` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `class_works`
--

INSERT INTO `class_works` (`id`, `class_works`) VALUES
(4, 'http://127.0.0.1:3001/public/docs/bafdec20-2db0-11ec-93ce-35a73cc7c3faPresentaion.png'),
(5, 'classWorke465e5e0-2db0-11ec-b574-69aeb64350f7Booking.png'),
(6, 'classWork7517d890-3104-11ec-8ca2-334ed5ebb4fcBooking (1).png');

-- --------------------------------------------------------

--
-- Table structure for table `course_category`
--

CREATE TABLE `course_category` (
  `course_id` int(11) NOT NULL,
  `course_name` varchar(50) NOT NULL,
  `grade` varchar(60) NOT NULL,
  `medium` varchar(60) NOT NULL,
  `cost` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course_category`
--

INSERT INTO `course_category` (`course_id`, `course_name`, `grade`, `medium`, `cost`) VALUES
(7, 'A/L Physics', 'After O/L', 'Sinhala', NULL),
(9, 'A/L CMaths', 'After O/L', 'English', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `grade10math`
--

CREATE TABLE `grade10math` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `medium` varchar(30) NOT NULL,
  `video1` text NOT NULL,
  `week1` text NOT NULL,
  `video2` text NOT NULL,
  `week2` text NOT NULL,
  `video3` text NOT NULL,
  `week3` text NOT NULL,
  `video4` text NOT NULL,
  `week4` text NOT NULL,
  `video5` text NOT NULL,
  `week5` text NOT NULL,
  `submit` varchar(555) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `grade10math`
--

INSERT INTO `grade10math` (`id`, `date`, `medium`, `video1`, `week1`, `video2`, `week2`, `video3`, `week3`, `video4`, `week4`, `video5`, `week5`, `submit`) VALUES
(13, '2021-10-12', 'English', 'https://youtu.be/--PikweL_PU?list=PLHjwuoik-ep1Vb4RPXNUbAVHxB1rJRC8W', 'https://drive.google.com/file/d/1nbGD97wxjjFvkBWKo0j5H2fL-MmtHqc4/view?usp=sharing', 'https://youtu.be/aCjbDGkryec?list=PLHjwuoik-ep1Vb4RPXNUbAVHxB1rJRC8W', 'https://drive.google.com/file/d/1nbGD97wxjjFvkBWKo0j5H2fL-MmtHqc4/view?usp=sharing', 'https://youtu.be/MNS9X1fsngM?list=PLHjwuoik-ep1Vb4RPXNUbAVHxB1rJRC8W', 'https://drive.google.com/file/d/1nbGD97wxjjFvkBWKo0j5H2fL-MmtHqc4/view?usp=sharing', '', '', '', '', ''),
(14, '2021-10-13', 'Sinhala', 'https://youtu.be/--PikweL_PU?list=PLHjwuoik-ep1Vb4RPXNUbAVHxB1rJRC8W', 'https://drive.google.com/file/d/1nbGD97wxjjFvkBWKo0j5H2fL-MmtHqc4/view?usp=sharing', 'https://youtu.be/aCjbDGkryec?list=PLHjwuoik-ep1Vb4RPXNUbAVHxB1rJRC8W', 'https://drive.google.com/file/d/1nbGD97wxjjFvkBWKo0j5H2fL-MmtHqc4/view?usp=sharing', '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `grade10sci`
--

CREATE TABLE `grade10sci` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `medium` varchar(30) NOT NULL,
  `video1` text NOT NULL,
  `week1` text NOT NULL,
  `video2` text NOT NULL,
  `week2` text NOT NULL,
  `video3` text NOT NULL,
  `week3` text NOT NULL,
  `video4` text NOT NULL,
  `week4` text NOT NULL,
  `video5` text NOT NULL,
  `week5` text NOT NULL,
  `submit` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `grade10sci`
--

INSERT INTO `grade10sci` (`id`, `date`, `medium`, `video1`, `week1`, `video2`, `week2`, `video3`, `week3`, `video4`, `week4`, `video5`, `week5`, `submit`) VALUES
(4, '2021-10-12', 'Sinhala', 'https://youtu.be/--PikweL_PU?list=PLHjwuoik-ep1Vb4RPXNUbAVHxB1rJRC8W', 'https://drive.google.com/file/d/1nbGD97wxjjFvkBWKo0j5H2fL-MmtHqc4/view?usp=sharing', 'https://youtu.be/aCjbDGkryec?list=PLHjwuoik-ep1Vb4RPXNUbAVHxB1rJRC8W', 'https://drive.google.com/file/d/1nbGD97wxjjFvkBWKo0j5H2fL-MmtHqc4/view?usp=sharing', 'https://youtu.be/MNS9X1fsngM?list=PLHjwuoik-ep1Vb4RPXNUbAVHxB1rJRC8W', 'https://drive.google.com/file/d/1nbGD97wxjjFvkBWKo0j5H2fL-MmtHqc4/view?usp=sharing', 'https://youtu.be/--PikweL_PU?list=PLHjwuoik-ep1Vb4RPXNUbAVHxB1rJRC8W', 'https://drive.google.com/file/d/1nbGD97wxjjFvkBWKo0j5H2fL-MmtHqc4/view?usp=sharing', 'https://youtu.be/--PikweL_PU?list=PLHjwuoik-ep1Vb4RPXNUbAVHxB1rJRC8W', 'https://drive.google.com/file/d/1nbGD97wxjjFvkBWKo0j5H2fL-MmtHqc4/view?usp=sharing', ''),
(6, '2021-09-13', 'Sinhala', 'https://youtu.be/--PikweL_PU?list=PLHjwuoik-ep1Vb4RPXNUbAVHxB1rJRC8W', 'https://drive.google.com/file/d/1nbGD97wxjjFvkBWKo0j5H2fL-MmtHqc4/view?usp=sharing', 'https://youtu.be/aCjbDGkryec?list=PLHjwuoik-ep1Vb4RPXNUbAVHxB1rJRC8W', 'https://drive.google.com/file/d/1nbGD97wxjjFvkBWKo0j5H2fL-MmtHqc4/view?usp=sharing', 'https://youtu.be/MNS9X1fsngM?list=PLHjwuoik-ep1Vb4RPXNUbAVHxB1rJRC8W', 'https://drive.google.com/file/d/1nbGD97wxjjFvkBWKo0j5H2fL-MmtHqc4/view?usp=sharing', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `grade11math`
--

CREATE TABLE `grade11math` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `medium` varchar(30) NOT NULL,
  `video1` text NOT NULL,
  `week1` text NOT NULL,
  `video2` text NOT NULL,
  `week2` text NOT NULL,
  `video3` text NOT NULL,
  `week3` text NOT NULL,
  `video4` text NOT NULL,
  `week4` text NOT NULL,
  `video5` text NOT NULL,
  `week5` text NOT NULL,
  `submit` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `grade11math`
--

INSERT INTO `grade11math` (`id`, `date`, `medium`, `video1`, `week1`, `video2`, `week2`, `video3`, `week3`, `video4`, `week4`, `video5`, `week5`, `submit`) VALUES
(2, '2021-10-12', 'English', 'https://drive.google.com/file/d/1nbGD97wxjjFvkBWKo0j5H2fL-MmtHqc4/view?usp=sharing', 'https://drive.google.com/file/d/1nbGD97wxjjFvkBWKo0j5H2fL-MmtHqc4/view?usp=sharing', 'dsdsd', 'dsd', '', '', '', '', '', '', ''),
(3, '2021-10-17', 'English', 'https://youtu.be/--PikweL_PU?list=PLHjwuoik-ep1Vb4RPXNUbAVHxB1rJRC8W', 'https://drive.google.com/file/d/1nbGD97wxjjFvkBWKo0j5H2fL-MmtHqc4/view?usp=sharing', 'https://youtu.be/aCjbDGkryec?list=PLHjwuoik-ep1Vb4RPXNUbAVHxB1rJRC8W', 'https://drive.google.com/file/d/1nbGD97wxjjFvkBWKo0j5H2fL-MmtHqc4/view?usp=sharing', '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `grade11sci`
--

CREATE TABLE `grade11sci` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `medium` varchar(30) NOT NULL,
  `video1` text NOT NULL,
  `week1` text NOT NULL,
  `video2` text NOT NULL,
  `week2` text NOT NULL,
  `video3` text NOT NULL,
  `week3` text NOT NULL,
  `video4` text NOT NULL,
  `week4` text NOT NULL,
  `video5` text NOT NULL,
  `week5` text NOT NULL,
  `submit` text NOT NULL
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
  `password` varchar(30) DEFAULT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'deactivate'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`std_id`, `fname`, `lname`, `phone`, `email`, `school`, `grade`, `medium`, `image`, `username`, `password`, `status`) VALUES
(33, 'lasith', 'malinga', '0765112582', 'mailinga@net.com', 'rathagama', 'Grade 10', 'English', NULL, 'malinga', '123', 'activate'),
(41, 'tharindu', 'priyashan', '+94766354069', 'tharindupriyashan18@gmail.com', 'gamini', 'Grade 11', 'Sinhala', NULL, 'tps', '456', 'deactivate'),
(42, 'chamika', 'karnarathna', '+94766354069', 'chamika18@gmail.com', 'gamini', 'Grade 10', 'Sinhala', NULL, 'chami', '123', 'activate'),
(46, 'Kamindu', 'sad', '3232323', 'dinu@net.com', 'gamini', 'After O/L', 'Sinhala', NULL, NULL, NULL, 'deactivate'),
(47, 'Gimhana', 'Deshan', '3232323', 'gimhana@gmail.com', 'gamini', 'Grade 10', 'English', NULL, NULL, NULL, 'deactivate'),
(48, 'admin', 'admin', '0765112582', 'admin@net.com', 'dsdsad', 'Grade 11', 'English', NULL, NULL, NULL, 'deactivate'),
(49, 'admin', 'admin', '0765112582', 'admin@net.com', 'dsdsad', 'After O/L', 'Sinhala', NULL, NULL, NULL, 'deactivate'),
(50, 'admin', 'admin', '0765112582', 'admin@net.com', 'dsadad', 'Grade 11', 'English', NULL, NULL, NULL, 'deactivate'),
(51, 'Gimhana', 'Deshan', '3232323', 'gimhana@gmail.com', 'fdfadsf', 'Grade 11', 'Sinhala', NULL, NULL, NULL, 'deactivate'),
(52, 'Sahan', 'promod', '0765112582', 'kari@net.com', 'kari', 'After O/L', 'Sinhala', NULL, 'kari', '123', 'activate');

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
-- Indexes for table `afterolcmath`
--
ALTER TABLE `afterolcmath`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `afterolphy`
--
ALTER TABLE `afterolphy`
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
-- Indexes for table `class_works`
--
ALTER TABLE `class_works`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_category`
--
ALTER TABLE `course_category`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `grade10math`
--
ALTER TABLE `grade10math`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grade10sci`
--
ALTER TABLE `grade10sci`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grade11math`
--
ALTER TABLE `grade11math`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grade11sci`
--
ALTER TABLE `grade11sci`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `afterolcmath`
--
ALTER TABLE `afterolcmath`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `afterolphy`
--
ALTER TABLE `afterolphy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `class_category`
--
ALTER TABLE `class_category`
  MODIFY `class_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `class_library`
--
ALTER TABLE `class_library`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `class_link`
--
ALTER TABLE `class_link`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `class_works`
--
ALTER TABLE `class_works`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `course_category`
--
ALTER TABLE `course_category`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `grade10math`
--
ALTER TABLE `grade10math`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `grade10sci`
--
ALTER TABLE `grade10sci`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `grade11math`
--
ALTER TABLE `grade11math`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `grade11sci`
--
ALTER TABLE `grade11sci`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `std_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `student_login`
--
ALTER TABLE `student_login`
  MODIFY `std_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
