import { Link, NavLink } from "react-router-dom";
import "./sidebar.css";
import { Inventory, AssignmentInd, ManageAccounts } from "@mui/icons-material";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import { styled } from "styled-components";
import { useLocation } from 'react-router-dom';
import * as React from 'react';

export default function Sidebar() {

  const location = useLocation();

  const[activeItem, setActiveItem] = React.useState(location.pathname);
 
  const handleItemClick = (itemName) =>  {
      setActiveItem(itemName);
      console.log(activeItem);
 
  }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <NavLink to="/view-accounts" style={{ textDecoration: "none" }} onClick={() => handleItemClick("/view-accounts")}>
              <li className={`sidebarListItem ${
                      activeItem === "/view-accounts" ? "active" : ""
                      }`}>
                <ManageAccounts className="sidebarIcon" />
                Accounts
              </li>
            </NavLink>
            <NavLink to="/view-admin-accounts" style={{ textDecoration: 'none' }} onClick={() => handleItemClick("/view-admin-accounts")}>
                     <li
                      className={`sidebarListItem ${
                      activeItem === "/view-admin-accounts" ? "active" : ""
                      }`}
                     >
                            <ManageAccounts className="sidebarIcon"/>
                            Admin Account
                        </li>
                    </NavLink>    
   
            <NavLink to="/parcel" style={{ textDecoration: "none" }} onClick={() => handleItemClick("/parcel")}>
              <li  className={`sidebarListItem ${
                      activeItem === "/parcel" ? "active" : ""
                      }`}>
                <Inventory className="sidebarIcon" />
                Inventory
              </li>
            </NavLink>
            <NavLink to="/view-RTV" style={{ textDecoration: "none" }} onClick={() => handleItemClick("/view-RTV")}>
              <li className={`sidebarListItem ${
                      activeItem === "/view-RTV" ? "active" : ""
                      }`}>
                <AssignmentReturnIcon className="sidebarIcon" />
                RTV
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}
