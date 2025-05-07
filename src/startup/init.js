// File: src/startup/init.js
import { saveClientsToDB } from '../utils/db';

export const preloadClients = () => {
  fetch('http://localhost:4444/api/clients')
    .then((res) => {
      if (!res.ok) throw new Error('Startup fetch failed');
      return res.json();
    })
    .then((data) => {
      console.log(`✅ Preloaded ${data.length} clients`);
      return saveClientsToDB(data);
    })
    .then(() => {
      console.log('✅ Clients saved in IndexedDB');
    })
    .catch((err) => {
      console.error('❌ Error preloading clients:', err);
    });
};
