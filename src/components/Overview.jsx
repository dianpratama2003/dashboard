import React, { useState } from "react";
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import Header from "./Header";
import OverviewChart from "./OverviewChart.jsx";
import { Form } from "react-router-dom";

function Overview() {
  const [view, setView] = useState("units");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Overview" subTitle="Trends of Sales/Units" />
      <Box height="75vh">
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="Views"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
  );
}

export default Overview;
