import { useState, useCallback } from "react";
import axios from "axios";
import { useAccountStore } from "@/src/store/useAccountStore";
import { useTransactionsStore } from "@/src/store/useTransactionStore";
import { Transaction } from "@/src/models/transactions.model";

// Tipado
interface TransferFormData {
  origin: string;
  destination: string;
  amount: {
    currency: string;
    value: number;
  };
  reference: string;
  confirmation: string;
}

const INITIAL_FORM_STATE: TransferFormData = {
  origin: "",
  destination: "",
  amount: {
    currency: "NIO",
    value: 0,
  },
  reference: "",
  confirmation: "",
};

export const useTransfer = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] =
    useState<TransferFormData>(INITIAL_FORM_STATE);

  const accounts = useAccountStore((state) => state.accounts);
  const addTransaction = useTransactionsStore((state) => state.addTransaction);

  // Validación: Referencia >= 1 y campos obligatorios
  const isFormComplete =
    formData.origin !== "" &&
    formData.destination !== "" &&
    formData.amount.value > 0 &&
    formData.reference.trim().length >= 1;

  const updateFields = useCallback(
    (fields: Partial<TransferFormData>) => {
      setFormData((prev) => ({ ...prev, ...fields }));
      if (error) setError(null);
    },
    [error],
  );

  const updateAmount = useCallback(
    (fields: Partial<TransferFormData["amount"]>) => {
      setFormData((prev) => ({
        ...prev,
        amount: { ...prev.amount, ...fields },
      }));
      if (error) setError(null);
    },
    [error],
  );

  const executeTransfer = async () => {
    const originAccount = accounts.find(
      (acc) => acc.account_number === formData.origin,
    );

    if (!originAccount)
      return setError("Selecciona una cuenta de origen válida.");

    if (formData.amount.value > originAccount.balance) {
      return setError(
        `Saldo insuficiente. Disponible: ${originAccount.currency} ${originAccount.balance}`,
      );
    }

    if (!isFormComplete)
      return setError("Completa todos los campos obligatorios.");

    setLoading(true);
    setError(null);

    try {
      const payload = {
        origin: formData.origin,
        destination: formData.destination,
        amount: formData.amount,
        description: formData.reference,
        // Si tu API requiere la confirmación, la enviamos aquí:
        confirmation: formData.confirmation,
      };

      const response = await axios.post(
        "http://localhost:5566/transactions",
        payload,
      );

      if (response.status === 200 || response.status === 201) {
        const transferValue = Number(formData.amount.value);

        // Actualización de saldos en Store
        const updatedAccounts = accounts.map((acc) => {
          if (acc.account_number === formData.origin) {
            return { ...acc, balance: acc.balance - transferValue };
          }
          if (acc.account_number === formData.destination) {
            return { ...acc, balance: acc.balance + transferValue };
          }
          return acc;
        });

        useAccountStore.setState({ accounts: updatedAccounts });

        // Registro de nueva transacción
        const newTx: Transaction = {
          transaction_number: `TR-${Math.floor(Math.random() * 1000000)}`,
          description: formData.reference,
          bank_description: `TRANSFERENCIA A CTA. ${formData.destination}`,
          transaction_type: "Debit",
          amount: {
            currency: formData.amount.currency,
            value: transferValue,
          },
          transaction_date: new Date().toISOString(),
          origin: formData.origin,
          destination: formData.destination,
        };

        addTransaction(newTx);

        setSuccess(true);
        setFormData(INITIAL_FORM_STATE);
        setCurrentStep(1);

        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Hubo un problema al procesar la transferencia.",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    currentStep,
    formData,
    loading,
    error,
    success,
    isFormComplete,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === 4,
    updateFields,
    updateAmount,
    executeTransfer,
    setSuccess,
    nextStep: () => setCurrentStep((prev) => Math.min(prev + 1, 4)),
    prevStep: () => setCurrentStep((prev) => Math.max(prev - 1, 1)),
  };
};
