import React from "react";
import { useGetDashboardQuery } from "state/api";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";

import {
  Box,
  useTheme,
  useMediaQuery,
  Button,
  Typography,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import StatBox from "components/StatBox.jsx";

const columns = [
  { field: "_id", headerName: "ID", flex: 0.8 },
  { field: "userId", headerName: "User", flex: 0.5 },
  { field: "createdAt", headerName: "Created At", flex: 1 },
  {
    field: "products",
    headerName: "# of products",
    flex: 0.5,
    sortable: false,
    renderCell: (params) => params.value.length,
  },
  {
    field: "cost",
    headerName: "Cost",
    flex: 0.5,
    renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
  },
];

function Dashboard() {
  const { data, isLoading } = useGetDashboardQuery();
  const theme = useTheme();
  const isNonMediumScreen = useMediaQuery("(min-width:1200px)");

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Dashboard" subTitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10 px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12,1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreen ? undefined : "span 12" },
        }}
      >
        <StatBox
          title="Total Customer"
          value={data && data.totalCustomers}
          increase="+14%"
          description="since last month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
            />
          }
        />
        <StatBox
          title="Sales Today"
          value={data && data.todayStat.totalSales}
          increase="+21%"
          description="since last month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="Sales" isDashboardView />
        </Box>
        <StatBox
          title="Monthly Sales"
          value={data && data.thisMonthStat.totalSales}
          increase="+5%"
          description="since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
            />
          }
        />
        <StatBox
          title="Yearly Sales"
          value={data && data.yearlySalesTotal}
          increase="+43%"
          description="since last year"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": { border: "none", borderRadius: "5rem" },
            "& .MuiDataGrid-cell": { borderBottom: "none" },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            density="compact"
            rows={(data && data.transactions) || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.5rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard />
          <Typography
            p="0 0.6rem"
            fontSize="0.rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of information via category revenue made this year sales
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
