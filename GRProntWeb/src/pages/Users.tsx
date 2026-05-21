import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

interface User {
  id: number;
  fullName: string;
  userName: string;
  email: string;
  role: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 20;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/Users");
        console.log("Usuários recebidos:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.userName.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toString().includes(search)
  );

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Usuários</h2>

      {/* Pesquisa + botão de cadastro */}
      <div className="row mb-3 align-items-center">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Pesquisar por nome ou ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <Link
            to="/users/newUser"
            className="btn btn-success"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Cadastrar novo usuário"
          >
            <i className="bi bi-person-plus"></i>
          </Link>
        </div>
      </div>

      {/* Tabela elegante */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Nome</th>
              <th className="d-none d-md-table-cell">Nome de Usuário</th>
              <th>Perfil</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="fw-semibold">{user.fullName}</div>
                  <div className="text-muted small">{user.email}</div>
                </td>
                <td className="d-none d-md-table-cell">{user.userName}</td>
                <td>{user.role}</td>
                <td className="text-center">
                  <Link
                    to={`/users/user/${user.id}`}
                    className="btn btn-sm btn-outline-primary me-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Editar usuário"
                  >
                    <i className="bi bi-pencil"></i>
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => console.log("Excluir", user.id)}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Excluir usuário"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Users;
