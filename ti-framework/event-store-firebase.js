const firebase = require('firebase');

const {
  readEventsStartingAt
} = require('./event-store');

const firebaseConfig = {
  apiKey: 'AIzaSyBev_5tS4kmdcgi6LcUhGP3HBP1s5Rl0H8',
  authDomain: 'eth-faucet.firebaseapp.com',
  databaseURL: 'https://eth-faucet.firebaseio.com',
  projectId: 'eth-faucet',
  storageBucket: 'eth-faucet.appspot.com',
  messagingSenderId: '686546727130'
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const eventStorePath = 'transmute/events/';
const readModelStorePath = 'transmute/models/';

// // TODO: Add Encryption here
// // to hide contract data from firebase...
// // store encryption key in a contract with owner
// // https://github.com/cisco/node-jose
// // https://github.com/OR13/JOE

const getItem = async (storePath, key) => {
  return db.ref(storePath + key)
  .once('value')
  .then((snapshot) => {
    let obj = snapshot.val();
    return obj;
  });
};

const setItem = async (storePath, key, value) => {
  return db.ref(storePath + key)
  .set(value);
};

const receiveEvents = async (events) => {
  return await Promise.all(events.map((event) => {
    return setItem(eventStorePath, event.Id, event);
  }));
};

const rebuildReadModelWithGenerator = async (readModel, generator, events) => {
  let model = generator(readModel, events);
  return setItem(readModelStorePath, model.Id, model)
  .then(() => {
    return readModel;
  });
};

const maybeSyncReadModel = async (storePath, key, generator, esInstance) => {
  let eventCount = (await esInstance.eventCount()).toNumber();
  return getItem(storePath, key)
  .then(async (readModel) => {
    if (readModel.EventCount === eventCount) {
      // console.log('No New Events To Apply');
      return false;
    } else {
      let events = await readEventsStartingAt(esInstance, readModel.EventCount);
      // console.log('Apply Events: ', events);
      return rebuildReadModelWithGenerator(readModel, generator, events);
    }
  });
};

module.exports = {
  eventStorePath,
  readModelStorePath,
  receiveEvents,
  rebuildReadModelWithGenerator,
  maybeSyncReadModel
};
