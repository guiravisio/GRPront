import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";
import { isNull, normalize } from "../utils";
import { useLoading } from "../hooks/useLoading"; 

interface Patient {
  id: number;
  fullName: string;
  identificationType: string;
  identification: string;
  phoneNumber: string;
}

const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { showLoading, hideLoading, LoadingComponent } = useLoading();

  const pageSize = 20;

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        showLoading("Consultando pacientes...");
        const response = await api.get("/Patients");
        //console.log("Pacientes recebidos:", response.data);
        setPatients(response.data);
      } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
      }
      finally {
        hideLoading();
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((p) =>
    normalize(p.fullName).includes(search.toLowerCase()) ||
    normalize(p.identification).includes(search.toLowerCase()) ||
    p.id.toString().includes(search)
  );  

  const totalPages = Math.ceil(filteredPatients.length / pageSize);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container mt-4">
      {LoadingComponent}
      <h2 className="mb-4">Pacientes</h2>

      <div className="row mb-3 align-items-center">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Pesquisar por nome ou identificação"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-auto">
        <Link
            to="/patients/new"
            className="btn btn-create"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Cadastrar novo usuário"
          >
            <i className="bi bi-person-plus"></i>
          </Link>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th className="d-none d-md-table-cell">Id</th>
              <th>Nome</th>
              <th className="d-none d-md-table-cell">Identificação</th>
              <th>Telefone</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPatients.map((patient) => (
              <tr key={patient.id}>
                <td className="d-none d-md-table-cell">{patient.id}</td>
                <td>{patient.fullName}</td>
                <td className="d-none d-md-table-cell"> {isNull(patient.identification)}</td>
                <td>{isNull(patient.phoneNumber)}</td>
                <td className="text-center">
                  <Link
                    to={`/patients/${patient.id}`}
                    className="btn btn-sm btn-edit me-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Editar paciente"
                  >
                    <i className="bi bi-pencil"></i>
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => console.log("Excluir", patient.id)}
                    title="Excluir paciente"
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

export default Patients;
