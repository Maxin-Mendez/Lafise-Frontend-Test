import { useState, useMemo, useCallback } from "react";

/**
 * Hook genérico para filtrar datos basados en un rango de fechas.
 * @param data Array de objetos a filtrar.
 * @param dateFieldName Nombre del campo que contiene la fecha.
 */
export function useDateFilter<T>(data: T[], dateFieldName: keyof T) {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const filteredData = useMemo(() => {
    // Calculamos los límites de tiempo una sola vez (fuera del filter)
    let startTimestamp: number | null = null;
    let endTimestamp: number | null = null;

    if (startDate) {
      // Usamos "T00:00:00" para forzar la interpretación como hora local y no UTC
      const s = new Date(`${startDate}T00:00:00`);
      startTimestamp = s.getTime();
    }

    if (endDate) {
      const e = new Date(`${endDate}T23:59:59.999`);
      endTimestamp = e.getTime();
    }

    // Si no hay filtros, devolvemos la data original
    if (!startTimestamp && !endTimestamp) return data;

    // Filtramos la data
    return data.filter((item) => {
      const dateValue = item[dateFieldName];
      if (!dateValue) return false;

      // Convertimos el valor del campo a timestamp
      const itemTime = new Date(dateValue as unknown as string).getTime();

      // Validamos si el valor de fecha es inválido
      if (isNaN(itemTime)) return false;

      if (startTimestamp && itemTime < startTimestamp) return false;
      if (endTimestamp && itemTime > endTimestamp) return false;

      return true;
    });
  }, [data, startDate, endDate, dateFieldName]);

  // Usamos useCallback para que la función sea estable entre renders
  const clearFilters = useCallback(() => {
    setStartDate("");
    setEndDate("");
  }, []);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    filteredData,
    clearFilters,
  };
}
