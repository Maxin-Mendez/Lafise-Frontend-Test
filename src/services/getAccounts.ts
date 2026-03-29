import axios, { AxiosError } from "axios";
import { Account } from "../models/accounts.model";

const API_URL = "http://localhost:5566";

// Traer una cuenta
export const fetchAccountsById = async (
  accountId: string | number,
): Promise<Account> => {
  try {
    const response = await axios.get<Account>(
      `${API_URL}/accounts/${accountId}`,
    );
    return response.data;
  } catch (error) {
    // Manejo de errores de Axios
    const err = error as AxiosError;
    console.error(
      `Error en fetchAccountsById para el ID ${accountId}:`,
      err.message,
    );
    throw err;
  }
};
