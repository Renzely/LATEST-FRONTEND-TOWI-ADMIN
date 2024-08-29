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

  const handleOpen = (branch) => {
    setSelectedBranch(branch);
    setSelectedCategory("");
    setSelectedSKU(null);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

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
  ];

  const rows = branches.map((branch, index) => ({
    id: index + 1,
    branchName: branch,
  }));

  const handleSave = async () => {
    try {
      const response = await fetch(
        "http://192.168.50.55:8080/save-branch-sku",
        {
          method: "POST",
          body: JSON.stringify({
            accountNameBranchManning: selectedBranch,
            category: selectedCategory,
            skus: selectedSKU.map((sku) => ({
              SKUDescription: sku.SKUDescription || "Unknown SKU",
              enabled: true, // or the appropriate value
            })),
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
      }
    } catch (error) {
      console.error("Error saving BranchSKUs:", error);
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
    options={skus[selectedCategory] || []}
    disableCloseOnSelect
    getOptionLabel={(option) => (
      <span style={{ fontWeight: 'bold' }}>
        {option.SKUDescription}
        {selectedSKUs.includes(option.SKUDescription) && (
          <span style={{ color: 'red', marginLeft: '5px' }}>✓</span>
        )}
      </span>
    )}
    value={selectedSKU || []}
    onChange={(event, newValue) => setSelectedSKU(newValue)}
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
    renderInput={(params) => (
      <TextField
        {...params}
        label="Select SKU(s)"
        placeholder="Search SKU"
      />
    )}
  />
</FormControl>


            {selectedSKU && selectedSKU.length > 0 && (
              <Box sx={{ marginTop: 2 }}>
                {selectedSKU.map((sku, index) => (
                  <div key={index}>
                    {/* <Typography variant="body1">
                      <strong>SKU Description:</strong> {sku.SKUDescription}
                    </Typography> */}
                    {/* <Typography variant="body1">
                      <strong>Product:</strong> {sku.product}
                    </Typography>
                    <Typography variant="body1">
                      <strong>SKU Code:</strong> {sku.skuCode}
                    </Typography> */}
                  </div>
                ))}
              </Box>
            )}

            <Box sx={{ marginTop: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
}