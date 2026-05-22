import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

// Definição das props
interface NavbarProps {
  logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ logout }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "";

  //useEffect(() => {console.log("Role atual no localStorage:", role);}, [role]);

  const handleLogout = () => {
    logout();              // chama o hook para limpar o token
    navigate("/login");    // redireciona para login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">GRPront</Link>

        {/* Botão hamburguer para telas pequenas */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links de navegação */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>

            {/* Dropdown Cadastro */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="cadastroDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Cadastro
              </Link>
              <ul className="dropdown-menu" aria-labelledby="cadastroDropdown">
                {role.toLowerCase() === "admin" && (
                  <li><Link className="dropdown-item" to="/users">Usuários</Link></li>
                )}
                <li><Link className="dropdown-item" to="/insurancePlans">Convênios</Link></li>
                <li><Link className="dropdown-item" to="/medicine">Medicamentos</Link></li>
                <li><Link className="dropdown-item" to="/dosageUnit">Unidade de dosagem</Link></li>
              </ul>
            </li>

            <li className="nav-item"><Link className="nav-link" to="/patients">Pacientes</Link></li>
            {(role === "Admin" || role === "Manager") && (
              <li className="nav-item"><Link className="nav-link" to="/reports">Relatórios</Link></li>
            )}

            <li className="nav-item" onClick={handleLogout}>
              <button className="nav-link btn btn-link" >Sair</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
