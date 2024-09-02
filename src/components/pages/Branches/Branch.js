import "./Branch.css";
import * as React from "react";
import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Checkbox,
  TextField,
} from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Styles for modal
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

const skus = {
  V1: [
    {
      SKUDescription: "KOPIKO COFFEE CANDY 24X175G",
      product: "COFFEE SHOT",
      skuCode: "326924",
    },
    {
      SKUDescription: "KOPIKO COFFEE CANDY JAR 6X560G",
      product: "COFFEE SHOT",
      skuCode: "326926",
    },
    {
      SKUDescription: "KOPIKO CAPPUCCINO CANDY 24X175G",
      product: "COFFEE SHOT",
      skuCode: "326925",
    },
    {
      SKUDescription: "FRES BARLEY MINT 24X50X3G",
      product: "FRES",
      skuCode: "326446",
    },
    {
      SKUDescription: "FRES MINT BARLEY JAR 12X2003G",
      product: "FRES",
      skuCode: "329136",
    },
    {
      SKUDescription: "FRES MINT BARLEY CANDY BIGPACK 6X1350G",
      product: "FRES",
      skuCode: "",
    },
    {
      SKUDescription: "FRES CHERRY CANDY, 24 X 50 X 3G",
      product: "FRES",
      skuCode: "326447",
    },
    {
      SKUDescription: "FRES CHERRY JAR, 12X 200 X 3G",
      product: "FRES",
      skuCode: "329135",
    },
    {
      SKUDescription: "FRES MINT CHERRY CANDY BIGPACK 6X1350G",
      product: "FRES",
      skuCode: "",
    },
    {
      SKUDescription: "CAL CHEESE 10X20X8.5G",
      product: "CAL CHEESE",
      skuCode: "329809",
    },
    {
      SKUDescription: "CAL CHEESE 60X35G",
      product: "CAL CHEESE",
      skuCode: "322571",
    },
    {
      SKUDescription: "CAL CHEESE 60X53.5G",
      product: "CAL CHEESE",
      skuCode: "329808",
    },
    {
      SKUDescription: "CAL CHEESE CHEESE CHOCO 60X53.5G",
      product: "CAL CHEESE",
      skuCode: "322866",
    },
    {
      SKUDescription: "CAL CHEESE CHEESE CHOCO 60X35G",
      product: "CAL CHEESE",
      skuCode: "322867",
    },
    {
      SKUDescription: "MALKIST CHOCOLATE 30X10X24G",
      product: "MALKIST",
      skuCode: "321036",
    },
    { SKUDescription: "ROMA CREAM CRACKERS", product: "ROMA", skuCode: "" },
    {
      SKUDescription: "WAFELLO CHOCOLATE WAFER 60X53.5G",
      product: "WAFELLO",
      skuCode: "330016",
    },
    {
      SKUDescription: "WAFELLO CHOCOLATE WAFER 60X35G",
      product: "WAFELLO",
      skuCode: "330025",
    },
    {
      SKUDescription: "WAFELLO BUTTER CARAMEL 60X35G",
      product: "WAFELLO",
      skuCode: "322871",
    },
    {
      SKUDescription: "WAFELLO COCO CREME 60X35G",
      product: "WAFELLO",
      skuCode: "322868",
    },
    {
      SKUDescription: "WAFELLO CREAMY VANILLA 20X10X20.5G PH",
      product: "WAFELLO",
      skuCode: "330073",
    },
    {
      SKUDescription: "VALMER CHOCOLATE 12X10X54G",
      product: "VALMER",
      skuCode: "321038",
    },
    {
      SKUDescription: "SUPERSTAR TRIPLE CHOCOLATE 12 X10 X 18G",
      product: "SUPERSTAR",
      skuCode: "322894",
    },
    {
      SKUDescription: "DANISA BUTTER COOKIES 12X454G",
      product: "DANISA",
      skuCode: "329650",
    },
    {
      SKUDescription: "WAFELLO BUTTER CARAMEL 60X53.5G",
      product: "WAFELLO",
      skuCode: "322870",
    },
    {
      SKUDescription: "WAFELLO COCO CREME 60X53.5G",
      product: "WAFELLO",
      skuCode: "322869",
    },
    {
      SKUDescription: "WAFELLO CREAMY VANILLA 60X48G PH",
      product: "WAFELLO",
      skuCode: "330060",
    },
    {
      SKUDescription: "WAFELLO CHOCOLATE 48G X 60",
      product: "WAFELLO",
      skuCode: "330050",
    },
    {
      SKUDescription: "WAFELLO CHOCOLATE 21G X 10 X 20",
      product: "WAFELLO",
      skuCode: "330051",
    },
    {
      SKUDescription: "WAFELLO BUTTER CARAMEL 48G X 60",
      product: "WAFELLO",
      skuCode: "330056",
    },
    {
      SKUDescription: "WAFELLO BUTTER CARAMEL 20.5G X 10 X 20",
      product: "WAFELLO",
      skuCode: "330057",
    },
    {
      SKUDescription: "WAFELLO COCO CRÈME 48G X 60",
      product: "WAFELLO",
      skuCode: "330058",
    },
    {
      SKUDescription: "WAFELLO COCONUT CRÈME 20.5G X 10 X 20",
      product: "WAFELLO",
      skuCode: "330059",
    },
    {
      SKUDescription: "CAL CHEESE 60 X 48G",
      product: "CAL CHEESE",
      skuCode: "330052",
    },
    {
      SKUDescription: "CAL CHEESE 20 X 10 X 20G",
      product: "CAL CHEESE",
      skuCode: "330053",
    },
    {
      SKUDescription: "CAL CHEESE 20 X 20 X 8.5G",
      product: "CAL CHEESE",
      skuCode: "330071",
    },
    {
      SKUDescription: "CAL CHEESE CHOCO 60 X 48G",
      product: "CAL CHEESE",
      skuCode: "330054",
    },
    {
      SKUDescription: "CAL CHEESE CHOCO 20 X 10 X 20.5G",
      product: "CAL CHEESE",
      skuCode: "330055",
    },
    {
      SKUDescription: "VALMER SANDWICH CHOCOLATE 12X10X36G",
      product: "VALMER",
      skuCode: "321475",
    },
    {
      SKUDescription: "MALKIST CAPPUCCINO 30X10X23G PH",
      product: "MALKIST",
      skuCode: "321446",
    },
  ],
  V2: [
    {
      SKUDescription: "KOPIKO BLACK 3 IN ONE HANGER 24 X 10 X 30G",
      product: "BLACK",
      skuCode: "322628",
    },
    {
      SKUDescription: "KOPIKO BLACK 3 IN ONE POUCH 24 X 10 X 30G",
      product: "BLACK",
      skuCode: "322630",
    },
    {
      SKUDescription: "KOPIKO BLACK 3 IN ONE BAG 8 X 30 X 30G",
      product: "BLACK",
      skuCode: "322629",
    },
    {
      SKUDescription: "KOPIKO BLACK 3 IN ONE PROMO TWIN 12 X 10 X 2 X 30G",
      product: "BLACK",
      skuCode: "322627",
    },
    {
      SKUDescription: "KOPIKO BROWN COFFEE HG 27.5G 24 X 10 X 27.5G",
      product: "BROWN",
      skuCode: "328890",
    },
    {
      SKUDescription: "KOPIKO BROWN COFFEE POUCH 24 X 10 X 27.GG",
      product: "BROWN",
      skuCode: "329958",
    },
    {
      SKUDescription: "KOPIKO BROWN COFFEE BAG 8 X 30 X 27.5G",
      product: "BROWN",
      skuCode: "329959",
    },
    {
      SKUDescription: "KOPIKO BROWN PROMO TWIN 12 X 10 X 53G",
      product: "BROWN",
      skuCode: "329940",
    },
    {
      SKUDescription: "KOPIKO CAPPUCCINO HANGER 24 X 10 X 25G",
      product: "CAPPUCCINO",
      skuCode: "329701",
    },
    {
      SKUDescription: "KOPIKO CAPPUCCINO POUCH 24 X 10 X 25G",
      product: "CAPPUCCINO",
      skuCode: "329703",
    },
    {
      SKUDescription: "KOPIKO CAPPUCCINO BAG 8 X 30 X 25G",
      product: "CAPPUCCINO",
      skuCode: "329704",
    },
    {
      SKUDescription: "KOPIKO L.A. COFFEE HANGER 24 X 10 X 25G",
      product: "L.A.",
      skuCode: "325666",
    },
    {
      SKUDescription: "KOPIKO L.A. COFFEE POUCH 24 X 10 X 25G",
      product: "L.A.",
      skuCode: "325667",
    },
    {
      SKUDescription: "KOPIKO BLANCA HANGER 24 X 10 X 30G",
      product: "BLANCA",
      skuCode: "328888",
    },
    {
      SKUDescription: "KOPIKO BLANCA POUCH 24 X 10 X 30G",
      product: "BLANCA",
      skuCode: "328887",
    },
    {
      SKUDescription: "KOPIKO BLANCA BAG 8 X 30 X 30G",
      product: "BLANCA",
      skuCode: "328889",
    },
    {
      SKUDescription: "KOPIKO BLANCA TWINPACK 12 X 10 X 2 X 29G",
      product: "BLANCA",
      skuCode: "322711",
    },
    {
      SKUDescription: "TORACAFE WHITE AND CREAMY 12 X (10 X 2) X 26G",
      product: "TORA",
      skuCode: "322731",
    },
    {
      SKUDescription: "KOPIKO CREAMY CARAMELO 12 X (10 X 2) X 25G",
      product: "CARAMELO",
      skuCode: "322725",
    },
    {
      SKUDescription: "KOPIKO DOUBLE CUPS 24 X 10 X 36G",
      product: "DOUBLE CUPS",
      skuCode: "329744",
    },
    {
      SKUDescription: "ENERGEN CHOCOLATE HANGER 24 X 10 X 40G",
      product: "ENERGEN",
      skuCode: "328497",
    },
    {
      SKUDescription: "ENERGEN CHOCOLATE POUCH 24 X 10 X 40G",
      product: "ENERGEN",
      skuCode: "328492",
    },
    {
      SKUDescription: "ENERGEN CHOCOLATE BAG 8 X 30 X 40G",
      product: "ENERGEN",
      skuCode: "328493",
    },
    {
      SKUDescription: "ENERGEN CHOCOLATE VANILLA HANGER 24 X 10 X 40G",
      product: "ENERGEN",
      skuCode: "328494",
    },
    {
      SKUDescription: "ENERGEN CHOCOLATE VANILLA POUCH 24 X 10 X 40G",
      product: "ENERGEN",
      skuCode: "328495",
    },
    {
      SKUDescription: "ENERGEN CHOCOLATE VANILLA BAG 8 X 30 X 40G",
      product: "ENERGEN",
      skuCode: "328496",
    },
    {
      SKUDescription: "ENERGEN CHAMPION NBA HANGER 24 X 10 X 35G",
      product: "CHAMPION",
      skuCode: "325945",
    },
    {
      SKUDescription: "ENERGEN PADESAL MATE 24 X 10 X 30G",
      product: "EPM",
      skuCode: "325920",
    },
    {
      SKUDescription: "ENERGEN CHAMPION 12 X 10 X 2 X 35G PH",
      product: "CHAMPION",
      skuCode: "325944",
    },
    {
      SKUDescription: "KOPIKO CAFE MOCHA TP 12 X 10 X (2 X 25.5G) PH",
      product: "CAFÉ MOCHA",
      skuCode: "324149",
    },
    {
      SKUDescription: "ENERGEN CHAMPION NBA TP 15 X 8 X 2 X 30G PH",
      product: "CHAMPION",
      skuCode: "325965",
    },
    {
      SKUDescription:
        "BLACK 420011 KOPIKO BLACK 3IN1 TWINPACK 12 X 10 X 2 X 28G",
      product: "BLACK",
      skuCode: "420011",
    },
  ],
  V3: [
    {
      SKUDescription: "LE MINERALE 24x330ML",
      product: "WATER",
      skuCode: "328566",
    },
    {
      SKUDescription: "LE MINERALE 24x600ML",
      product: "WATER",
      skuCode: "328565",
    },
    {
      SKUDescription: "LE MINERALE 12x1500ML",
      product: "WATER",
      skuCode: "326770",
    },
    {
      SKUDescription: "LE MINERALE 4 X 5000ML",
      product: "WATER",
      skuCode: "324045",
    },
    {
      SKUDescription: "KOPIKO LUCKY DAY 24BTL X 180ML",
      product: "KLD",
      skuCode: "324046",
    },
  ],
};

