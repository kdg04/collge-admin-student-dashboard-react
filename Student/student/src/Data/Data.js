// Sidebar imports
import {
  UilEstate,
  UilUserCircle,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
//import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";

// Sidebar Data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
  },
  {
    icon: UilUserCircle,
    heading: "Profile",
  },
  {
    icon: UilClipboardAlt,
    heading: "ScholarShip-Section",
  },
  {
    icon: UilUsersAlt,
    heading: "Upload-File",
  },
  {
    icon: UilPackage,
    heading: 'Read-Files'
  },
  {
    icon: UilChart,
    heading: 'Attendance'
  },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Account-section-Info",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "",
    png: UilUsdSquare,
    series: [
      {
        name: "Account-section",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "ScholarShip-Section",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "ScholarShip-Section",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Monthly Attendance",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "%",
    png: UilClipboardAlt,
    series: [
      {
        name: "Monthly Attendance",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Runank Pradip Patil",
    noti: "Placed at 'InfoCepts', Nagpur",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "Prof.Prachi Bhure",
    noti: "Congrats to all who've secured placements! Keep pushing, work hard, and believe in yourself. Success is on the way!🌟",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Dattashri Jaideo Balbude",
    noti: "I've been selected in the campus placement drive at L&T!",
    time: "2 hours ago",
  },
];