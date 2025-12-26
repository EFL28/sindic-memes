"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Creamos el QueryClient dentro del estado para evitar que se reinicie en cada render
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Configuraciones por defecto útiles para una app de memes
            staleTime: 60 * 1000, // Los datos se consideran "frescos" por 1 minuto
            refetchOnWindowFocus: false, // Evita recargar memes al cambiar de pestaña
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
