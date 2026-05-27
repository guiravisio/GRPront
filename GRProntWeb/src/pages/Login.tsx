import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext"; // hook de autenticação
import { useLoading } from "../hooks/useLoading"; // hook de loading
//import "./Login.css"; // CSS específico para estilizar a tela
import { toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { showLoading, hideLoading, LoadingComponent } = useLoading();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    showLoading("Entrando no sistema...");
    const result = await login(username, password);
    hideLoading();
  
    if (result.success) {
      navigate("/home");
    } else if (result.mustChangePassword) {
      navigate(`/reset-password/${result.userId}`);
    } else {
      toast.error("Usuário ou senha incorretos.");
    }
  };
  

  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      {LoadingComponent}
      <div className="login-card p-4 shadow">
        <h2 className="project-title">GRPront</h2>
        <h4 className="text-center mb-4">Entre com sua conta</h4>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label>Usuário</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Senha</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </span>
            </div>
          </div>

          <button className="btn btn-entrar w-100" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
