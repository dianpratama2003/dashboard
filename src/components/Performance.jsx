import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetPerformanceQuery, selectUserId } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "./Header";
import CustomColumnMenu from "./CustomColumnMenu.jsx";
import { useSelector } from "react-redux";

function Performance() {
  const theme = useTheme();
  const userId = useSelector(selectUserId);
  const { data, isLoading } = useGetPerformanceQuery(userId);

  const columns = [
    { field: "_id", headerName: "ID", flex: 0.8 },
    { field: "userId", headerName: "User ID", flex: 0.5 },
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
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Performance"
        subTitle="Track your affilate sales Performance"
      />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
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
          rows={(data && data.sales) || []}
          columns={columns}
          getRowId={(row) => row._id}
          components={{ ColumnMenu: CustomColumnMenu }}
        />
      </Box>
    </Box>
  );
}

export default Performance;
