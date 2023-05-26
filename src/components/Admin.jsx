import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetAdminQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "./Header";
import CustomColumnMenu from "./CustomColumnMenu.jsx";

function Admin() {
  const { data, isLoading } = useGetAdminQuery();
  const theme = useTheme();
  const columns = [
    { field: "_id", headerName: "ID", flex: 0.8 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "phoneNumber",
      headerName: "phone",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    { field: "country", headerName: "Country", flex: 0.3 },
    { field: "occupation", headerName: "Occupation", flex: 0.7 },
    { field: "role", headerName: "Roles", flex: 0.3 },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Admin" subTitle="list of administrator-role users" />
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
          rows={data || []}
          columns={columns}
          getRowId={(row) => row._id}
          components={{ ColumnMenu: CustomColumnMenu }}
        />
      </Box>
    </Box>
  );
}

export default Admin;
