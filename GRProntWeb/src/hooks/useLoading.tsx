import { useState } from "react";
import LoadingOverlay from "../components/LoadingOverlay";

interface UseLoadingReturn {
  showLoading: (msg?: string) => void;
  hideLoading: () => void;
  LoadingComponent: React.ReactNode; // usar ReactNode
}

export function useLoading(): UseLoadingReturn {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const showLoading = (msg: string = "Carregando...") => {
    setMessage(msg);
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
    setMessage("");
  };

  const LoadingComponent = loading ? <LoadingOverlay message={message} /> : null;

  return { showLoading, hideLoading, LoadingComponent };
}
