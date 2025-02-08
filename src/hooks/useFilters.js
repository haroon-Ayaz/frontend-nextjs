import { useState } from "react";

export default function useFilters(initialFilters = {}) {
  const [filters, setFilters] = useState(initialFilters);

  const addFilter = (defaultColumn) => {
    const newFilter = { column: defaultColumn, value: "" };
    setFilters((prev) => ({ ...prev, [Date.now()]: newFilter }));
  };

  const updateFilter = (id, field, value) => {
    setFilters((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const removeFilter = (id) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[id];
      return newFilters;
    });
  };

  return { filters, addFilter, updateFilter, removeFilter };
}
