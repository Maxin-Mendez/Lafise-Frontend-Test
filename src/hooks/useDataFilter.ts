import { useState, useMemo, useCallback } from "react";

/**
 * @param data Array de objetos a filtrar.
 * @param dateFieldName Nombre del campo que contiene la fecha.
 */
export function useDateFilter<T>(data: T[], dateFieldName: keyof T) {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const filteredData = useMemo(() => {
    let startTimestamp: number | null = null;
    let endTimestamp: number | null = null;

    if (startDate) {
      const s = new Date(`${startDate}T00:00:00`);
      startTimestamp = s.getTime();
    }

    if (endDate) {
      const e = new Date(`${endDate}T23:59:59.999`);
      endTimestamp = e.getTime();
    }

    if (!startTimestamp && !endTimestamp) return data;

    return data.filter((item) => {
      const dateValue = item[dateFieldName];
      if (!dateValue) return false;

      const itemTime = new Date(dateValue as unknown as string).getTime();

      if (isNaN(itemTime)) return false;

      if (startTimestamp && itemTime < startTimestamp) return false;
      if (endTimestamp && itemTime > endTimestamp) return false;

      return true;
    });
  }, [data, startDate, endDate, dateFieldName]);

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
