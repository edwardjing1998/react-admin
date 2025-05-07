// File: src/utils/db.js
import { openDB } from 'idb';

const DB_NAME = 'clientDataDB';
const STORE_NAME = 'clients';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export const saveClientsToDB = async (clients) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);

  await store.clear(); // clear old data
  for (let i = 0; i < clients.length; i++) {
    store.put({ id: i, ...clients[i] }); // simple key
  }
  await tx.done;
};

export const getAllClientsFromDB = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};
