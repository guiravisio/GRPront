// Formata data para DD/MM/YYYY
export const formatDate = (date?: Date | string | null): string => {
    if (!date) return "";
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("pt-BR");
  };
  
  // Formata número para moeda BRL
  export const formatCurrency = (value?: number | null): string => {
    if (value == null) return "";
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  