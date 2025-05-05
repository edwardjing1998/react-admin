// File: src/context/ClientContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clientList, setClientList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4444/api/clients')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch clients');
        return res.json();
      })
      .then((data) => {
        setClientList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Error fetching client data:', err);
        setLoading(false);
      });
  }, []);

  return (
    <ClientContext.Provider value={{ clientList, setClientList, loading }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => useContext(ClientContext);
