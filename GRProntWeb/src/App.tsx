import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/AuthContext";
import LoadingOverlay from "./components/LoadingOverlay";

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
        {/* Login sempre acessível */}
        <Route path="/login" element={<Login />} />

        {/* Rotas privadas */}
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />

        {/* Users */}
        <Route path="/users" element={isAuthenticated ? <Users /> : <Navigate to="/login" />} />
        <Route path="/users/newUser" element={isAuthenticated ? <NewUser /> : <Navigate to="/login" />} />
        <Route path="/users/user/:id" element={isAuthenticated ? <User /> : <Navigate to="/login" />} />

        {/* Patients */}
        <Route path="/patients" element={isAuthenticated ? <Patients /> : <Navigate to="/login" />} />

        {/* Outros cadastros */}
        <Route path="/insurancePlans" element={isAuthenticated ? <InsurancePlan /> : <Navigate to="/login" />} />
        <Route path="/medicine" element={isAuthenticated ? <Medicine /> : <Navigate to="/login" />} />
        <Route path="/dosageUnit" element={isAuthenticated ? <DosageUnit /> : <Navigate to="/login" />} />

        {/* Relatórios */}
        <Route path="/reports" element={isAuthenticated ? <Report /> : <Navigate to="/login" />} />
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
