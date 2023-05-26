import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { themeSettings } from "styles/theme";
import { selectMode } from "state";
import { useMemo } from "react";
import "./styles/App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
  Route,
} from "react-router-dom";

import Dashboard from "./components/dashboard";
import Layout from "./components/layout";
import Products from "./components/products.jsx";
import Customers from "./components/Customers.jsx";
import Transactions from "./components/Transactions.jsx";
import Geo from "./components/Geo.jsx";
import Overview from "./components/Overview.jsx";
import Daily from "components/Daily.jsx";
import Monthly from "components/Monthly";
import Breakdown from "components/Breakdown.jsx";
import Admin from "components/Admin.jsx";
import Performance from "components/Performance.jsx";

function App() {
  const mode = useSelector(selectMode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/geo" element={<Geo />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/Daily" element={<Daily />} />
        <Route path="/Monthly" element={<Monthly />} />
        <Route path="/Breakdown" element={<Breakdown />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/performance" element={<Performance />} />
      </Route>
    )
  );

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
