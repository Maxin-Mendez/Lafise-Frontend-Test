import axios, { AxiosError } from "axios";
import {
  TransactionResponse,
  CreateTransactionInput,
  Transaction,
} from "../models/transactions.model";

const API_URL = "http://localhost:5566";

/**
 * Obtiene el historial de transacciones de una cuenta específica.
 */
export const fetchTransactions = async (
  account_number: string | number,
): Promise<TransactionResponse> => {
  try {
    const response = await axios.get<TransactionResponse>(
      `${API_URL}/accounts/${account_number}/transactions`,
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error al obtener transacciones:", err.message);
    throw err;
  }
};

/**
 * Registra una nueva transacción en el sistema.
 */
export const createTransaction = async ({
  origin,
  destination,
  amount,
  currency,
}: CreateTransactionInput): Promise<Transaction> => {
  try {
    const response = await axios.post<Transaction>(`${API_URL}/transactions`, {
      origin,
      destination,
      amount: { value: amount, currency },
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error(
      "Error al crear transacción:",
      err.response?.data || err.message,
    );
    throw err;
  }
};
