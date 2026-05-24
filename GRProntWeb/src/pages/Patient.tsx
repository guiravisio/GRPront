import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { isNull } from "../utils";
import { isValidEmail, isValidCPF } from "../utils/validators";
import { useToast } from "../context/ToastContext";

interface Patient {
  id?: number;
  fullName: string;
  identificationType: string;
  identification: string;
  phoneNumber: string;
  email: string;
  guardianName?: string;
  guardianCPF?: string;
}

const Patient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [patient, setPatient] = useState<Patient>({
    fullName: "",
    identificationType: "CPF",
    identification: "",
    phoneNumber: "",
    email: "",
    guardianName: "",
    guardianCPF: "",
  });

  useEffect(() => {
    if (id) {
      api.get(`/Patients/${id}`).then((res) => setPatient(res.data));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (!patient.fullName) {
      showToast("Nome é obrigatório", "warning");
      return;
    }
    if (patient.email && !isValidEmail(patient.email)) {
      showToast("Email inválido", "error");
      return;
    }
    if (patient.identificationType === "CPF" && patient.identification && !isValidCPF(patient.identification)) {
      showToast("CPF inválido", "error");
      return;
    }

    try {
      if (id) {
        await api.put(`/Patients/${id}`, patient);
        showToast("Paciente atualizado com sucesso!", "success");
      } else {
        await api.post("/Patients", patient);
        showToast("Paciente cadastrado com sucesso!", "success");
      }
      navigate("/patients");
    } catch (error) {
      console.error("Erro ao salvar paciente:", error);
      showToast("Erro ao salvar paciente.", "error");
    }
  };

  return (
    <div className="container mt-4">
        <h2>{id ? "Editar Paciente" : "Novo Paciente"}</h2>

        <form onSubmit={handleSubmit} className="mt-3">
            <div className="row">
            <div className="col-md-6 mb-3">
                <label className="form-label">Nome completo</label>
                <input
                type="text"
                name="fullName"
                value={isNull(patient.fullName)}
                onChange={handleChange}
                className="form-control"
                required
                />
            </div>

            <div className="col-md-3 mb-3">
                <label className="form-label">Tipo de identificação</label>
                <select
                name="identificationType"
                value={patient.identificationType}
                onChange={handleChange}
                className="form-select"
                >
                <option value="CPF">CPF</option>
                <option value="Other">Outro</option>
                </select>
            </div>

            <div className="col-md-3 mb-3">
                <label className="form-label">Identificação</label>
                <input
                type="text"
                name="identification"
                value={isNull(patient.identification)}
                onChange={handleChange}
                className="form-control"
                />
            </div>

            <div className="col-md-4 mb-3">
                <label className="form-label">Telefone</label>
                <input
                type="text"
                name="phoneNumber"
                value={isNull(patient.phoneNumber)}
                onChange={handleChange}
                className="form-control"
                />
            </div>

            <div className="col-md-4 mb-3">
                <label className="form-label">Email</label>
                <input
                type="email"
                name="email"
                value={isNull(patient.email)}
                onChange={handleChange}
                className="form-control"
                />
            </div>

            <div className="col-md-4 mb-3">
                <label className="form-label">Responsável</label>
                <input
                type="text"
                name="guardianName"
                value={isNull(patient.guardianName)}
                onChange={handleChange}
                className="form-control"
                />
            </div>

            <div className="col-md-4 mb-3">
                <label className="form-label">CPF do responsável</label>
                <input
                type="text"
                name="guardianCPF"
                value={isNull(patient.guardianCPF)}
                onChange={handleChange}
                className="form-control"
                />
            </div>
            </div>

        <button type="submit" className="btn btn-primary">
          {id ? "Salvar alterações" : "Cadastrar"} 
        </button>
      </form>
    </div>
  );
};

export default Patient;
