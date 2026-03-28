import { create } from "zustand";
import { fetchUserById } from "@/src/services/getUsers";
import { User } from "../models/users.model";

// Definir la interfaz del estado para el Store
interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: (userId: string | number) => Promise<void>;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()((set, get) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async (userId) => {
    // Evitar peticiones duplicadas si ya se está cargando
    if (get().loading) return;

    // Si el usuario ya existe en el estado, no lo pedimos de nuevo
    const currentUser = get().user;
    if (currentUser && currentUser.full_name) {
    }

    set({ loading: true, error: null });

    try {
      const data = await fetchUserById(userId);

      set({
        user: data,
        loading: false,
      });
    } catch (error: any) {
      console.error("Error en useUserStore:", error);
      set({
        error: error?.message || "Error al cargar el perfil de usuario",
        loading: false,
      });
    }
  },

  // Acción para limpiar el estado
  clearUser: () => set({ user: null, error: null, loading: false }),
}));
