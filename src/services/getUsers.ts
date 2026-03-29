import axios, { AxiosError } from "axios";
import { User } from "../models/users.model";

const API_URL = "http://localhost:5566";

/**
 * Obtiene el usuario por su ID.
 */
export const fetchUserById = async (userId: string | number): Promise<User> => {
  try {
    const response = await axios.get<User>(`${API_URL}/users/${userId}`);

    return response.data;
  } catch (error) {
    // Manejo de errores
    const err = error as AxiosError;
    console.error(`Error al obtener usuario ${userId}:`, err.message);
    throw err;
  }
};
