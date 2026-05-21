import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "./Login.css"; // reaproveita o mesmo CSS da tela de login

export default function ResetPassword() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    await api.put(`/Users/${id}/set-password`, { newPassword });

    alert("Senha redefinida com sucesso. Faça login novamente.");
    navigate("/login");
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      <div className="login-card p-4 shadow">
        <h2 className="project-title">GRPront</h2>
        <h4 className="text-center mb-4">Redefinir senha</h4>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Nova senha</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
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

          <div className="form-group mb-3">
            <label>Confirmar nova senha</label>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </span>
            </div>
          </div>

          <button className="btn btn-entrar w-100" type="submit">
            Redefinir senha
          </button>
        </form>
      </div>
    </div>
  );
}
