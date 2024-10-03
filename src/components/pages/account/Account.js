import "./account.css";
import * as React from "react";
import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbar,
} from "@mui/x-data-grid";
import axios, { isAxiosError } from "axios";
import { Button, Stack, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDemoData } from "@mui/x-data-grid-generator";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Autocomplete } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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

export default function Account() {
  const { data, loading } = useDemoData({
    dataSet: "Commodity",
    rowLength: 4,
    maxColumns: 6,
  });

  const [userData, setUserData] = React.useState([]);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const [updateStatus, setUpdateStatus] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  var test = "testing";

  const requestBody = { isActivate: updateStatus, emailAddress: userEmail };

  const [modalFullName, setModalFullName] = React.useState("");
  const [modalBranch, setModalBranch] = React.useState("");
  const [modalEmail, setModalEmail] = React.useState("");
  const [modalPhone, setModalPhone] = React.useState("");

  const [openDialog, setOpenDialog] = React.useState(false);
  const roleAccount = localStorage.getItem("roleAccount"); // Get roleAccount from localStorage

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [branches, setBranches] = React.useState([
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
  ]); //Branches

  // State for the second modal
  const [openBranchModal, setOpenBranchModal] = React.useState(false);
  const handleOpenBranchModal = () => setOpenBranchModal(true);
  const handleCloseBranchModal = () => setOpenBranchModal(false);

  // State for selected branches
  const [selectedBranches, setSelectedBranches] = React.useState([]);

  // Update the branch of the user with the selected branches
  // Update the branch of the user with the selected branches
  const handleBranchSave = async () => {
    try {
      // Update the user's branches with the selected branches
      const response = await axios.put(
        "https://latest-backend-towi-admin.onrender.com/update-user-branch",
        {
          emailAddress: modalEmail,
          branches: selectedBranches,
        }
      );

      console.log("User branches updated:", response.data);

      // Update the branch field in the userData state
      const updatedUserData = userData.map((user) => {
        if (user.emailAddress === modalEmail) {
          return {
            ...user,
            Branch: selectedBranches.join(", "), // Update the Branch field
          };
        }
        return user;
      });

      setUserData(updatedUserData); // Set the updated userData state

      // After successful update, you might want to refresh the user data
      getUser();

      handleCloseBranchModal(); // Close the branch selection modal after saving
    } catch (error) {
      console.error("Error updating user branches:", error);
    }
  };

  const columns = [
    { field: "count", headerName: "#", width: 100 },
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
      field: "remarks",
      headerName: "Remarks",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "contactNum",
      headerName: "Contact Number",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "Branch",
      headerName: "Account Name Branch",
      width: 250,
      headerClassName: "bold-header",
    },
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
        const roleAccount = localStorage.getItem("roleAccount"); // Get role from localStorage

        const onClick = (e) => {
          if (roleAccount === "ACCOUNT SUPERVISOR") {
            status ? setUpdateStatus(false) : setUpdateStatus(true);
            setUserEmail(rowEmail);
            handleOpenDialog();
          }
        };

        return (
          <>
            {status ? (
              <Stack>
                <ColorButton
                  variant="contained"
                  size="small"
                  style={{
                    width: "50%",
                    marginTop: "13px",
                    backgroundColor: "#90EE90",
                    color: "#000000",
                  }}
                  onClick={onClick}
                  disabled={roleAccount !== "ACCOUNT SUPERVISOR"} // Disable if not Account Supervisor
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
                  style={{ width: "50%", marginTop: "13px" }}
                  onClick={onClick}
                  disabled={roleAccount !== "ACCOUNT SUPERVISOR"} // Disable if not Account Supervisor
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
      headerClassName: "bold-header",
      headerName: "Action",
      width: 90,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const onClick = (e) => {
          let mFullname = params.row.firstName + " " + params.row.lastName;
          let condition = params.row.middleName;
          let mBranch = params.row.Branch;
          let mEmail = params.row.emailAddress;
          let mPhone = params.row.contactNum;
          if (condition === "Null") {
            mFullname = params.row.firstName + " " + params.row.lastName;
          } else {
            mFullname =
              params.row.firstName +
              " " +
              params.row.middleName +
              " " +
              params.row.lastName;
          }

          setModalFullName(mFullname);
          setModalBranch(mBranch);
          setModalEmail(mEmail);
          setModalPhone(mPhone);

          return handleOpen();
        };

        return (
          <Stack>
            <Button
              variant="contained"
              size="small"
              color="primary"
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
    await axios
      .post(
        "https://latest-backend-towi-admin.onrender.com/get-all-user",
        requestBody
      )
      .then(async (response) => {
        const data = await response.data.data;

        const newData = data.map((data, key) => {
          return {
            count: key + 1,
            remarks: data.remarks,
            firstName: data.firstName,
            middleName: data.middleName ? data.middleName : "Null",
            lastName: data.lastName,

            Branch: data.accountNameBranchManning,
            emailAddress: data.emailAddress,
            contactNum: data.contactNum,
            isActive: data.isActivate,
          };
        });
        console.log(newData, "testing par");
        setUserData(newData);
      });
  }

  async function setStatus() {
    console.log("check body", requestBody);
    await axios
      .put(
        "https://latest-backend-towi-admin.onrender.com/update-status",
        requestBody
      )
      .then(async (response) => {
        const data = await response.data.data;

        console.log(data, "status info");
        window.location.reload();
      });
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
          <DataGrid
            rows={userData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
              columns: {
                columnVisibilityModel: {
                  // Hide columns status and traderName, the other columns will remain visible
                  address: false,
                  phone: false,
                },
              },
            }}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                printOptions: { disableToolbarButton: true },
                csvOptions: { disableToolbarButton: false },
              },
            }}
            loading={!userData.length}
            disableDensitySelector
            disableColumnFilter
            disableColumnSelector
            pageSizeOptions={[5, 10, 20, 50, 100, 200]}
            getRowId={(row) => row.count}
            disableRowSelectionOnClick
          />
        </div>

        <Modal
          open={openModal}
          onClose={handleCloseDialog}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Full Details :
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <span className="detailTitle">Full name:</span>
              <span className="detailDescription">{modalFullName}</span>
              <br />
              <span className="detailTitle">Email:</span>
              <span className="detailDescription">{modalEmail}</span>
              <br />
              <span className="detailTitle">Contact Number:</span>
              <span className="detailDescription">{modalPhone}</span>
              <br />
              <span className="detailTitle">Account Branch Name:</span>
              <span className="detailDescription">{modalBranch}</span>
              <br />
              <br />
              {/* Button to open branch selection modal */}
              <Button
                variant="contained"
                onClick={handleOpenBranchModal}
                disabled={roleAccount !== "ACCOUNT SUPERVISOR"} // Disable if not Account Supervisor
              >
                Select Branch
              </Button>
            </Typography>
            <Stack>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Stack>
          </Box>
        </Modal>

        <Dialog
          open={openBranchModal}
          onClose={handleCloseBranchModal}
          aria-labelledby="branch-dialog-title"
          aria-describedby="branch-dialog-description"
          fullWidth
          maxWidth="md" // Set the maximum width to 'md' (medium)
        >
          <DialogTitle id="branch-dialog-title">Select Branch</DialogTitle>
          <DialogContent>
            <Autocomplete
              multiple
              id="branches-autocomplete"
              options={branches}
              defaultValue={selectedBranches}
              onChange={(event, value) => setSelectedBranches(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select Branch"
                  placeholder="Select Branch"
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseBranchModal}>Cancel</Button>
            <Button onClick={handleBranchSave} autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
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
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={setStatus} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
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
