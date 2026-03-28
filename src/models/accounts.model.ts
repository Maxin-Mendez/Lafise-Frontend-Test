// Lo que viene de la API
export interface Account {
  alias: string;
  account_number: number;
  balance: number;
  currency: string;
}

// Lo que vive en tu Store y usa tu UI
export interface AccountStateItem {
  account_id: string;
  account_number: string;
  type: string;
  balance: number;
  currency: string;
}
