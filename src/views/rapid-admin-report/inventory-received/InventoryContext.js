// File: contexts/InventoryContext.js
import React, { createContext, useState } from 'react';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [rowData, setRowData] = useState([]);

  return (
    <InventoryContext.Provider value={{ rowData, setRowData }}>
      {children}
    </InventoryContext.Provider>
  );
};
