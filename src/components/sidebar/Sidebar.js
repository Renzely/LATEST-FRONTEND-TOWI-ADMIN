import { Link, NavLink } from "react-router-dom";
import "./sidebar.css";
import { Inventory, AssignmentInd, ManageAccounts } from "@mui/icons-material";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import { styled } from "styled-components";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/view-accounts" style={{ textDecoration: "none" }}>
              <li className="sidebarListItem">
                <ManageAccounts className="sidebarIcon" />
                Accounts
              </li>
            </Link>
            {/* <Link to="/" style={{ textDecoration: 'none' }}>
                        <li className="sidebarListItem">
                            <AssignmentInd className="sidebarIcon"/>
                            Attendance
                        </li>
                     </Link> */}
            <Link to="/parcel" style={{ textDecoration: "none" }}>
              <li className="sidebarListItem">
                <Inventory className="sidebarIcon" />
                Inventory
              </li>
            </Link>
            <Link to="/view-RTV" style={{ textDecoration: "none" }}>
              <li className="sidebarListItem">
                <AssignmentReturnIcon className="sidebarIcon" />
                RTV
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
