import { redirect } from "next/navigation";
export const metadata = {
  title: "Redirigiendo... | Banca en Línea",
};

export default function RootPage() {
  redirect("/tablero");

  return null;
}