export default function OUTLET() {
  const [branches, setBranches] = React.useState([
    "PUREGOLD PRICE CLUB - LA TRINIDAD BENGUET ",
    "PUREGOLD PRICE CLUB - BAGUIO ",
    "PUREGOLD PRICE CLUB - LAOAG ",
    "PUREGOLD PRICE CLUB (JR.)- OLD CENTRO ",
    "PUREGOLD PRICE CLUB - CONCEPCION TARLAC ",
    "PUREGOLD PRICE CLUB - CABANATUAN ",
    "PUREGOLD PRICE CLUB - ZARAGOZA ",
    "PUREGOLD PRICE CLUB - GAPAN ",
    "PUREGOLD PRICE CLUB - CAPAS ",
    "PUREGOLD PRICE CLUB - CAUAYAN ISABELA ",
    "PUREGOLD PRICE CLUB (JR.)- PALM PLAZA ",
    "PUREGOLD PRICE CLUB - PANIQUI ",
    "PUREGOLD PRICE CLUB - PUBLIC MARKET ",
    "PUREGOLD PRICE CLUB - ROXAS ISABELA ",
    "PUREGOLD PRICE CLUB - BALER (N.E) ",
    "PUREGOLD PRICE CLUB - MARIA AURORA ",
    "ROBINSONS EASYMART - BALER ",
    "PUREGOLD PRICE CLUB - TUMAUINI ",
    "PUREGOLD PRICE CLUB (EXTRA.)- TUGUEGARAO ",
    "ROBINSONS TUGUEGARAO ",
    "PUREGOLD PRICE CLUB - CENTRO SANTIAGO ",
    "PUREGOLD PRICE CLUB - VICTORY NORTE SANTIAGO (N.E) ",
    "PUREGOLD PRICE CLUB - VIGAN ",
    "PUREGOLD PRICE CLUB - BURNHAM PARK ",
    "PUREGOLD PRICE CLUB (JR.)- BAKAKENG ",
    "PUREGOLD PRICE CLUB - LA UNION ",
    "PUREGOLD PRICE CLUB - BACNOTAN ",
    "PUREGOLD PRICE CLUB - CALASIAO ",
    "PUREGOLD PRICE CLUB - MANAOAG ",
    "PUREGOLD PRICE CLUB (JR.)- BONUAN ",
    "PUREGOLD PRICE CLUB - MAYOMBO ",
    "PUREGOLD PRICE CLUB (JR.)- BAYAMBANG ",
    "PUREGOLD PRICE CLUB - VILLASIS ",
    "PUREGOLD PRICE CLUB - CROSSING (N.E) ",
    "PUREGOLD PRICE CLUB - SAN JOSE NUEVA ECIJA (N.E) ",
    "PUREGOLD PRICE CLUB - ZULUETA (N.E) ",
    "PUREGOLD PRICE CLUB - CABANATUAN PALENGKE (N.E) ",
    "PUREGOLD PRICE CLUB - PACIFIC MALL (N.E) ",
    "PUREGOLD PRICE CLUB - CIRCUMFERENCIAL (N.E) ",
    "PUREGOLD PRICE CLUB - TALAVERA ",
    "PUREGOLD PRICE CLUB - GUIMBA ",
  ]);

  const [open, setOpen] = React.useState(false);
  const [selectedBranch, setSelectedBranch] = React.useState();
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedSKU, setSelectedSKU] = React.useState(null);
  const [dropdownValue, setDropdownValue] = React.useState("");
  const [dateFilter, setDateFilter] = React.useState(null);
  const [selectedSKUs, setSelectedSKUs] = React.useState([]);
  const [disabledSKUs, setDisabledSKUs] = React.useState([]);
  const [highlightedSKUs, setHighlightedSKUs] = React.useState([]);
  const [openSavedSkusModal, setOpenSavedSkusModal] = React.useState(false);
  const [savedSkus, setSavedSkus] = React.useState([]);
  const [selectAll, setSelectAll] = React.useState(false);
  const [openSecondaryModal, setOpenSecondaryModal] = React.useState(false);
  const [selectedSku, setSelectedSku] = React.useState('');
  const [openStatusModal, setOpenStatusModal] = React.useState(false);
