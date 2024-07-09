import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";
import "./defaultApp.css";
import Attendance from "./components/pages/attendance/Attendance";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import Parcel from "./components/pages/parcel/Parcel";
import ViewAttendance from "./components/pages/attendance/ViewAttendance";
import Account from "./components/pages/account/Account";
import ViewParcel from "./components/pages/parcel/ViewParcel";
import RTV from "./components/pages/ReturnToVendor/RTV";
import Login from "./components/Admin/login";
import Admin from "./components/pages/AdminAccount/Admin";
import ForgotPassword from "./components/Admin/forgotpassword";

function App() {
  return (
    <div>
     

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/view-admin-accounts" element={<Admin />} /> 
          <Route path="/parcel" element={<Parcel />} />
          <Route path="/view-parcel" element={<ViewParcel />} />
          <Route path="/view-attendance" element={<ViewAttendance />} />
          <Route path="/view-accounts" element={<Account />} />
          <Route path="/view-RTV" element={<RTV />} />
        </Routes>
      </div>
  );
}

export default App;
