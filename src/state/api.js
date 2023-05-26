import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geo",
    "Sales",
    "Admin",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      provideTags: ["User"],
    }),
    getProducts: build.query({
      query: () => `client/products`,
      provideTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => `client/customers`,
      provideTags: ["Customers"],
    }),

    getGeo: build.query({
      query: () => `client/geo`,
      provideTags: ["Geo"],
    }),

    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: `client/transactions`,
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      provideTags: ["Transactions"],
    }),
    getSales: build.query({
      query: () => `sales/sales`,
      provideTags: ["Sales"],
    }),
    getAdmin: build.query({
      query: () => `management/admin`,
      provideTags: ["Admin"],
    }),
    getPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      provideTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => `general/dashboard`,
      provideTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeoQuery,
  useGetSalesQuery,
  useGetAdminQuery,
  useGetPerformanceQuery,
  useGetDashboardQuery,
} = api;
export const selectUserId = (state) => state.globalSettings.userId;
