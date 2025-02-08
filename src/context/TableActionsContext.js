import React, { createContext, useContext } from "react";
export const TableActionsContext = createContext({});
export const useTableActions = () => useContext(TableActionsContext);