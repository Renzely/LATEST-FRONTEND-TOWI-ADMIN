import { Link, NavLink } from "react-router-dom";
import "./sidebar.css";
import { Inventory, AssignmentInd, ManageAccounts } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import StoreIcon from '@mui/icons-material/Store';
import { useLocation } from "react-router-dom";
import * as React from "react";

export default function Sidebar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = React.useState(location.pathname);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    console.log(activeItem);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const roleAccount = localStorage.getItem("roleAccount"); // Get roleAccount from localStorage

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <NavLink
              to="/view-accounts"
              style={{ textDecoration: "none" }}
              onClick={() => handleItemClick("/view-accounts")}
            >
              <li
                className={`sidebarListItem ${
                  activeItem === "/view-accounts" ? "active" : ""
                }`}
              >
                <ManageAccounts className="sidebarIcon" />
                Accounts
              </li>
            </NavLink>
            {roleAccount === "ACCOUNT SUPERVISOR" && (
              <NavLink
                to="/view-admin-accounts"
                style={{ textDecoration: "none" }}
                onClick={() => handleItemClick("/view-admin-accounts")}
              >
                <li
                  className={`sidebarListItem ${
                    activeItem === "/view-admin-accounts" ? "active" : ""
                  }`}
                >
                  <SupervisorAccountIcon className="sidebarIcon" />
                  Admin Account
                </li>
              </NavLink>
            )}

            <NavLink
              to="/attendance"
              style={{ textDecoration: "none" }}
              onClick={() => handleItemClick("/attendance")}
            >
              <li
                className={`sidebarListItem ${
                  activeItem === "/attendance" ? "active" : ""
                }`}
              >
                <AssignmentInd className="sidebarIcon" />
                Attendance
              </li>
            </NavLink>

            <NavLink
              to="/inventory"
              style={{ textDecoration: "none" }}
              onClick={() => handleItemClick("/inventory")}
            >
              <li
                className={`sidebarListItem ${
                  activeItem === "/inventory" ? "active" : ""
                }`}
              >
                <Inventory className="sidebarIcon" />
                Inventory
              </li>
            </NavLink>
            <NavLink
              to="/view-outlet"
              style={{ textDecoration: "none" }}
              onClick={() => handleItemClick("/view-outlet")}
            >
              {/* <li
                className={`sidebarListItem ${
                  activeItem === "/view-outlet" ? "active" : ""
                }`}
              >
                <StoreIcon className="sidebarIcon" />
                Branches
              </li> */}

              {/* FOR BRANCHES SIDEBAR */}

            </NavLink>
            <NavLink
              to="/view-RTV"
              style={{ textDecoration: "none" }}
              onClick={() => handleItemClick("/view-RTV")}
            >
              <li
                className={`sidebarListItem ${
                  activeItem === "/view-RTV" ? "active" : ""
                }`}
              >
                <AssignmentReturnIcon className="sidebarIcon" />
                RTV
              </li>
            </NavLink>
            <li className="sidebarListItem" onClick={() => handleLogout()}>
              <LogoutIcon className="sidebarIcon" />
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
