import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { isValidEmail, isValidCPF } from "../utils/validators";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";
import { parseISO, differenceInYears } from "date-fns";
//import "./Patient.css"; 

interface Patient {
  id?: number;
  fullName: string;
  dateOfBirth?: string | null;   
  gender?: string | null;
  identificationType?: string;
  identification?: string | null;
  phoneNumber: string;
  email?: string | null;
  address?: string | null;
  addressNumber?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  guardianName?: string | null;
  guardianPhone?: string | null;
  notes?: string | null;
}


const Patient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [patient, setPatient] = useState<Patient>({
    fullName: "",
    dateOfBirth: null, 
    gender: null,
    identificationType: "CPF",
    identification: null,
    phoneNumber: "",
    email: null,
    address: null,
    addressNumber: null,
    city: null,
    state: null,
    zipCode: null,
    guardianName: null,
    guardianPhone: null,
    notes: null,
  });
  

  useEffect(() => {
    if (id) {
      api.get(`/Patients/${id}`).then((res) => setPatient(res.data));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    setPatient((prev) => ({ ...prev, zipCode: cep }));

    if (cep.length === 8) {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setPatient((prev) => ({
          ...prev,
          address: data.logradouro,
          city: data.localidade,
          state: data.uf,
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validações
    if (!patient.fullName) {
      toast.warning("Nome é obrigatório");
      return;
    }
    if (patient.email && !isValidEmail(patient.email)) {
      toast.warning("Email inválido");
      return;
    }
    if (
      patient.identificationType === "CPF" &&
      patient.identification &&
      !isValidCPF(patient.identification)
    ) {
      toast.warning("CPF inválido");
      return;
    }
    
    const payload: Patient = {
      ...patient,
      dateOfBirth: patient.dateOfBirth
        ? patient.dateOfBirth.substring(0, 10) // "2012-02-26"
        : null,
    };
    
  
    // converte "" em null
    Object.keys(payload).forEach((key) => {
      const k = key as keyof Patient;
      if (payload[k] === "") {
        (payload[k] as unknown) = null;
      }
    });
  
    console.log("Payload enviado:", payload);

    try {
      if (id) {
        await api.put(`/Patients/${id}`, payload);
        toast.success("Paciente atualizado com sucesso!");
      } else {
        await api.post("/Patients", payload);
        toast.success("Paciente cadastrado com sucesso!");
      }
      navigate("/patients");
    } catch (error) {
      console.error("Erro ao salvar paciente:", error);
      toast.error("Erro ao salvar paciente.");
    }
  };
    
  

  const age = patient.dateOfBirth
    ? differenceInYears(new Date(), parseISO(patient.dateOfBirth))
    : "";

    return (
      <div className="container mt-4">
        <h2>{id ? "Editar Paciente" : "Novo Paciente"}</h2>
  
        {/* Abas */}
        <ul className="nav nav-tabs page-tabs mt-3">
          <li className="nav-item">
            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#dados">
              Dados Paciente
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#endereco">
              Endereço
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#adicionais">
              Dados Adicionais
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#plano">
              Plano
            </button>
          </li>
        </ul>
  
        <form onSubmit={handleSubmit} className="tab-content mt-3">
          {/* Aba Dados Paciente */}
          <div className="tab-pane fade show active" id="dados">
            <div className="row">
              <div className="col-md-7 mb-3">
                <label className="form-label">Nome completo</label>
                <input
                  type="text"
                  name="fullName"
                  value={patient.fullName}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
  
              <div className="col-md-3 mb-3">
                <label className="form-label">Data de Nascimento</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={patient.dateOfBirth ? patient.dateOfBirth.substring(0, 10) : ""}
                  onChange={handleChange}
                  className="form-control"
                />

              </div>
  
              <div className="col-md-2 mb-3">
                <label className="form-label">Idade</label>
                <input type="text" value={age} className="form-control" disabled />
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
                {patient.identificationType === "CPF" ? (
                  <InputMask
                    mask="999.999.999-99"
                    value={patient.identification || ""}
                    onChange={handleChange}
                  >
                    {(inputProps) => (
                      <input
                        {...inputProps}
                        type="text"
                        name="identification"
                        className="form-control"
                      />
                    )}
                  </InputMask>
                ) : (
                  <input
                    type="text"
                    name="identification"
                    value={patient.identification || ""}
                    onChange={handleChange}
                    className="form-control"
                  />
                )}
              </div>
  
              <div className="col-md-3 mb-3">
                <label className="form-label">Telefone</label>
                <InputMask
                  mask="(99) 99999-9999"
                  value={patient.phoneNumber || ""}
                  onChange={handleChange}
                >
                  {(inputProps) => (
                    <input
                      {...inputProps}
                      type="text"
                      name="phoneNumber"
                      className="form-control"
                    />
                  )}
                </InputMask>
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Gênero</label>
                <input
                  type="text"
                  name="gender"
                  value={patient.gender || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
  
              <div className="col-md-7 mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={patient.email || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
          </div>
                  {/* Aba Endereço */}
        <div className="tab-pane fade" id="endereco">
          <div className="row">
            <div className="col-md-3 mb-3">
              <label className="form-label">CEP</label>
              <InputMask
                mask="99999-999"
                value={patient.zipCode || ""}
                onChange={handleCepChange}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="text"
                    name="zipCode"
                    className="form-control"
                  />
                )}
              </InputMask>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Endereço</label>
              <input
                type="text"
                name="address"
                value={patient.address || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label">Número</label>
              <input
                type="text"
                name="number"
                value={patient.addressNumber || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Cidade</label>
              <input
                type="text"
                name="city"
                value={patient.city || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Estado</label>
              <input
                type="text"
                name="state"
                value={patient.state || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>

        {/* Aba Dados Adicionais */}
        <div className="tab-pane fade" id="adicionais">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Responsável/Contato Emergência</label>
              <input
                type="text"
                name="guardianName"
                value={patient.guardianName || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Telefone</label>
              <InputMask
                mask="(99) 99999-9999"
                value={patient.guardianPhone || ""}
                onChange={handleChange}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="text"
                    name="guardianPhone"
                    className="form-control"
                  />
                )}
              </InputMask>
            </div>

            <div className="col-md-12 mb-3">
              <label className="form-label">Observações</label>
              <textarea
                name="notes"
                value={patient.notes || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>

        {/* Aba Plano */}
        <div className="tab-pane fade" id="plano">
          <p>
            Funcionalidade de plano de saúde/contrato será implementada futuramente.
          </p>
        </div>

        {/* Botões de ação */}
        <div className="mt-3">
          <button type="submit" className="btn btn-primary">
            {id ? "Salvar alterações" : "Cadastrar"}
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => navigate("/patients")}
          >
            {id ? "Cancelar" : "Voltar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Patient;

  
