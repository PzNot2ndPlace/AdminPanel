import { useEffect, useState } from "react";
import { Tooltip, IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import ChevronLeft from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRight from "@mui/icons-material/KeyboardArrowRight";
import MenuIcon from "@mui/icons-material/Menu";

import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import GroupIcon from "@mui/icons-material/Group";

import styles from "./Slidebar.module.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: "Общая статистика",
      icon: <LeaderboardIcon />,
      path: "/statistics",
    },
    {
      label: "Состояние сервисов",
      icon: <LocalHospitalIcon />,
      path: "/servicesHealth",
    },
    { label: "Аналитика", icon: <AnalyticsIcon />, path: "/analytics" },
    { label: "Пользователи", icon: <GroupIcon />, path: "/users" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {isMobile && (
        <IconButton
          className={`${styles.mobileMenuButton} ${
            isOpen ? styles.hiddenBehindSidebar : ""
          }`}
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>
      )}

      <div
        className={`${styles.sidebar} ${
          isOpen ? (isMobile ? styles.openMobile : "") : styles.closed
        }`}
      >
        <div className={styles.menu}>
          <div className={styles.topSection}></div>

          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={item.path}
                className={`${styles.menuItem} ${
                  isActive ? styles.active : ""
                }`}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setIsOpen(false);
                }}
              >
                <Tooltip
                  title={!isOpen && !isMobile ? item.label : ""}
                  placement="right"
                >
                  <div className={styles.iconWrapper}>{item.icon}</div>
                </Tooltip>
                <span className={styles.label}>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {!isMobile && (
        <div
          className={`${styles.toggleButtonWrapper} ${
            !isOpen ? styles.closedButtonWrapper : ""
          }`}
        >
          <IconButton onClick={toggleSidebar} className={styles.toggleButton}>
            {isOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>
      )}

      {isOpen && isMobile && (
        <div className={styles.overlay} onClick={toggleSidebar} />
      )}
    </>
  );
};

export default Sidebar;
