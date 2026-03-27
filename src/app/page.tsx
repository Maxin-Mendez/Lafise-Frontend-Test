import { redirect } from "next/navigation";
export const metadata = {
  title: "Redirigiendo... | Banca en Línea",
};

export default function RootPage() {
  // Uso de redirect de forma directa.
  redirect("/tablero");

  // Retornar null para que el compilador de TS
  // sepa que este componente no renderiza UI.
  return null;
}