const [statusCategory, setStatusCategory] = React.useState("");
const [status, setStatus] = React.useState("");
const [statusSKU, setStatusSKU] = React.useState(null);

const handleOpenStatusModal = (row) => {
  setSelectedBranch(row.branchName); // Set the branch from the row data
  setStatusCategory(""); // Reset the category
  setStatus(""); // Reset the status
  setStatusSKU(null); // Reset SKU
  setOpenStatusModal(true);
};

// Handler to close the new status modal
const handleCloseStatusModal = () => {
  setOpenStatusModal(false);
};

// Handle category change in the status modal
const handleStatusCategoryChange = (event) => {
  setStatusCategory(event.target.value);
  setStatusSKU(null); // Reset SKU when category changes
};

// Handle status change
const handleStatusChange = (event) => {
  setStatus(event.target.value);
};

// Handle SKU change in the status modal
const handleStatusSKUChange = (event) => {
  setStatusSKU(event.target.value);
};
  


  const handleOpenSecondaryModal = () => {
    setOpenSecondaryModal(true);
  };

  const handleCloseSecondaryModal = () => {
    setOpenSecondaryModal(false);
  };


  const handleSkuChange = (event) => {
    setSelectedSku(event.target.value);
  };


  const handleOpen = (branch, category) => {
    setSelectedCategory(category);
    setSelectedBranch(branch);
    setSelectedCategory("");
    setSelectedSKU(null);
    setSelectAll(false); // Reset select all to false when opening the modal
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedSKUs([]); // Clear the selected SKUs
    setOpen(false); // Close the modal
  };

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
    setSelectedSKU(skus[event.target.value]?.[0] || null);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSKU(null);
  };

  const columns = [
    { field: "id", headerName: "#", width: 75 },
    {
      field: "branchName",
      headerName: "ACCOUNT BRANCH",
      width: 600,
      headerClassName: "bold-header",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleOpen(params.row.branchName)}
        >
          View
        </Button>
      ),
    },
    {
      field: "saveSkus",
      headerName: "SKU Description",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleOpenSavedSkus(params.row.branchName, 'V1')}
        >
          V1
        </Button>
      ),
    },
    {
      field: "saveSkus2",
      headerName: "SKU Description",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleOpenSavedSkus(params.row.branchName, 'V2')}
        >
          V2
        </Button>
      ),
    },
    {
      field: "saveSkus3",
      headerName: "SKU Description",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleOpenSavedSkus(params.row.branchName, "V3")}
        >
          V3
        </Button>
      ),
    },
    {
      field: "STATUS",
      headerName: "SKU STATUS",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleOpenStatusModal(params.row)}
        >
          STATUS
        </Button>
      ),
    }
  ];

  const rows = branches.map((branch, index) => ({
    id: index + 1,
    branchName: branch,
  }));

  const handleOpenSavedSkus = async (branch, category) => {
    // Reset the saved SKUs before fetching new ones
    setSavedSkus({});
    setSelectedCategory(category);
    // Set the selected branch
    setSelectedBranch(branch);

    try {
      // Fetch the saved SKUs for the selected branch
      const response = await fetch(
        `http://192.168.50.55:8080/get-skus?accountNameBranchManning=${encodeURIComponent(
          branch
        )}`
      );
      const data = await response.json();

      if (response.ok) {
        // Update the saved SKUs state with the data fetched for this branch
        setSavedSkus(data || {});
      } else {
        console.error("Failed to fetch saved SKUs:", data.message);
      }
    } catch (error) {
      console.error("Error fetching saved SKUs:", error);
    }

    // Open the modal to show the SKUs
    setOpenSavedSkusModal(true);
  };

  const handleCloseSavedSkusModal = () => setOpenSavedSkusModal(false);

  const handleSave = async () => {
    handleClose();
    setSelectedSKUs([]);
    try {
      if (!selectedSKUs || selectedSKUs.length === 0) {
        console.warn("No SKUs selected for saving.");
        return;
      }

      const skusToSave = selectedSKUs.map((sku) => ({
        SKUDescription: sku.SKUDescription || "Unknown SKU",
        enabled: true, // or the appropriate value
      }));

      const response = await fetch(
        "http://192.168.50.55:8080/save-branch-sku",
        {
          method: "POST",
          body: JSON.stringify({
            accountNameBranchManning: selectedBranch,
            category: selectedCategory,
            skus: skusToSave,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received response:", data);

      if (data.data && data.data.length === 0) {
        console.error("No documents were inserted");
      } else {
        console.log("BranchSKUs saved successfully:", data);
        handleClose(); // Close the modal after successful save
        // Optionally, update the dropdown with saved SKUs here
      }
    } catch (error) {
      console.error("Error saving BranchSKUs:", error);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  };

  const handleToggleSelectAll = () => {
    if (selectAll) {
      // Deselect all
      setSelectedSKUs([]);
      setSelectAll(false);
    } else {
      // Select all
      setSelectedSKUs(skus[selectedCategory] || []);
      setSelectAll(true);
    }
  };

  const handleAutocompleteChange = (event, newValue) => {
    setSelectedSKUs(newValue);
    setSelectAll(newValue.length === (skus[selectedCategory] || []).length);
  };

  const handleNotCarried = async () => {
    if (!selectedCategory || !selectedSku || !selectedBranch) {
      // Handle case where no category or SKU is selected
      alert('Please select a category and SKU first.');
      return;
    }
  
    try {
      const response = await fetch('http://192.168.50.55:8080/disable-sku', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          branch: selectedBranch, // Replace with the actual branch identifier
          category: selectedCategory,
          skuDescription: selectedSku,
          enabled: false, // Set SKU as disabled
          status: 'Not Carried', // Add a status tag
        }),
      });
  
      if (response.ok) {
        alert('SKU has been disabled.');
        handleCloseSecondaryModal(); // Close modal on success
      } else {
        alert('Failed to disable SKU.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while disabling the SKU.');
    }
  };

  const handleCarried = async () => {
    if (!selectedCategory || !selectedSku) {
      alert('Please select a category and SKU first.');
      return;
    }
  
    try {
      const response = await fetch('http://192.168.50.55:8080/enable-sku', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          branch: selectedBranch,
          category: selectedCategory,
          skuDescription: selectedSku,
          enabled: true, // Set SKU as enabled
        }),
      });
  
      if (response.ok) {
        alert('SKU has been marked as Carried.');
        await handleOpenSavedSkus(selectedBranch, selectedCategory); // Refresh SKUs
        handleCloseSecondaryModal(); // Close modal on success
      } else {
        alert('Failed to mark SKU as Carried.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while marking the SKU as Carried.');
    }
  };


  const handleDelisted = async () => {
    if (!selectedCategory || !selectedSku) {
      alert('Please select a category and SKU first.');
      return;
    }
  
    try {
      const response = await fetch('http://192.168.50.55:8080/delisted-sku', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          branch: selectedBranch, // Use the selected branch state
          category: selectedCategory,
          skuDescription: selectedSku,
          enabled: false, // Set SKU as disabled
          status: 'Delisted', // Add a status tag
        }),
      });
  
      if (response.ok) {
        alert('SKU has been marked as Delisted.');
        await handleOpenSavedSkus(selectedBranch, selectedCategory); // Refresh SKUs
        handleCloseSecondaryModal(); // Close modal on success
      } else {
        alert('Failed to mark SKU as Delisted.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while marking the SKU as Delisted.');
    }
  };

  const handleSaveStatus = async () => {
    if (!selectedCategory || !status || !selectedSku) {
      alert('Please select category, status, and SKU.');
      return;
    }
  
    try {
      const response = await fetch('http://192.168.50.55:8080/update-sku-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          branch: selectedBranch,
          category: selectedCategory,
          status: status,
          skuDescription: selectedSku,
        }),
      });
  
      if (response.ok) {
        alert('SKU status updated successfully.');
        handleCloseStatusModal();
      } else {
        alert('Failed to update SKU status.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating SKU status.');
    }
  };

  return (
    <div className="attendance">
      <Topbar />
      <div className="container">
        <Sidebar />
        <div style={{ height: "100%", width: "85%", marginLeft: "100" }}>
          <Stack
            direction={{ xs: "column", md: "row", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            sx={{ marginBottom: "20px" }}
          >
            <div className="MuiStack-root">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  onChange={(newValue) => setDateFilter(newValue)}
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
            </div>
          </Stack>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            slots={{
              toolbar: GridToolbar,
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                printOptions: { disableToolbarButton: true },
              },
            }}
            disableColumnFilter
            disableColumnSelector
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10, 20, 30]}
            getRowId={(row) => row.id}
          />
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, width: 1500 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedBranch}
            </Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="category-select-label">
                Select Category
              </InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={selectedCategory}
                label="Select Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="V1">V1</MenuItem>
                <MenuItem value="V2">V2</MenuItem>
                <MenuItem value="V3">V3</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <Autocomplete
                multiple
                disableCloseOnSelect
                getOptionLabel={(option) => option.SKUDescription || ""}
                value={selectedSKUs}
                onChange={handleAutocompleteChange}
                renderInput={(params) => (
                  <TextField {...params} label="Select SKU(s)" />
                )}
                options={skus[selectedCategory] || []}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={<span />}
                      checkedIcon={<span />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.SKUDescription}
                  </li>
                )}
              />
            </FormControl>

            {selectedSKUs && selectedSKUs.length > 0 && (
              <Box sx={{ marginTop: 2 }}>
                {selectedSKUs.map((sku, index) => (
                  <div key={index}>
                    {/* Optionally display additional SKU details here */}
                  </div>
                ))}
              </Box>
            )}

            <Button
              variant="contained"
              onClick={handleToggleSelectAll}
              sx={{ mt: 2 }} // Ensure consistent margin
            >
              {selectAll ? "Deselect All" : "Select All"}
            </Button>

            <Box sx={{ marginTop: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Box>
          </Box>
        </Modal>

        <Modal
  open={openSavedSkusModal}
  onClose={() => setOpenSavedSkusModal(false)}
  aria-labelledby="saved-skus-modal-title"
  aria-describedby="saved-skus-modal-description"
>
  <Box sx={{ ...style, width: 1000 }}>
    <Typography id="saved-skus-modal-title" variant="h6" component="h2">
      Saved SKUs for {selectedBranch} - Category: {selectedCategory}
    </Typography>
    {Object.keys(savedSkus).length > 0 ? (
      Object.entries(savedSkus).map(([category, skus], index) => (
        category === selectedCategory && (
          <Box key={index} sx={{ marginTop: 2 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{ fontSize: "0.75rem" }}
            >
              Category: {category}
            </Typography>
            {skus.map((skuArray, idx) =>
              skuArray.map((sku, skuIdx) => (
                <Typography
                  key={skuIdx}
                  variant="body1"
                  sx={{ fontSize: "0.60rem" }}
                >
                  <strong>SKU Description:</strong> {sku.SKUDescription}
                </Typography>
              ))
            )}
          </Box>
        )
      ))
    ) : (
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        No SKUs saved for this branch in this category.
      </Typography>
    )}
    <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenSavedSkusModal(false)}
      >
        Close
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpenSecondaryModal}
      >
        Open Secondary Modal
      </Button>
    </Box>
  </Box>
</Modal>

      {/* Secondary Modal */}
    <Modal
  open={openSecondaryModal}
  onClose={handleCloseSecondaryModal}
  aria-labelledby="secondary-modal-title"
  aria-describedby="secondary-modal-description"
>
  <Box sx={{ ...style, width: 500 }}>
    <Typography id="secondary-modal-title" variant="h6" component="h2">
      Select Category and SKU
    </Typography>
    <FormControl fullWidth sx={{ marginTop: 2 }}>
      <InputLabel>Category</InputLabel>
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        {/* Replace these with your actual categories */}
        <MenuItem value="V1">V1</MenuItem>
        <MenuItem value="V2">V2</MenuItem>
        <MenuItem value="V3">V3</MenuItem>
      </Select>
    </FormControl>
    <FormControl fullWidth sx={{ marginTop: 2 }}>
      <InputLabel>SKU</InputLabel>
      <Select
        value={selectedSku}
        onChange={handleSkuChange}
        disabled={!selectedCategory} // Disable until a category is selected
      >
        {selectedCategory && savedSkus[selectedCategory] && savedSkus[selectedCategory].length > 0 ? (
          savedSkus[selectedCategory].map((skuArray, idx) =>
            skuArray.map((sku, skuIdx) => (
              <MenuItem key={skuIdx} value={sku.SKUDescription}>
                {sku.SKUDescription}
              </MenuItem>
            ))
          )
        ) : (
          <MenuItem value="" disabled>
            No SKUs available
          </MenuItem>
        )}
      </Select>
    </FormControl>
    <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCloseSecondaryModal}
      >
        Close
      </Button>
      <Button
  variant="contained"
  color="warning"
  sx={{ backgroundColor: 'warning', color: 'white' }}
  onClick={handleNotCarried}
