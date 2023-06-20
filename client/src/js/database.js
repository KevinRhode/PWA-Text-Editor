import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');

  // Create a connection to the database database and version we want to use.
  const contactDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // // Use the .getAll() method to get all data in the database.
  const requestStart = await store.get(1);
  if (requestStart === undefined) {
    const addTo = await store.add({content:content});   
    console.log('🚀 - data saved to the database', addTo); 
  } else {
    //do something to request start.
    console.log(requestStart);
    requestStart.content = content;
    const putTo = await store.put(requestStart);
    console.log('🚀 - data saved to the database', putTo);
  }

    
  // Get confirmation of the request.
 

  // Use the .add() method on the store and pass in the content.
  // const requestPut = store.put(resultGet);

  // // Get confirmation of the request.
  // const resultPut = await requestPut;
  // console.log('🚀 - data saved to the database', resultPut);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const contactDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;

  console.log('result.value', result.content);
  return result.content;
};

initdb();
