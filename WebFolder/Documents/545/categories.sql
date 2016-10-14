-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: hh2.jobshout.co.uk
-- Generation Time: Oct 30, 2013 at 06:15 AM
-- Server version: 5.0.95
-- PHP Version: 5.3.9

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `jobshout_dev`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `ID` int(11) NOT NULL auto_increment,
  `Created` int(11) NOT NULL default '0',
  `Modified` int(11) NOT NULL default '0',
  `SiteID` int(11) NOT NULL default '0',
  `CategoryGroupID` int(11) NOT NULL default '0',
  `Code` varchar(80) NOT NULL default '',
  `Name` varchar(80) NOT NULL default '',
  `Active` int(11) NOT NULL default '0',
  `UserID` int(11) NOT NULL default '0',
  `Type` varchar(80) NOT NULL default '',
  `Hide` int(11) NOT NULL default '0',
  `TopLevelID` int(11) NOT NULL default '0',
  `GUID` varchar(36) NOT NULL default '',
  `Server_Number` int(11) NOT NULL default '0',
  `Site_GUID` varchar(36) NOT NULL default '',
  `CategoryGroup_GUID` varchar(36) NOT NULL default '',
  `User_GUID` varchar(36) NOT NULL default '',
  `Picture_GUID` varchar(36) NOT NULL default '',
  `TopLevel_GUID` varchar(36) NOT NULL default '',
  `MetaDescription` text,
  `MetaKeywords` varchar(255) NOT NULL default '',
  `FTS` text,
  `Order_By_Num` smallint(6) NOT NULL default '0',
  `Sync_Modified` int(11) NOT NULL default '0',
  `Auto_Format` tinyint(4) NOT NULL default '1',
  `access_level_num` tinyint(4) default NULL,
  KEY `Categories_ID` (`ID`),
  KEY `Categories_Created` (`Created`),
  KEY `Categories_Modified` (`Modified`),
  KEY `Categories_SiteID` (`SiteID`),
  KEY `Categories_CategoryGroupID` (`CategoryGroupID`),
  KEY `Categories_Code` (`Code`),
  KEY `Categories_Name` (`Name`),
  KEY `Categories_Active` (`Active`),
  KEY `Categories_UserID` (`UserID`),
  KEY `Categories_Type` (`Type`),
  KEY `Categories_Hide` (`Hide`),
  KEY `Categories_TopLevelID` (`TopLevelID`),
  KEY `Categories_GUID` (`GUID`),
  KEY `Categories_Server_Number` (`Server_Number`),
  KEY `Categories_Site_GUID` (`Site_GUID`),
  KEY `Categories_CategoryGroup_GUID` (`CategoryGroup_GUID`),
  KEY `Categories_User_GUID` (`User_GUID`),
  KEY `Categories_Picture_GUID` (`Picture_GUID`),
  KEY `Categories_TopLevel_GUID` (`TopLevel_GUID`),
  KEY `Categories_MetaKeywords` (`MetaKeywords`),
  KEY `Categories_Order_By_Num` (`Order_By_Num`),
  KEY `Categories_Sync_Modified` (`Sync_Modified`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5640 ;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`ID`, `Created`, `Modified`, `SiteID`, `CategoryGroupID`, `Code`, `Name`, `Active`, `UserID`, `Type`, `Hide`, `TopLevelID`, `GUID`, `Server_Number`, `Site_GUID`, `CategoryGroup_GUID`, `User_GUID`, `Picture_GUID`, `TopLevel_GUID`, `MetaDescription`, `MetaKeywords`, `FTS`, `Order_By_Num`, `Sync_Modified`, `Auto_Format`, `access_level_num`) VALUES
(5629, 1383110831, 1383110831, 360, 234357042, 'client-list.html', 'Client List', 1, 284360, 'page', 0, 4683, '9CAAC1AD-F44D-E7EB-0978-40C273F92546', 0, '', '', '', '', '', '', '', 'Client List SiteNav page Jobshout Support Active 30423016-BAFA-4BA5-9EE2-B3A2DEC391C7', 1, 1383091200, 0, NULL),
(5630, 1383110948, 1383110948, 360, 234357042, 'testimonials.html', 'Testimonials', 1, 284360, 'page', 0, 4683, '83F6E06A-C4A6-A998-AA95-1111343F3FD6', 0, '', '', '', '', '', '', '', 'Testimonials SiteNav page Jobshout Support Active 30423016-BAFA-4BA5-9EE2-B3A2DEC391C7', 2, 1383091200, 0, NULL),
(5631, 1383111070, 1383111070, 360, 234357042, 'work-examples.html', 'Work Examples', 1, 284360, 'page', 0, 4683, 'F726558F-83B8-B0AD-14F6-C37F835B7AD3', 0, '', '', '', '', '', '', '', 'Work Examples SiteNav page Jobshout Support Active 30423016-BAFA-4BA5-9EE2-B3A2DEC391C7', 3, 1383091200, 0, NULL),
(5632, 1383111244, 1383111244, 360, 234357042, '/terms-and-conditions.html', 'Terms and Conditions', 1, 284360, 'page', 0, 4683, '405E0E94-2A51-0B91-DF44-2222EF42BE17', 0, '', '', '', '', '', '', '', 'Terms and Conditions SiteNav page Jobshout Support Active 30423016-BAFA-4BA5-9EE2-B3A2DEC391C7', 4, 1383091200, 0, NULL),
(5633, 1383111372, 1383111372, 360, 234357042, 'why-a4plus.html', 'Why use A4Plus', 1, 284360, 'page', 0, 4683, '5F569D0B-6BE3-E143-A1F8-3C46E61CAF41', 0, '', '', '', '', '', '', '', 'Why use A4Plus SiteNav page Jobshout Support Active 30423016-BAFA-4BA5-9EE2-B3A2DEC391C7', 5, 1383091200, 0, NULL),
(5634, 1383111554, 1383111554, 360, 234357042, 'a4-plus-cad-service-packages.html', 'Priority Service Pakages', 1, 284360, 'page', 0, 0, '1D306C7E-3A4C-2B00-0BC0-99B5CA0015F9', 0, '', '', '', '', '', '', '', 'Priority Service Pakages SiteNav page Jobshout Support Active 30423016-BAFA-4BA5-9EE2-B3A2DEC391C7', 0, 1383091200, 0, NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

