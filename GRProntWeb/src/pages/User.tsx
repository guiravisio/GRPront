import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api"; // ajuste conforme seu projeto

export default function User() {
  const { id } = useParams(); // se existir, é edição
  const navigate = useNavigate();
  const isCreate = !id;

  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");
  const [password, setPassword] = useState("");

  // Carregar dados se for edição
  useEffect(() => {
    if (!isCreate) {
      api.get(`/Users/${id}`).then((res) => {
        const u = res.data;
        setFullName(u.fullName);
        setUserName(u.userName);
        setEmail(u.email);
        setRole(u.role);
      });
    }
  }, [id, isCreate]);

  // Submeter formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isCreate) {
      await api.post("/Users", {
        fullName,
        userName,
        email,
        role,
        password,
      });
    } else {
      await api.put(`/Users/${id}`, {
        id,
        fullName,
        email,
        role,
      });
    }

    navigate("/users"); // volta para listagem
  };

  // Resetar senha
  const handleResetPassword = async () => {
    await api.put(`/Users/${id}/reset-password`);
    alert("Senha resetada. O usuário deverá definir uma nova senha no próximo login.");
  };

  return (
    <div className="container mt-4">
      <h2>{isCreate ? "Cadastrar Usuário" : "Editar Usuário"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome completo</label>
          <input
            type="text"
            className="form-control"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nome de usuário</label>
          <input
            type="text"
            className="form-control"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Perfil</label>
          <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="User">Usuário</option>
            <option value="Doctor">Profissional</option>
            <option value="Admin">Administrador</option>
          </select>
        </div>

        {isCreate && (
          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          {isCreate ? "Cadastrar" : "Atualizar"}
        </button>

        {!isCreate && (
          <button
            type="button"
            className="btn btn-warning ms-2"
            onClick={handleResetPassword}
          >
            Resetar senha
          </button>
        )}
      </form>
    </div>
  );
}
