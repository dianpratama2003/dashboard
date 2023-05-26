import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import BreakdownChart from "./BreakdownChart.jsx";

function Breakdown() {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Breakdown" subTitle="Sales by Category" />
      <Box mt="40px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
}

export default Breakdown;
