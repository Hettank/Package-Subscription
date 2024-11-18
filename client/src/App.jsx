import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Packages from "./pages/Packages";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PackageDetails from "./pages/PackageDetails";
import ProtectedRoutes from "./components/ProtectedRoutes";
import CreatePackage from "./pages/CreatePackage";
import UpdatePackage from "./pages/UpdatePackage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="packages" element={<Packages />} />
              <Route path="package-details" element={<PackageDetails />} />
              <Route path="create-package" element={<CreatePackage />} />
              <Route path="update-package" element={<UpdatePackage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
