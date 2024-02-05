-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 05, 2024 at 09:25 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pmapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `diseases`
--

CREATE TABLE `diseases` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `diseases`
--

INSERT INTO `diseases` (`id`, `name`) VALUES
(1, 'Influenza'),
(2, 'Diabetes mellitus'),
(3, 'Hypertension'),
(4, 'Asthma'),
(5, 'Migraine'),
(6, 'Arthritis'),
(7, 'Alzheimer\'s disease'),
(8, 'Tuberculosis'),
(9, 'Parkinson\'s disease'),
(10, 'Osteoporosis');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `name`) VALUES
(1, 'Dr. Emily Johnson'),
(2, 'Dr. Michael Patel'),
(3, 'Dr. Sarah Chang'),
(4, 'Dr. David Rodriguez'),
(5, 'Dr. Jennifer Lee'),
(6, 'Dr. Christopher Nguyen'),
(7, 'Dr. Samantha Smith'),
(8, 'Dr. Matthew Taylor'),
(9, 'Dr. Elizabeth Wong'),
(10, 'Dr. Jonathan Carter');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `patient_name` varchar(255) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `disease` int(11) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `status` enum('Active','Inactive','On Hold','Discharged') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `patient_name`, `age`, `gender`, `disease`, `phone_number`, `address`, `status`, `created_at`) VALUES
(1, 'John Doe', 35, 'Male', 6, '1234567890', '123 Main Street', 'Active', '2024-02-02 12:48:55'),
(2, 'Jane Smith', 28, 'Female', 5, '0987654321', '456 Elm St', 'Active', '2024-02-02 12:48:55'),
(3, 'Alice Johnson', 40, 'Female', 3, '5551234567', '789 Oak St', 'Active', '2024-02-02 12:48:55'),
(4, 'Bob Brown', 50, 'Male', 7, '7779876543', '321 Pine St', 'Discharged', '2024-02-02 12:48:55'),
(5, 'Emily Davis', 45, 'Female', 8, '9998887776', '654 Maple St', 'Active', '2024-02-02 12:48:55'),
(6, 'Michael Wilson', 60, 'Male', 9, '3332221111', '987 Cedar St', 'Active', '2024-02-02 12:48:55'),
(7, 'Sarah Garcia', 32, 'Female', 9, '4445556666', '753 Birch St', 'Discharged', '2024-02-02 12:48:55'),
(8, 'David Martinez', 55, 'Male', 5, '6667778888', '852 Walnut St', 'Active', '2024-02-02 12:48:55'),
(9, 'Jennifer Rodriguez', 38, 'Female', 10, '1112223333', '159 Pineapple St', 'Active', '2024-02-02 12:48:55'),
(10, 'James Lee', 42, 'Male', 9, '4445556666', '357 Orange St', 'Active', '2024-02-02 12:48:55'),
(11, 'Holmes Palmer', 95, 'Female', 3, '+1 (804) 851-92', 'Dicta rerum ea esse', 'Active', '2024-02-04 18:18:48'),
(12, 'Holmes Palmer', 95, 'Female', 4, '+1 (804) 851-92', 'Dicta rerum ea esse', 'Discharged', '2024-02-04 18:24:59'),
(13, 'Casey Dixon', 33, 'Male', 6, '+1 (869) 284-15', 'Optio dolor sed cum', 'Inactive', '2024-02-04 18:25:39'),
(18, 'Deirdre Bell', 55, 'Other', 7, '+1 (797) 476-60', 'Dolore et eveniet d', 'Active', '2024-02-05 20:01:00'),
(19, 'Callum Odom', 78, 'Female', 2, '+1 (254) 612-84', 'Aliquid unde quo ull', 'Inactive', '2024-02-05 20:08:23'),
(20, 'Martena Huber', 71, 'Other', 8, '+1 (796) 354-29', 'Velit provident it', 'Discharged', '2024-02-05 20:14:42');

-- --------------------------------------------------------

--
-- Table structure for table `visits`
--

CREATE TABLE `visits` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) DEFAULT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `disease_id` int(11) NOT NULL,
  `visit_time` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `visits`
--

INSERT INTO `visits` (`id`, `patient_id`, `doctor_id`, `disease_id`, `visit_time`, `created_at`) VALUES
(1, 1, 4, 6, '2024-02-19 00:00:00', '2024-02-05 18:59:57'),
(2, 1, 7, 5, '2024-02-14 00:00:00', '2024-02-05 19:17:20'),
(3, 1, 5, 5, '2024-02-14 00:00:00', '2024-02-05 19:17:55'),
(10, 1, 2, 8, '2024-02-28 00:00:00', '2024-02-05 19:42:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `diseases`
--
ALTER TABLE `diseases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `visits`
--
ALTER TABLE `visits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `diseases`
--
ALTER TABLE `diseases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `visits`
--
ALTER TABLE `visits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `visits`
--
ALTER TABLE `visits`
  ADD CONSTRAINT `visits_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
