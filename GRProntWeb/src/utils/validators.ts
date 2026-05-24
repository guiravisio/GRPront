// Validação simples de email
export const isValidEmail = (email?: string | null): boolean => {
    if (!email) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  // Validação básica de telefone (apenas dígitos)
  export const isValidPhone = (phone?: string | null): boolean => {
    if (!phone) return false;
    const regex = /^\d{10,11}$/; // 10 ou 11 dígitos
    return regex.test(phone);
  };
  
  // Validação de CPF (apenas formato XXX.XXX.XXX-XX)
  export const isValidCPF = (cpf?: string | null): boolean => {
    if (!cpf) return false;
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
  };
  