import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/AuthContext";
import LoadingOverlay from "./components/LoadingOverlay";
import PrivateRoute from "./hooks/PrivateRoute";

// Páginas
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import Users from "./pages/Users.tsx";
import NewUser from "./pages/NewUser.tsx";
import User from "./pages/User.tsx";
import Patients from "./pages/Patients.tsx";
import InsurancePlan from "./pages/InsurancePlan.tsx";
import Medicine from "./pages/Medicine.tsx";
import DosageUnit from "./pages/DosageUnit.tsx";
import Report from "./pages/Reports.tsx";

// Navbar
import Navbar from "./components/Navbar";

function AppContent() {
  const { isAuthenticated, logout, loadingAuth } = useAuth();

  if (loadingAuth) {
    return <LoadingOverlay message="Validando sessão..." />;
  }

  return (
    <Router>
      {/* Navbar só aparece se estiver autenticado */}
      {isAuthenticated && <Navbar logout={logout} />}

      <Routes>
        <Route path="/login"            element={<Login />} />
        <Route path="/"                 element={<PrivateRoute element={<Home />} />} />
        <Route path="/home"             element={<PrivateRoute element={<Home />} />} />
        <Route path="/users"            element={<PrivateRoute element={<Users />} allowedRoles={["Admin"]} />}/>
        <Route path="/users/newUser"    element={<PrivateRoute element={<NewUser />} allowedRoles={["Admin"]} />}/>
        <Route path="/users/user/:id"   element={<PrivateRoute element={<User />} allowedRoles={["Admin"]} />}/>
        <Route path="/reports"          element={<PrivateRoute element={<Report />} allowedRoles={["Admin", "Manager"]} />}/>

        <Route path="/patients"         element={<PrivateRoute element={<Patients />} />} />
        <Route path="/insurancePlans"   element={<PrivateRoute element={<InsurancePlan />} />} />
        <Route path="/medicine"         element={<PrivateRoute element={<Medicine />} />} />
        <Route path="/dosageUnit"       element={<PrivateRoute element={<DosageUnit />} />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
