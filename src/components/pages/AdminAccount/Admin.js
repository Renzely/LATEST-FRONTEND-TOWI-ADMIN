import "./admin.css";
import * as React from "react";
import { useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbar,
} from "@mui/x-data-grid";
import { Checkbox, Autocomplete } from "@mui/material";
import axios, { isAxiosError } from "axios";
import { Button, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDemoData } from "@mui/x-data-grid-generator";
import TextField from "@mui/material/TextField";
import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import { Warehouse, Visibility } from "@mui/icons-material";
import Swal from "sweetalert2";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { type } from "@testing-library/user-event/dist/type";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Otpstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function Admin() {
  const { data, loading } = useDemoData({
    dataSet: "Commodity",
    rowLength: 4,
    maxColumns: 6,
  });

  const [userData, setUserData] = React.useState([]);
  const [merchandiserData, setMerchandiserData] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openStatusDialog, setOpenStatusDialog] = React.useState(false);
  const [openViewModal, setOpenViewModal] = React.useState(false);

  const [updateStatus, setUpdateStatus] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");

  const requestBody = { isActivate: updateStatus, emailAddress: userEmail };

  const [showPassword, setShowPassword] = React.useState(false);

  const [otpCode, setOtpCode] = React.useState();
  const [inputOtpCode, setInputOtpCode] = React.useState();
  const [inputOtpCodeError, setInputOtpCodeError] = React.useState();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [adminSelectedRole, setSelectedRole] = React.useState("");
  const [adminSelectedMerchandiser, setAdminSelectedMerchandiser] = useState(
    []
  );
  const [adminSelectedBranch, setSelectedBranch] = useState([]);
  const [adminFirstName, setAdminFirstName] = React.useState("");
  const [adminMiddleName, setAdminMiddleName] = React.useState("");
  const [adminLastName, setAdminLastName] = React.useState("");
  const [adminEmail, setAdminEmail] = React.useState("");
  const [adminAddress, setAdminAddress] = React.useState("");
  const [adminPhone, setAdminPhone] = React.useState("");
  const [adminPassword, setAdminPassword] = React.useState("");
  const [adminConfirmPassword, setAdminConfirmPassword] = React.useState("");

  const [adminRoleError, setAdminRoleError] = React.useState("");
  const [adminBranchError, setAdminBranchError] = React.useState("");
  const [adminFirstNameError, setAdminFirstNameError] = React.useState("");
  const [adminMiddleNameError, setAdminMiddleNameError] = React.useState("");
  const [adminLastNameError, setAdminLastNameError] = React.useState("");
  const [adminEmailError, setAdminEmailError] = React.useState("");
  const [adminAddressError, setAdminAddressError] = React.useState("");
  const [adminPhoneError, setAdminPhoneError] = React.useState("");
  const [adminPasswordError, setAdminPasswordError] = React.useState("");
  const [adminConfirmPasswordError, setAdminConfirmPasswordError] =
    React.useState("");

  const [adminViewBranch, setAdminViewBranch] = React.useState("");
  const [adminViewFullName, setAdminViewFullName] = React.useState("");
  const [adminViewEmail, setAdminViewEmail] = React.useState("");
  const [adminViewAddress, setAdminViewAddress] = React.useState("");
  const [adminViewPhone, setAdminViewPhone] = React.useState("");
  const [adminViewJDate, setAdminViewJDate] = React.useState("");

  const merchandiser = [];

  const branches = [
    "PUREGOLD PRICE CLUB - LA TRINIDAD BENGUET",
    "PUREGOLD PRICE CLUB - BAGUIO",
    "PUREGOLD PRICE CLUB - LAOAG",
    "PUREGOLD PRICE CLUB (JR.)- OLD CENTRO",
    "PUREGOLD PRICE CLUB - CONCEPCION TARLAC",
    "PUREGOLD PRICE CLUB - CABANATUAN",
    "PUREGOLD PRICE CLUB - ZARAGOZA",
    "PUREGOLD PRICE CLUB - GAPAN",
    "PUREGOLD PRICE CLUB - CAPAS",
    "PUREGOLD PRICE CLUB - CAUAYAN ISABELA",
    "PUREGOLD PRICE CLUB (JR.)- PALM PLAZA",
    "PUREGOLD PRICE CLUB - PANIQUI",
    "PUREGOLD PRICE CLUB - PUBLIC MARKET",
    "PUREGOLD PRICE CLUB - ROXAS ISABELA",
    "PUREGOLD PRICE CLUB - BALER (N.E)",
    "PUREGOLD PRICE CLUB - MARIA AURORA",
    "PUREGOLD PRICE CLUB - TUMAUINI",
    "PUREGOLD PRICE CLUB (EXTRA.)- TUGUEGARAO",
    "PUREGOLD PRICE CLUB - CENTRO SANTIAGO",
    "PUREGOLD PRICE CLUB - VICTORY NORTE SANTIAGO (N.E)",
    "PUREGOLD PRICE CLUB - VIGAN",
    "PUREGOLD PRICE CLUB - BURNHAM PARK",
    "PUREGOLD PRICE CLUB (JR.)- BAKAKENG",
    "PUREGOLD PRICE CLUB - LA UNION",
    "PUREGOLD PRICE CLUB - BACNOTAN",
    "PUREGOLD PRICE CLUB - CALASIAO",
    "PUREGOLD PRICE CLUB - MANAOAG",
    "PUREGOLD PRICE CLUB - SAN FABIAN",
    "PUREGOLD PRICE CLUB (JR.)- BONUAN",
    "PUREGOLD PRICE CLUB - MAYOMBO",
    "PUREGOLD PRICE CLUB (JR.)- BAYAMBANG",
    "PUREGOLD PRICE CLUB - VILLASIS",
    "PUREGOLD PRICE CLUB - TALAVERA",
    "PUREGOLD PRICE CLUB - SAN JOSE NUEVA ECIJA (N.E)",
    "PUREGOLD PRICE CLUB - ZULUETA (N.E)",
    "PUREGOLD PRICE CLUB - CABANATUAN PALENGKE (N.E)",
    "PUREGOLD PRICE CLUB - PACIFIC MALL (N.E)",
    "PUREGOLD PRICE CLUB - CIRCUMFERENCIAL (N.E)",
    "PUREGOLD PRICE CLUB - CROSSING (N.E)",
    "PUREGOLD PRICE CLUB - GUIMBA",
    "PUREGOLD PRICE CLUB - ILAGAN",
    "PUREGOLD PRICE CLUB - ALIBAGU",
    "PUREGOLD PRICE CLUB - APPARI",
    "PUREGOLD PRICE CLUB - LAL-LO",
    "PUREGOLD PRICE CLUB - TUAO",
    "PUREGOLD PRICE CLUB - SOLANA",
    "PUREGOLD PRICE CLUB - DAU",
    "PUREGOLD PRICE CLUB - DAU ACCESS ROAD",
    "PUREGOLD PRICE CLUB (JR.)- DON JUICO",
    "PUREGOLD PRICE CLUB - MABALACAT",
    "PUREGOLD PRICE CLUB - MAWAQUE",
    "PUREGOLD PRICE CLUB - ANGELES",
    "PUREGOLD PRICE CLUB (JR.)-BALIBAGO",
    "PUREGOLD PRICE CLUB - CENTRAL TOWN",
    "PUREGOLD PRICE CLUB - PANDAN",
    "PUREGOLD PRICE CLUB - SUBIC",
    "PUREGOLD PRICE CLUB - OLONGAPO",
    "PUREGOLD PRICE CLUB - CASTILLEJOS",
    "PUREGOLD PRICE CLUB -DUTY FREE",
    "PUREGOLD PRICE CLUB - FERTUNA",
    "PUREGOLD PRICE CLUB - MAGALANG PAMPANGA",
    "PUREGOLD PRICE CLUB - ANGELES - MAGALANG ROAD EPZA",
    "PUREGOLD PRICE CLUB - ARAYAT PAMPANGA",
    "PUREGOLD PRICE CLUB - MEXICO",
    "PUREGOLD PRICE CLUB -CANDABA",
    "PUREGOLD PRICE CLUB - DINALUPIHAN",
    "PUREGOLD PRICE CLUB (JR.)- ORANI",
    "PUREGOLD PRICE CLUB (JR.)- LUBAO",
    "PUREGOLD PRICE CLUB (JR.)- GUAGUA",
    "PUREGOLD PRICE CLUB (EXTRA.)- FLORIDA BLANCA",
    "PUREGOLD PRICE CLUB (JR.)- PORAC",
    "PUREGOLD PRICE CLUB - MASANTOL",
    "PUREGOLD PRICE CLUB (EXTRA.)- MACABEBE",
    "PUREGOLD PRICE CLUB (JR.)- STO.TOMAS",
    "PUREGOLD PRICE CLUB - SAN SIMON",
    "PUREGOLD PRICE CLUB - MARIVELES",
    "PUREGOLD PRICE CLUB - LIMAY",
    "PUREGOLD PRICE CLUB - BALANGA",
    "PUREGOLD PRICE CLUB (JR.)- ABUCAY",
    "PUREGOLD PRICE CLUB - IBA ZAMBALES",
    "ROYAL DUTY FREE 1",
    "ROYAL DUTY FREE 2",
    "PUREGOLD PRICE CLUB (JR.)- SF 2 CAFÉ FERNANDINO",
    "PUREGOLD PRICE CLUB - BULAON",
    "PUREGOLD PRICE CLUB (JR.)- SF 1 DOLORES",
    "PUREGOLD PRICE CLUB (EXTRA.)- APALIT",
    "PUREGOLD PRICE CLUB - TUNGKONG MANGGA",
    "PUREGOLD PRICE CLUB (JR.)- SAPANG PALAY, SAMPOL",
    "PUREGOLD PRICE CLUB - SAN JOSE DEL MONTE PALMERA",
    "PUREGOLD PRICE CLUB - MEYCAUAYAN BANGA",
    "PUREGOLD PRICE CLUB - MALANDAY",
    "PUREGOLD PRICE CLUB - OBANDO",
    "PUREGOLD PRICE CLUB - BALIWAG",
    "PUREGOLD PRICE CLUB - TANGOS BALIWAG",
    "PUREGOLD PRICE CLUB - DRT HI-WAY (N.E)",
    "PUREGOLD PRICE CLUB - HAGONOY BULACAN",
    "PUREGOLD PRICE CLUB - PAOMBONG",
    "PUREGOLD PRICE CLUB - TABANG GUIGUINTO",
    "PUREGOLD PRICE CLUB - MALOLOS",
    "PUREGOLD PRICE CLUB - SAN MIGUEL BULACAN",
    "PUREGOLD PRICE CLUB - SAN ILDEFONSO",
    "PUREGOLD PRICE CLUB - VALENZUELA-1",
    "PUREGOLD PRICE CLUB - ALIW",
    "PUREGOLD PRICE CLUB - MARILAO PLAZA CECILIA",
    "PUREGOLD PRICE CLUB (JR.)- CALVARIO",
    "PUREGOLD PRICE CLUB (JR.)- CAMALIG",
    "PUREGOLD PRICE CLUB (JR.)- KARUHATAN",
    "PUREGOLD PRICE CLUB (JR.)- MALINTA",
    "PUREGOLD PRICE CLUB - PLARIDEL",
    "PUREGOLD PRICE CLUB - MALOLOS JUNCTION",
    "PUREGOLD PRICE CLUB - GUINGUINTO BAYAN",
    "PUREGOLD PRICE CLUB - BULAKAN,BULAKAN",
    "PUREGOLD PRICE CLUB - STA.MARIA",
    "PUREGOLD PRICE CLUB (JR.)- PANDI",
    "PUREGOLD PRICE CLUB - BOCAUE",
    "PUREGOLD PRICE CLUB - CASA CECILIA",
    "PUREGOLD PRICE CLUB - LIAS MARILAO",
    "PUREGOLD PRICE CLUB (JR.)- LOMA DE GATO",
    "PUREGOLD PRICE CLUB - MUZON",
    "PUREGOLD PRICE CLUB - PASO DE BLAS",
    "PUREGOLD PRICE CLUB (JR.)- LIBERTAD",
    "PUREGOLD PRICE CLUB - LIBERTAD",
    "PUREGOLD PRICE CLUB - SUCAT",
    "PUREGOLD PRICE CLUB - MOONWALK",
    "PUREGOLD MINIMART - DONA SOLEDAD",
    "PUREGOLD PRICE CLUB - REMANVILLE",
    "PUREGOLD PRICE CLUB - SOUTHPARK",
    "PUREGOLD PRICE CLUB (JR.)- BF HOMES",
    "PUREGOLD PRICE CLUB - AGUIRRE",
    "PUREGOLD PRICE CLUB (JR.)- BETTER LIVING",
    "PUREGOLD PRICE CLUB (JR.)- DOROTEO JOSE",
    "PUREGOLD PRICE CLUB (JR.)- CARRIEDO",
    "PUREGOLD PRICE CLUB (JR.)- ESPANA",
    "PUREGOLD PRICE CLUB (JR.)- BUSTILLOS",
    "PUREGOLD PRICE CLUB - 999",
    "PUREGOLD PRICE CLUB (JR.)- JUAN LUNA",
    "PUREGOLD PRICE CLUB - DIVISORIA",
    "PUREGOLD PRICE CLUB - MALATE",
    "PUREGOLD PRICE CLUB - PACO",
    "PUREGOLD PRICE CLUB - PASIG",
    "PUREGOLD PRICE CLUB - TAGUIG",
    "PUREGOLD PRICE CLUB - PARANAQUE-1",
    "PUREGOLD PRICE CLUB (JR.)- BACLARAN",
    "PUREGOLD PRICE CLUB - MAKATI-1",
    "PUREGOLD PRICE CLUB (EXTRA.)- OSMENA",
    "PUREGOLD PRICE CLUB - SAN ANTONIO",
    "PUREGOLD PRICE CLUB - SAN DIONISIO",
    "PUREGOLD PRICE CLUB (JR.)- PANDACAN",
    "PUREGOLD PRICE CLUB (JR.)- BOCOBO",
    "PUREGOLD PRICE CLUB - FTI",
    "PUREGOLD PRICE CLUB (JR.)- TIPAS",
    "PUREGOLD PRICE CLUB (JR.)- USUSAN",
    "PUREGOLD PRICE CLUB (EXTRA.)- TAGUIG HAGONOY",
    "PUREGOLD PRICE CLUB - TAYUMAN-1",
    "PUREGOLD PRICE CLUB - GAGALANGIN",
    "PUREGOLD PRICE CLUB - DV HERBOSA",
    "PUREGOLD PRICE CLUB (JR.)- ZURBARAN",
    "PUREGOLD PRICE CLUB (JR.)- 3RD AVE",
    "PUREGOLD PRICE CLUB (JR.)- BLUMENTRITT CGH",
    "PUREGOLD PRICE CLUB - BLUMENTRITT",
    "PUREGOLD PRICE CLUB - SOUTHGATE",
    "PUREGOLD PRICE CLUB (JR.)- V. MAPA",
    "PUREGOLD PRICE CLUB (JR.)- PUREZA",
    "PUREGOLD PRICE CLUB - STA.MESA",
    "PUREGOLD PRICE CLUB - AGORA",
    "PUREGOLD PRICE CLUB - PULANG LUPA",
    "PUREGOLD PRICE CLUB - LAS PINAS",
    "PUREGOLD PRICE CLUB (JR.)- ZAPOTE ARCADE",
    "PUREGOLD PRICE CLUB - PULANG LUPA UNO",
    "PUREGOLD PRICE CLUB - MOLITO",
    "PUREGOLD PRICE CLUB - PUTATAN",
    "PUREGOLD PRICE CLUB - CASIMIRO",
    "PUREGOLD PRICE CLUB - MARCOS ALVAREZ LAS PINAS",
    "PUREGOLD PRICE CLUB - MINDANAO AVE",
    "PUREGOLD PRICE CLUB - COMMONWEALTH-1",
    "PUREGOLD PRICE CLUB - NORTH COMMONWEALTH",
    "PUREGOLD PRICE CLUB - CALOOCAN",
    "PUREGOLD PRICE CLUB - MONUMENTO",
    "PUREGOLD PRICE CLUB - BALINTAWAK",
    "PUREGOLD PRICE CLUB (JR.)- KALAYAAN",
    "PUREGOLD PRICE CLUB - KANLAON",
    "PUREGOLD PRICE CLUB (JR.)- DEL MONTE",
    "PUREGOLD PRICE CLUB (EXTRA.)- A. BONIFACIO",
    "PUREGOLD PRICE CLUB - MAYPAJO",
    "PUREGOLD PRICE CLUB - MALABON",
    "PUREGOLD PRICE CLUB - NAVOTAS",
    "PUREGOLD PRICE CLUB - CUBAO-1",
    "PUREGOLD PRICE CLUB - Q.I -1",
    "PUREGOLD PRICE CLUB (JR.)- MOTHER IGNACIA",
    "PUREGOLD PRICE CLUB (JR.)- TIMOG",
    "PUREGOLD PRICE CLUB - Q. AVE",
    "PUREGOLD PRICE CLUB (JR.)- WEST AVE.",
    "PUREGOLD PRICE CLUB (EXTRA)- PHILAM",
    "PUREGOLD PRICE CLUB (EXTRA.)- TANDANG SORA",
    "PUREGOLD PRICE CLUB - BAESA",
    "PUREGOLD PRICE CLUB - CROSSROAD",
    "PUREGOLD PRICE CLUB - LANGARAY",
    "PUREGOLD PRICE CLUB (MINIMART.)- LIBIS",
    "PUREGOLD PRICE CLUB - 999 CALOOCAN",
    "AYAGOLD UP TOWN",
    "AYAGOLD NORTH VERTIS",
    "PUREGOLD PRICE CLUB (JR.)- DON ANTONIO",
    "PUREGOLD PRICE CLUB - CULIAT",
    "PUREGOLD PRICE CLUB (JR.)- BALARA",
    "PUREGOLD PRICE CLUB - VISAYAS",
    "PUREGOLD PRICE CLUB (JR.)- QUIRINO HI WAY",
    "PUREGOLD PRICE CLUB - TERRACES",
    "PUREGOLD PRICE CLUB - ZABARTE",
    "PUREGOLD PRICE CLUB - SUSANO",
    "PUREGOLD PRICE CLUB - NITANG",
    "PUREGOLD PRICE CLUB - BAGONG SILANG",
    "PUREGOLD PRICE CLUB - DEPARO",
    "PUREGOLD PRICE CLUB - LANGIT ROAD",
    "PUREGOLD PRICE CLUB - NOVALICHES",
    "PUREGOLD PRICE CLUB (JR.)- ZABARTE",
    "PUREGOLD PRICE CLUB - CAMARIN",
    "PUREGOLD PRICE CLUB - CHAMPACA",
    "PUREGOLD PRICE CLUB -SUPERPALENGKE, ANTIPOLO (G)",
    "PUREGOLD PRICE CLUB - AMPID SAN MATEO (G)",
    "PUREGOLD PRICE CLUB (EXTRA.)- AMPID",
    "PUREGOLD PRICE CLUB (EXTRA.)- GUITNANG BAYAN",
    "PUREGOLD PRICE CLUB - SAN RAFAEL",
    "PUREGOLD PRICE CLUB (JR.)- DULONG BAYAN SAN MATEO",
    "PUREGOLD PRICE CLUB - BURGOS",
    "PUREGOLD PRICE CLUB (JR.)- ROSARIO",
    "PUREGOLD PRICE CLUB (JR.)- DE CASTRO",
    "PUREGOLD PRICE CLUB - CONCEPCION",
    "PUREGOLD PRICE CLUB (JR.)- MARIKINA",
    "PUREGOLD PRICE CLUB - TAYTAY",
    "PUREGOLD PRICE CLUB - Q. PLAZA",
    "PUREGOLD PRICE CLUB - JUNCTION",
    "PUREGOLD PRICE CLUB - BINANGONAN",
    "PUREGOLD PRICE CLUB - TAYTAY -2",
    "PUREGOLD PRICE CLUB (JR.)- TAYTAY PALENGKE",
    "PUREGOLD PRICE CLUB (JR.)- TAYTAY ANNEX",
    "PUREGOLD PRICE CLUB - SUMULONG",
    "PUREGOLD PRICE CLUB (JR.)- LILAC",
    "PUREGOLD PRICE CLUB (EXTRA.)- PANORAMA",
    "PUREGOLD PRICE CLUB - AYALA MALL MARIKINA",
    "PUREGOLD PRICE CLUB (EXTRA.)- PARANG",
    "PUREGOLD PRICE CLUB (JR.)- CONCEPCION",
    "PUREGOLD PRICE CLUB (EXTRA.)- STA. ELENA",
    "PUREGOLD PRICE CLUB - ORTIGAS AVE EXT PASIG (G)",
    "PUREGOLD PRICE CLUB - LIGAYA",
    "PUREGOLD PRICE CLUB (JR.)- ORTIGAS EXT EAST SUMMIT",
    "PUREGOLD PRICE CLUB (EXTRA) - BROOKSIDE CAINTA",
    "PUREGOLD PRICE CLUB (JR.)- PAROLA",
    "PUREGOLD PRICE CLUB - TAYTAY FLOODWAY",
    "PUREGOLD PRICE CLUB - MONTALBAN",
    "PUREGOLD PRICE CLUB - SAN MATEO BANABA",
    "PUREGOLD PRICE CLUB - ANGONO",
    "PUREGOLD PRICE CLUB (EXTRA.)- ANGONO HIGH WAY",
    "PUREGOLD PRICE CLUB (EXTRA.)- ANGONO BAYAN",
    "PUREGOLD PRICE CLUB - TANAY",
    "PUREGOLD PRICE CLUB - ANTIPOLO",
    "PUREGOLD PRICE CLUB (JR.)- ANTIPOLO",
    "PUREGOLD PRICE CLUB - EXTRA COGEO",
    "PUREGOLD PRICE CLUB - EASTLAND",
    "PUREGOLD PRICE CLUB - CIRCUMFERENTIAL ROAD",
    "PUREGOLD PRICE CLUB - TERESA",
    "PUREGOLD PRICE CLUB - C. RAYMUNDO",
    "PUREGOLD PRICE CLUB (JR.)- MALINAO PASIG",
    "PUREGOLD PRICE CLUB (JR.)- MERCEDEZ",
    "PUREGOLD PRICE CLUB (JR.)- NANGKA",
    "PUREGOLD PRICE CLUB (JR.)- BATASAN",
    "PUREGOLD PRICE CLUB - KALENTONG",
    "PUREGOLD PRICE CLUB - SHAW",
    "PUREGOLD PRICE CLUB - STA.ROSA BALIBAGO",
    "PUREGOLD PRICE CLUB - VICTORY MALL",
    "PUREGOLD PRICE CLUB - TAGAPO",
    "PUREGOLD PRICE CLUB - SAN PABLO",
    "PUREGOLD PRICE CLUB - STA. CRUZ (G)",
    "PUREGOLD PRICE CLUB - VICTORIA LAGUNA",
    "PUREGOLD PRICE CLUB (MINIMART.)- PILA",
    "PUREGOLD PRICE CLUB - HALANG",
    "PUREGOLD PRICE CLUB - PAGSANJAN",
    "PUREGOLD PRICE CLUB - FAMY",
    "PUREGOLD PRICE CLUB - STA.ROSA BAYAN (G)",
    "PUREGOLD PRICE CLUB - ALAMINOS",
    "PUREGOLD PRICE CLUB - ROXAS MINDORO",
    "PUREGOLD PRICE CLUB - PACITA",
    "PUREGOLD PRICE CLUB (MINIMART.)- VILLA OLYMPIA",
    "PUREGOLD PRICE CLUB (MINIMART.)- MAGSAYSAY",
    "PUREGOLD PRICE CLUB - BINAN",
    "PUREGOLD PRICE CLUB (EXTRA.)- GOLDEN CITY",
    "PUREGOLD PRICE CLUB (JR.)- CROSSTOWN",
    "PUREGOLD PRICE CLUB (JR.)- LOS BANOS",
    "PUREGOLD PRICE CLUB (EXTRA.)- LOS BANOS",
    "PUREGOLD PRICE CLUB (JR.)- PARIAN",
    "PUREGOLD PRICE CLUB - SAN ISIDRO CABUYAO",
    "PUREGOLD PRICE CLUB (JR.)- CANLUBANG",
    "PUREGOLD PRICE CLUB (EXTRA.)- CANLUBANG",
    "PUREGOLD PRICE CLUB (EXTRA.)- MAMATID",
    "PUREGOLD PRICE CLUB (EXTRA.)- CABUYAO BANLIC",
    "PUREGOLD PRICE CLUB - CROSSING CALAMBA",
    "PUREGOLD PRICE CLUB - CALAMBA BAYAN",
    "PUREGOLD PRICE CLUB - CALIHAN HIGHWAY",
    "PUREGOLD PRICE CLUB (EXTRA.)- SAN PABLO",
    "PUREGOLD PRICE CLUB - CANDELARIA",
    "PUREGOLD PRICE CLUB (EXTRA.)- TIAONG",
    "PUREGOLD PRICE CLUB (JR.)- SAN JUAN BATANGAS",
    "PUREGOLD PRICE CLUB - ROSARIO BATANGAS",
    "PUREGOLD PRICE CLUB - LIPA",
    "PUREGOLD PRICE CLUB - TANAUAN",
    "PUREGOLD PRICE CLUB - STO.TOMAS BATANGAS",
    "PUREGOLD PRICE CLUB - CALAUAN",
    "PUREGOLD PRICE CLUB - NEW MARKET BATANGAS (G)",
    "PUREGOLD PRICE CLUB - CALICANTO",
    "PUREGOLD PRICE CLUB - BOAC MARINDUQUE",
    "PUREGOLD PRICE CLUB - LUCENA",
    "PUREGOLD PRICE CLUB - TANZA",
    "PUREGOLD PRICE CLUB - CARMONA",
    "PUREGOLD PRICE CLUB - GMA",
    "PUREGOLD PRICE CLUB - BUCANDALA",
    "PUREGOLD PRICE CLUB - BACOOR",
    "PUREGOLD PRICE CLUB - ANABU",
    "PUREGOLD PRICE CLUB (JR.)- PALIPARAN",
    "PUREGOLD PRICE CLUB (EXTRA.)- MAGDIWANG",
    "PUREGOLD PRICE CLUB (JR.)- MARCOS ALVAREZ",
    "PUREGOLD PRICE CLUB - MOLINO BLVD.",
    "PUREGOLD PRICE CLUB - MOLINO TOWN CENTER",
    "PUREGOLD PRICE CLUB - MOLINO ROAD",
    "PUREGOLD PRICE CLUB - NOVELETA OASIS",
    "PUREGOLD PRICE CLUB - KAWIT",
    "PUREGOLD PRICE CLUB - ROSARIO",
    "PUREGOLD PRICE CLUB - NOVELETA",
    "PUREGOLD PRICE CLUB (EXTRA.)- PRINZA",
    "PUREGOLD DIVIMART - MANGGAHAN",
    "PUREGOLD PRICE CLUB (JR.)- HUGO PEREZ",
    "PUREGOLD DIVIMART - INOCENCIO",
    "PUREGOLD PRICE CLUB - BROOKSIDE LANE",
    "PUREGOLD PRICE CLUB (JR.)- GEN TRIAS",
    "PUREGOLD PRICE CLUB - BUHAY NA TUBIG",
    "PUREGOLD PRICE CLUB - TERMINAL MALL",
    "PUREGOLD PRICE CLUB - DASMARINAS HIGH WAY",
    "PUREGOLD PRICE CLUB (JR.)- DASMA BAYAN",
    "PUREGOLD PRICE CLUB - TANZANG LUMA",
    "PUREGOLD PRICE CLUB (JR.)- GOLDEN CITY",
    "PUREGOLD PRICE CLUB (JR.)- HABAY",
    "PUREGOLD PRICE CLUB - SILANG",
    "PUREGOLD PRICE CLUB (JR.)- TAGAYTAY-A",
    "PUREGOLD PRICE CLUB (EXTRA.)- TAGAYTAY",
    "PUREGOLD PRICE CLUB (JR.)- NAIC",
    "PUREGOLD PRICE CLUB - SAN PEDRO",
    "PUREGOLD PRICE CLUB - LANGGAM",
    "PUREGOLD PRICE CLUB (JR.)- BINAN",
    "PUREGOLD PRICE CLUB - BINAN BAYAN",
    "PUREGOLD PRICE CLUB (EXTRA.)- HALANG",
    "PUREGOLD PRICE CLUB - DIGOS",
    "PUREGOLD PRICE CLUB - TAGUM",
    "PUREGOLD PRICE CLUB - STO.TOMAS",
    "PUREGOLD PRICE CLUB - LANANG",
    "PUREGOLD PRICE CLUB - COTABATO MAIN",
    "PUREGOLD PRICE CLUB - COTABATO FIESTA MALL",
    "PUREGOLD PRICE CLUB - OZAMIS",
    "PUREGOLD PRICE CLUB - CAGAYAN DE ORO",
    "PUREGOLD PRICE CLUB - VALENCIA",
    "PUREGOLD - ILIGAN",
    "PUREGOLD PRICE CLUB - BUTUAN",
    "PUREGOLD PRICE CLUB - LANGIHAN",
    "PUREGOLD JR. ELVINDA",
    "PUREGOLD JUNIOR - CABUYAO BAYAN",
    "PUREGOLD - CALAPAN",
    "PUREGOLD CROSSING EAST",
    "PUREGOLD PRICE CLUB - IRIGA",
    "PUREGOLD PRICE CLUB - PILI",
    "PUREGOLD PRICE CLUB - NAGA DIVERSION",
    "PUREGOLD PRICE CLUB - CENTRO NAGA",
    "PUREGOLD PRICE CLUB - LEGAZPI ALBAY",
    "PUREGOLD PRICE CLUB - SORSOGON",
    "PUREGOLD PRICE CLUB - IROSIN SORSOGON",
    "PUREGOLD PRICE CLUB -GUIHULNGAN",
    "PUREGOLD PRICE CLUB - LIBERTAD BACOLOD",
    "PUREGOLD PRICE CLUB (JR.) -CENTROPLEX",
    "PUREGOLD PRICE CLUB - MANSILINGAN",
    "PUREGOLD PRICE CLUB -PORT BACOLOD",
    "PUREGOLD PRICE CLUB -BATA BACOLOD",
    "PUREGOLD PRICE CLUB -888 CHINA TOWN SQUARE",
    "PUREGOLD PRICE CLUB -HINIGARAN",
    "PUREGOLD PRICE CLUB - KABANKALAN",
    "PUREGOLD PRICE CLUB - BAROTAC VIEJO",
    "PUREGOLD PRICE CLUB - BAROTAC NUEVO",
    "PUREGOLD PRICE CLUB - ESCALANTE",
    "PUREGOLD - CADIZ",
    "PUREGOLD PRICE CLUB - BURGOS",
    "PUREGOLD PRICE CLUB - LEGAZPI",
    "PUREGOLD - PONTEVEDRA ROXAS",
    "PUREGOLD PRICE CLUB -BAYBAY GOODSHOP",
    "PUREGOLD PRICE CLUB -PUEBLO DE PANAY",
    "PUREGOLD PRICE CLUB-OTON",
    "PUREGOLD - JARO",
    "PUREGOLD PRICE CLUB - PAVIA",
    "PUREGOLD PRICE CLUB - STA.BARBARA",
    "PUREGOLD PRICE CLUB -SAN CARLOS",
    "PUREGOLD - BAYAWAN",
    "PUREGOLD - LA CASTELLANA",
    "PUREGOLD - CANLAON",
    "PUREGOLD - CALINOG",
    "PUREGOLD PRICE CLUB - MARASBARAS",
    "PUREGOLD PRICE CLUB - REAL TACLOBAN",
    "PUREGOLD PRICE CLUB - CALANIPAWAN",
    "PUREGOLD PRICE CLUB - KANANGA",
    "PUREGOLD PRICE CLUB - CARIGARA",
    "PUREGOLD PRICE CLUB - ABUYOG",
    "PUREGOLD PRICE CLUB - DULAG",
    "PUREGOLD PRICE CLUB - ALANG-ALANG",
    "PUREGOLD PRICE CLUB - PALO",
    "PUREGOLD PRICE CLUB - BORONGAN",
    "PUREGOLD PRICE CLUB - DOLORES",
    "PUREGOLD PRICE CLUB - BAYBAY LEYTE",
    "PUREGOLD PRICE CLUB - ORMOC",
    "PUREGOLD PRICE CLUB - SOGOD",
    "PUREGOLD PRICE CLUB - BATO",
    "PUREGOLD PRICE CLUB - ABUCAY",
    "PUREGOLD - MANGO",
    "PUREGOLD - TALISAY",
    "PUREGOLD - GUADALUPE",
    "PUREGOLD- KASAMBAGAN",
    "PUREGOLD PRICE CLUB - SINDALAN"
  ];

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleDiserChange = (event, newValue) => {
    setAdminSelectedMerchandiser(newValue);
  };

  const handleChange = (event, newValue) => {
    setSelectedBranch(newValue);
  };

  const handleFirstNameChange = (e) => {
    setAdminFirstName(e.target.value);
    if (e.target.value.length < 2) {
      setAdminFirstNameError("Please enter valid name");
    } else {
      setAdminFirstNameError(false);
    }
  };

  const handleMiddleNameChange = (e) => {
    setAdminMiddleName(e.target.value);
    if (e.target.value.length < 2) {
      setAdminMiddleNameError("Please enter valid name");
    } else {
      setAdminMiddleNameError(false);
    }
  };

  const handleLastNameChange = (e) => {
    setAdminLastName(e.target.value);
    if (e.target.value.length < 2) {
      setAdminLastNameError("Please enter valid name");
    } else if (e.target.value.length > 20) {
      setAdminLastNameError("Name must be less than 20 characters long");
    } else if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
      setAdminLastNameError("Name must contain only letters and spaces");
    } else {
      setAdminLastNameError(false);
    }
  };

  const handleEmailChange = (e) => {
    setAdminEmail(e.target.value);
    if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(e.target.value)) {
      setAdminEmailError("Invalid email address");
    } else {
      setAdminEmailError(false);
    }
  };

  const handlePhoneChange = (e) => {
    if (e.target.value.length > 11) return;
    setAdminPhone(e.target.value);
    if (e.target.value.length < 2) {
      setAdminPhoneError("Please enter valid phone number");
    } else {
      setAdminPhoneError(false);
    }
  };

  const handleAddressChange = (e) => {
    setAdminAddress(e.target.value);
    if (e.target.value.length < 2) {
      setAdminAddressError("NPlease enter valid address");
    } else {
      setAdminAddressError(false);
    }
  };

  const handlePasswordChange = (e) => {
    setAdminPassword(e.target.value);
    console.log(adminPassword);
    if (e.target.value.length < 2) {
      setAdminPasswordError("Please enter valid password");
    } else {
      setAdminPasswordError(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setAdminConfirmPassword(e.target.value);
    if (e.target.value !== adminPassword) {
      setAdminConfirmPasswordError("Password does not match!");
    } else {
      setAdminConfirmPasswordError(false);
    }
  };

  const handleOtpCodeChange = (e) => {
    if (e.target.value.length > 4) return;

    setInputOtpCode(e.target.value);
  };

  const handleOpenDialog = () => {
    setOpenModal(true);
  };

  const handleCloseDialog = () => {
    setOpenModal(false);
  };

  const handleCloseOtpDialog = () => {
    setOpenDialog(false);
  };

  const handleStatusCloseDialog = () => {
    setOpenStatusDialog(false);
  };

  const handleViewCloseModal = () => {
    setOpenViewModal(false);
  };

  const handleUpdate = async () => {
    try {
      // Extract emails
      const selectedEmails = adminSelectedMerchandiser.map(
        (item) => item.emailAddress
      );

      console.log("Selected emails:", selectedEmails);

      // Ensure selectedEmails is not empty and all elements are strings
      if (
        selectedEmails.length === 0 ||
        selectedEmails.some((email) => typeof email !== "string")
      ) {
        console.warn("No emails selected or invalid email format");
        return;
      }

      // Send the emails to the backend
      const response = await axios.post(
        "https://latest-backend-towi-admin.onrender.com/update-coor-details",
        {
          emails: selectedEmails,
        }
      );

      if (response.status === 200) {
        console.log("Update successful");
        handleViewCloseModal();
      } else {
        console.error("Failed to update CoorDetails:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating CoorDetails:", error);
    }
  };

  const columns = [
    {
      field: "count",
      headerName: "#",
      width: 100,
      headerClassName: "bold-header",
    },
    {
      field: "roleAccount",
      headerName: "Role",
      width: 200,
      headerClassName: "bold-header",
    },
    {
      field: "accountNameBranchManning",
      headerName: "Branch",
      width: 200,
      headerClassName: "bold-header",
    },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "middleName",
      headerName: "Middle name",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "emailAddress",
      headerName: "Email",
      width: 250,
      headerClassName: "bold-header",
    },
    {
      field: "contactNum",
      headerName: "Contact Number",
      headerClassName: "bold-header",
    },
    //   {
    //     field: 'date_join',
    //     headerName: 'Date Join',
    //   },
    {
      field: "isActive",
      headerName: "Status",
      headerClassName: "bold-header",
      width: 150,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const status = params.row.isActive;
        const rowEmail = params.row.emailAddress;
        const onClick = (e) => {
          {
            status ? setUpdateStatus(false) : setUpdateStatus(true);
          }
          setUserEmail(rowEmail);
          setOpenStatusDialog(true);
        };

        return (
          <>
            {status ? (
              <Stack>
                <ColorButton
                  variant="contained"
                  size="small"
                  style={{
                    width: "70%",
                    marginTop: "13px",
                    backgroundColor: "#90EE90",
                    color: "#000000",
                  }}
                  onClick={onClick}
                >
                  Active
                </ColorButton>
              </Stack>
            ) : (
              <Stack>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  style={{ width: "70%", marginTop: "13px" }}
                  onClick={onClick}
                >
                  Inactive
                </Button>
              </Stack>
            )}
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "bold-header",
      width: 150,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const onClick = (e) => {
          let rFullname;
          let rMiddleName = params.row.middleName;
          let rEmail = params.row.emailAddress;
          let rPhone = params.row.contactNum;
          let rbranch = params.row.accountNameBranchManning;
          //let rJDate = params.row.date_join;
          if (rMiddleName === "Null") {
            rFullname = params.row.firstName + " " + params.row.lastName;
          } else {
            rFullname =
              params.row.firstName +
              " " +
              params.row.middleName +
              " " +
              params.row.lastName;
          }
          setAdminViewBranch(rbranch);
          setAdminViewFullName(rFullname);
          setAdminViewEmail(rEmail);
          setAdminViewPhone(rPhone);
          //   setAdminViewJDate(rJDate);

          return setOpenViewModal(true);
        };

        return (
          <Stack>
            <Button
              variant="contained"
              size="small"
              color="info"
              onClick={onClick}
              style={{
                width: "50%",
                marginTop: "13px",
                backgroundColor: "#008000",
                color: "#FFFFF",
              }}
            >
              View
            </Button>
          </Stack>
        );
      },
    },
  ];

  async function getUser() {
    try {
      const response = await axios.post(
        "https://latest-backend-towi-admin.onrender.com/get-all-user"
      );
      const data = response.data.data;

      const newData = data.map((item, key) => ({
        id: item._id,
        label: `${item.firstName} ${item.lastName}`, // Combine names for display
        emailAddress: item.emailAddress,
      }));

      setUserData(newData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function getMerchandiserData() {
    try {
      const response = await axios.post(
        "https://latest-backend-towi-admin.onrender.com/get-all-merchandiser"
      );
      const data = response.data.data;

      const newData = data.map((item, key) => ({
        id: item._id,
        label: `${item.firstName} ${item.lastName}`, // Combine names for display
        emailAddress: item.emailAddress,
      }));
      console.log("mechantdiser data", newData);

      setMerchandiserData(newData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  // Fetch user data on component mount
  React.useEffect(() => {
    getUser();
    getMerchandiserData();
  }, []);

  async function getUser() {
    await axios
      .post("https://latest-backend-towi-admin.onrender.com/get-admin-user", requestBody)
      .then(async (response) => {
        const data = await response.data.data;

        const newData = data.map((data, key) => {
          return {
            count: key + 1,
            roleAccount: data.roleAccount,
            accountNameBranchManning: data.accountNameBranchManning,
            firstName: data.firstName,
            middleName: data.middleName ? data.middleName : "Null",
            lastName: data.lastName,
            emailAddress: data.emailAddress,
            contactNum: data.contactNum,
            //date_join: data.j_date? new Date(data.j_date).toLocaleDateString('en-us', {month: 'long', day: 'numeric', year: 'numeric'}): "Null",
            isActive: data.isActivate,
          };
        });
        console.log(newData, "testing par");
        setUserData(newData);
      });
  }

  async function setStatus() {
    await axios
      .put("https://latest-backend-towi-admin.onrender.com/update-status", requestBody)
      .then(async (response) => {
        const data = await response.data.data;

        window.location.reload();
      });
  }

  async function sendOtp() {
    if (adminSelectedRole === "") {
      Swal.fire({
        title: "Unable to proceed",
        text: "Please select Role!",
        icon: "error",
      });
      return;
    }

    if (adminSelectedBranch.length === 0) {
      Swal.fire({
        title: "Unable to proceed",
        text: "Please select Branch!",
        icon: "error",
      });
      return;
    }

    await axios
      .post("https://latest-backend-towi-admin.onrender.com/send-otp-register", {
        email: adminEmail,
      })
      .then(async (response) => {
        const data = await response.data;
        console.log(response.data);
        if (data.status === 200) {
          setOtpCode(data.code);
          setOpenDialog(true);
        } else {
          Swal.fire({
            title: "Unable to proceed",
            text: "Sending OTP failed!",
            icon: "error",
          });
        }
      })
      .catch(function (error) {
        if (error.response) {
          Swal.fire({
            title: "Unable to proceed",
            text: error.response.data,
            icon: "error",
          });
          return;
        } else if (error.request) {
          Swal.fire({
            title: "Unable to proceed",
            text: error.request,
            icon: "error",
          });
          return;
        } else {
          Swal.fire({
            title: "Unable to proceed",
            text: error.message,
            icon: "error",
          });
          return;
        }
      });
  }

  async function confirmOtp() {
    if (otpCode === inputOtpCode) {
      const userDetails = {
        roleAccount: adminSelectedRole,
        accountNameBranchManning: adminSelectedBranch,
        firstName: adminFirstName,
        middleName: adminMiddleName,
        lastName: adminLastName,
        contactNum: adminPhone,
        emailAddress: adminEmail,
        password: adminPassword,
      };

      axios
        .post("https://latest-backend-towi-admin.onrender.com/register-user-admin", userDetails)
        .then(async (response) => {
          const data = response.data;

          if (data.status === 200) {
            Swal.fire({
              title: "Success",
              text: "User created successfully!",
              icon: "success",
              confirmButtonColor: "#3085d6",
            }).then((result) => {
              if (result.isConfirmed) {
                return window.location.reload();
              } else {
                return window.location.reload();
              }
            });
          } else {
            Swal.fire({
              title: "Unable to proceed",
              text: "Saving user Error!",
              icon: "error",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (otpCode !== inputOtpCode) {
      setInputOtpCodeError("OTP code does not match.");
    } else if (inputOtpCode.length < 4) {
      setInputOtpCodeError("Input must be 4 digits.");
    }
    return;
  }

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="account">
      <Topbar />
      <div className="container">
        <Sidebar />
        <div style={{ height: "100%", width: "85%", marginLeft: "100" }}>
          <div style={{ margin: 10 }}>
            <Button
              onClick={handleOpenDialog}
              variant="contained"
              style={{ backgroundColor: "#008000", color: "#FFFFF" }}
              endIcon={<PersonAddAlt1Icon />}
            >
              Add User
            </Button>
          </div>
          <DataGrid
            rows={userData}
            sx={{ overflowX: "scroll" }}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
              columns: {
                columnVisibilityModel: {
                  // Hide columns status and traderName, the other columns will remain visible
                  contactNum: false,
                  //date_join: false,
                },
              },
            }}
            // slots={{
            //   toolbar: CustomToolbar,
            //   // loadingOverlay: LinearProgress,
            // }}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                printOptions: { disableToolbarButton: true },
                csvOptions: { disableToolbarButton: true },
              },
            }}
            loading={!userData.length}
            disableDensitySelector
            disableColumnFilter
            disableColumnSelector
            pageSizeOptions={[5, 10, 20, 50]}
            getRowId={(row) => row.count}
            disableRowSelectionOnClick
          />
        </div>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            {/* <Box  components="form" noValidate sx={Otpstyle}> */}
            <FormControl sx={{ m: 2 }}>
              <p>Enter OTP code :</p>
              <TextField
                value={inputOtpCode}
                error={inputOtpCodeError}
                helperText={inputOtpCodeError}
                type="number"
                inputProps={{ maxLength: 4 }}
                onChange={handleOtpCodeChange}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      display: "none",
                    },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
              />
            </FormControl>
            {/* </Box> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseOtpDialog}>Cancel</Button>
            <Button onClick={confirmOtp} autoFocus>
              Create User
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openStatusDialog}
          onClose={handleStatusCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Account Activation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {updateStatus
                ? "Are you sure you want to set this user as active?"
                : "Are you sure you want to set this user as inactive?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleStatusCloseDialog}>Cancel</Button>
            <Button onClick={setStatus} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Modal
          open={openViewModal}
          onClose={handleViewCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack spacing={3}>
              <p>Full Details :</p>

              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <span className="detailTitle">Account Branch Name:</span>{" "}
                <span className="detailDescription">{adminViewBranch}</span>
                <br></br>
                <br></br>
              </Typography>

              {/* <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel id="merchandiser-select-label"></InputLabel>
        <Autocomplete
          multiple
          id="merchandiser-select"
          options={merchandiserData}
          getOptionLabel={(option) => `${option.emailAddress}`}
          value={adminSelectedMerchandiser}
          onChange={handleDiserChange}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox checked={selected} style={{ marginRight: 8 }} />
              {`${option.label}`}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Merchandisers"
              placeholder="Select Merchandisers"
            />
          )}
        />
      </FormControl> */}

              <TextField
                label="Email"
                id="outlined-read-only-input"
                defaultValue={adminViewEmail}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Contact Number"
                id="outlined-read-only-input"
                defaultValue={adminViewPhone}
                InputProps={{
                  readOnly: true,
                }}
              />

              <DialogActions>
                <Button onClick={handleViewCloseModal}>Close</Button>
                <Button
                  onClick={handleUpdate}
                  color="primary"
                  variant="contained"
                >
                  Update
                </Button>
              </DialogActions>
            </Stack>
          </Box>
        </Modal>

        <Modal
          open={openModal}
          onClose={handleCloseDialog}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          tabindex="-1"
          data-bs-focus="false"
        >
          <Box components="form" noValidate sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Admin Details :{/* {test} */}
            </Typography>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}

            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={adminSelectedRole}
                onChange={handleRoleChange}
                label="Role"
              >
                <MenuItem value="COORDINATOR">COORDINATOR</MenuItem>
                <MenuItem value="ACCOUNT SUPERVISOR">
                  ACCOUNT SUPERVISOR
                </MenuItem>
                <MenuItem value="OPERATION OFFICER">OPERATION OFFICER</MenuItem>
                <MenuItem value="OPERATION HEAD">OPERATION HEAD</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="branch-select-label"></InputLabel>
              <Autocomplete
                multiple
                id="branch-select"
                options={branches}
                value={adminSelectedBranch}
                onChange={handleChange}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox checked={selected} style={{ marginRight: 8 }} />
                    {option}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Branches"
                    placeholder="Select Branch"
                  />
                )}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                label="First Name *"
                value={adminFirstName}
                onChange={handleFirstNameChange}
                error={adminFirstNameError}
                helperText={adminFirstNameError}
                autoComplete="off"
                InputProps={{ autoComplete: "off" }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                label="Middle Name"
                value={adminMiddleName}
                onChange={handleMiddleNameChange}
                error={adminMiddleNameError}
                helperText={adminMiddleNameError}
                autoComplete="off"
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                label="Last Name *"
                value={adminLastName}
                onChange={handleLastNameChange}
                error={adminLastNameError}
                helperText={adminLastNameError}
                autoComplete="off"
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                label="Email *"
                value={adminEmail}
                onChange={handleEmailChange}
                error={adminEmailError}
                helperText={adminEmailError}
                autoComplete="off"
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                label="Contact Number *"
                value={adminPhone}
                onChange={handlePhoneChange}
                error={adminPhoneError}
                type="number"
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      display: "none",
                    },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
                helperText={adminPhoneError}
                autoComplete="off"
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                label="Password *"
                value={adminPassword}
                onChange={handlePasswordChange}
                error={adminPasswordError}
                helperText={adminPasswordError}
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                label="Confirm Password"
                value={adminConfirmPassword}
                onChange={handleConfirmPasswordChange}
                error={adminConfirmPasswordError}
                helperText={adminConfirmPasswordError}
                type="password"
                autoComplete="off"
              />
            </FormControl>

            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              <Button onClick={sendOtp} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

const ColorButton = styled(Button)(({ theme }) => ({
  color: "#000",
  backgroundColor: "#F6FAB9",
  "&:hover": {
    backgroundColor: "#CAE6B2",
  },
}));
