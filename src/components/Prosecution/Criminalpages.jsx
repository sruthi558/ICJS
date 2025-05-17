import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Prosecution from "./Prosecution";
import ProsecutionPDF from "../../assets/Summary_Report_Final.pdf";
import Home from "./Home";
import Carousel from "./Carousel";

import axiosInstance from "../../utils/axiosInstance";

function CustomTabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CriminalPages() {
  const [value, setValue] = React.useState(0);
  const [key, setKey] = useState("home");
  const [prosecutiondata, setData] = useState(null);

  const token =
    localStorage.getItem("token") || import.meta.env.VITE_REACT_APP_TOKEN;

  const fetchData = async () => {
    console.log("Fetching prosecution data...");

    try {
      // const response = await fetch(
      //   "http://localhost:5555/api/fetchprosecutiondata",
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      const response = await axiosInstance.get("/fetchprosecutiondata");

      console.log("Received data:", response.data.prosecutiondata);
      setData(response.data.prosecutiondata);
    } catch (error) {
      console.error("Error:", error);
      console.log(
        "An error occurred while fetching the data. Please try again."
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tabData = [
    {
      label: "Home",
      component: (
        <Home prosecutiondata={prosecutiondata} fetchData={fetchData} />
      ),
    },
    { label: "Prosecution", component: <Prosecution /> },
    // { label: "Glimpses of Training Session", component: <Carousel /> },
  ];

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  const [rloading,setRloading]=useState(false)

  const handleDownload = () => {
    setRloading(true)
    const link = document.createElement("a");
    link.href = ProsecutionPDF;
    link.download = "Prosecutor_Statistics.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setRloading(false)

  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "1rem",
        fontFamily: "Work Sans",
        backgroundColor: "#f4f4f4",
        marginTop: "0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: 0,
          borderColor: "#dbdfed",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          sx={{
            "& .MuiTab-root": {
              minWidth: "auto",
              margin: "0px 10px",
              padding: "0px",
              fontWeight: "400",
              color: "#2A2E43",
            },
            "& .Mui-selected": {
              color: "rgba(43, 47, 67, 1) !important",
              padding: "0px",
              fontWeight: "bold",
            },
            "& .MuiTabs-indicator": {
              borderBottom: "2px",
              bottom: 0,
              backgroundColor: "#2A2E43",
              height: "5px",
              boxShadow: "0px 3.17px 25.33px 0px #0000001F",
              transform: "translateY(50%)",
            },
            marginLeft: "-10px",
            fontFamily: "Work Sans",
          }}
          className="tab_names"
          aria-label="navigation tabs"
        >
          {tabData.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              {...a11yProps(index)}
              sx={{
                fontSize: "14px",
                textTransform: "none",
                fontFamily: "Work Sans",
                color: "#8B8A8A !important",
              }}
            />
          ))}
        </Tabs>

        {/* Show Export Button only in Home Tab */}
        {value === 0 && (
          <Button
            variant="contained"
            onClick={handleDownload}
            sx={{
              backgroundColor: "transparent",
              color: "#65558F",
              minWidth:'80px',
              border: "2px solid #65558F",
              padding: "5px 9px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#65558F",
                color: "white",
              },
            }}
          >
          {!rloading ? 'Export' : <><span className="spinner-border spinner-border-sm me-2"></span></>}
          </Button>
        )}

      </Box>

      {tabData.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.component}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
