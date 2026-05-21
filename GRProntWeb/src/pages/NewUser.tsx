import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api"; // seu axios configurado

const NewUser: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "User", // default
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post("/Account/register", formData);
      console.log("Usuário cadastrado:", response.data);
      navigate("/users"); // redireciona para listagem
    } catch (err: any) {
      setError("Erro ao cadastrar usuário. Verifique os dados.");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Cadastrar Usuário</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">Nome de usuário</label>
          <input
            type="text"
            id="userName"
            name="userName"
            className="form-control"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">Perfil</label>
          <select
            id="role"
            name="role"
            className="form-select"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="User">Usuário</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>
    </div>
  );
};

export default NewUser;
