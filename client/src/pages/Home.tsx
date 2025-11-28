import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirecionar para a Calculadora de Taxas por padrão
    setLocation("/calculator");
  }, [setLocation]);

  return null;
}
