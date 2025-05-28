// src/services/clientService.js
export const fetchClientsPaging = async (page, size) => {
    const response = await fetch(`http://localhost:4444/api/clients-paging?page=${page}&size=${size}`);
    if (!response.ok) {
      throw new Error('Failed to fetch paged clients');
    }
    return await response.json();
  };
  
export const fetchWildcardPage = (page) => {
const keyword = inputValue;
fetch(`http://localhost:4444/api/client/wildcard?keyword=${encodeURIComponent(keyword)}`)
    .then((res) => res.json())
    .then((newData) => {
    setClientList(newData);
    setCurrentPage(page);
    })
    .catch((error) => {
    console.error('Error fetching wildcard data:', error);
    });
};

// src/services/ClientService.js
export const fetchClientsByPage = async (page = 0, pageSize = 25) => {
    try {
      const response = await fetch(`http://localhost:4444/api/clients-paging?page=${page}&size=${pageSize}`);
      if (!response.ok) {
        throw new Error('Failed to fetch clients');
      }
      const data = await response.json();
      return data; // Return the fetched data
    } catch (error) {
      console.error(`Error fetching clients for page ${page}:`, error);
      throw error;
    }
  };
  
  export const resetClientListService = async (pageSize = 25) => {
    try {
      const response = await fetch(`http://localhost:4444/api/clients-paging?page=0&size=${pageSize}`);
      if (!response.ok) {
        throw new Error('Failed to fetch initial clients');
      }
      const data = await response.json();
      return data; // Return the reset data
    } catch (error) {
      console.error('Reset fetch failed:', error);
      throw error;
    }
  };
  