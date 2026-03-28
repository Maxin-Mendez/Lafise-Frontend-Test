export interface TransactionAmount {
  currency: string;
  value: number;
}

export interface Transaction {
  transaction_number: string;
  description: string;
  bank_description: string;
  transaction_type: "Credit" | "Debit" | string;
  amount: TransactionAmount;
  origin: string;
  destination: string;
  transaction_date: string;
}

export interface TransactionResponse {
  page: number;
  size: number;
  next: number;
  total_count: number;
  items: Transaction[];
}

// Interfaz para la creación (Input)
export interface CreateTransactionInput {
  origin: string;
  destination: string;
  amount: number;
  currency: string;
}
