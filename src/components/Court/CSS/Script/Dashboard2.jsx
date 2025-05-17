
import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CourtTab1 from './CourtTab1';
import CourtTab2 from './CourtTab2';
import CourtTab3 from './CourtTab3';
import CourtTab4 from './CourtTab4';
import CourtTab5 from './CourtTab5';



const tabData = [
  { label: 'ICJS Case Processing', component: <CourtTab1 /> },
  { label: 'eSummons & Digital Records', component: <CourtTab2 /> },
  { label: 'Video Hearings & Disposal Rate', component: <CourtTab3 /> },
  { label: 'Prosecution & Forensics Integration', component: <CourtTab4 /> },
  { label: 'NYAYSHRUTI Implementation', component: <CourtTab5 /> },
];


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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Dashboard2() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    console.log('new value',newValue)
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', padding: '1rem',fontFamily:"Work Sans",backgroundColor:"#f4f4f4"}}>
      <Box sx={{ borderBottom: 0, borderColor: '#dbdfed' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          sx={{
            "& .MuiTab-root": {
              minWidth: 'auto',
              margin: '0px 10px',
              padding: '0px',
              fontWeight: '400',
              color: '#2A2E43',
            },
            "& .Mui-selected": {
              color: 'rgba(43, 47, 67, 1) !important',
              padding: '0px',
              fontWeight: 'bold',
            },
            "& .MuiTabs-indicator": {
              borderBottom: '2px',
              bottom: 0,
              backgroundColor: '#2A2E43',
              height: '5px',
              boxShadow: '0px 3.17px 25.33px 0px #0000001F',
              transform: 'translateY(50%)',
            },
            marginLeft: '-10px',
            fontFamily:"Work Sans",
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
                fontSize: '14px',
                textTransform: 'none',
                fontFamily: 'Work Sans',
                color: '#8B8A8A !important',
              }}
            />
          ))}
        </Tabs>
      </Box>
      {tabData.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.component}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