>
  Not Carried
</Button>
      <Button
        variant="contained"
        color="error"
        sx={{ backgroundColor: 'error', color: 'white' }}
        onClick={handleDelisted}
      >
        Delisted
      </Button>
    
    </Box>
  </Box>
</Modal>

<Modal
  open={openStatusModal}
  onClose={handleCloseStatusModal}
  aria-labelledby="status-modal-title"
  aria-describedby="status-modal-description"
>
  <Box sx={{ ...style, width: 500 }}>
    <Typography id="status-modal-title" variant="h6" component="h2">
      Update SKU Status for {selectedBranch}
    </Typography>
    <FormControl fullWidth sx={{ marginTop: 2 }}>
      <InputLabel>Category</InputLabel>
      <Select
        value={statusCategory}
        onChange={handleStatusCategoryChange}
      >
        <MenuItem value="V1">V1</MenuItem>
        <MenuItem value="V2">V2</MenuItem>
        <MenuItem value="V3">V3</MenuItem>
      </Select>
    </FormControl>
    <FormControl fullWidth sx={{ marginTop: 2 }}>
      <InputLabel>Status</InputLabel>
      <Select
        value={status}
        onChange={handleStatusChange}
      >
        <MenuItem value="Not Carried">Not Carried</MenuItem>
        <MenuItem value="Delisted">Delisted</MenuItem>
      </Select>
    </FormControl>
    <FormControl fullWidth sx={{ marginTop: 2 }}>
      <InputLabel>SKU</InputLabel>
      <Select
        value={statusSKU}
        onChange={handleStatusSKUChange}
        disabled={!statusCategory} // Disable until a category is selected
      >
        {statusCategory && savedSkus[statusCategory] && savedSkus[statusCategory].length > 0 ? (
          savedSkus[statusCategory].flat().map((sku, idx) => (
            <MenuItem key={idx} value={sku.SKUDescription}>
              {sku.SKUDescription}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            No SKUs available
          </MenuItem>
        )}
      </Select>
    </FormControl>
    <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveStatus}
      >
        Save
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCloseStatusModal}
      >
        Close
      </Button>
    </Box>
  </Box>
</Modal>


      </div>
    </div>
  );
}
