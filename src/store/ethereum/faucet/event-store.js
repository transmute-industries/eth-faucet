import { extend, forIn } from 'lodash'

import * as firebase from 'firebase';
import { firebase as firebaseConfig } from 'config';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const NEW_EVENT = 'NEW_EVENT';

const eventStorePath = 'transmute/events/';
const readModelStorePath = 'transmute/models/';

const EVENT_SCHEMAS = {
    [NEW_EVENT]: {
        Id: 'BigNumber',
        Type: 'String',
        Created: 'BigNumber',

        AddressValue: 'String',
        UIntValue: 'BigNumber',
        StringValue: 'String'
    }
}

const getPropFromSchema = (propType, value) => {
    switch (propType) {
        case 'String': return value.toString(); break;
        case 'BigNumber': return value.toNumber(); break;
        default: throw (`UNKNWON propType for value '${value}'. Make sure your schema is up to date.`)
    }
}

const convertUIntArray = (arr) => {
    return arr.map((el) => {
        return el.toNumber();
    })
}

const eventFromLog = (log) => {
  
    let schema = EVENT_SCHEMAS[log.event];
    let event = {};
    forIn(log.args, (value, key) => {
        let prop = getPropFromSchema(schema[key], value)
        extend(event, {
            [key]: prop
        })
    });
    return event;
}

const eventsFromTransaction = (tx) => {
    return tx.logs
    .filter((log) =>{
        let isEventStoreEvent = EVENT_SCHEMAS[log.event] !== undefined;

        return isEventStoreEvent;
    }).map((log) => {
        return eventFromLog(log);
    })
}

const readEvent = async (esInstance, eventId) => {
    return {
        Id: eventId,
        Type: await esInstance.getType(eventId),
        Created: (await esInstance.getCreated(eventId)).toNumber(),
        AddressValue: await esInstance.getAddressValue(eventId),
        UIntValue: (await esInstance.getUIntValue(eventId)).toNumber(),
        StringValue: await esInstance.getStringValue(eventId)
    }
}

const readEvents = async (esInstance) => {
    return readEventsStartingAt(esInstance, 0);
}

const emitEventStream = async (esInstance, eventArray, fromAccount) => {
    let eventPromises = eventArray
        .map((event) => {
            return esInstance
                .emitEvent(event.Type, event.AddressValue, event.UIntValue, event.StringValue, {
                    from: fromAccount,
                    gas: 2000000
                })
                .then((tx) => {
                    return eventsFromTransaction(tx);
                })
        })
    return await Promise.all(eventPromises)
        .then((newEvents) => {
            // console.log('newEvents: ', newEvents)
            return newEvents;
        })
}


const readEventsStartingAt = async (esInstance, eventId) => {
    let currentEvent = await esInstance.eventCount();
    let eventPromises = [];
    while (eventId < currentEvent) {
        eventPromises.push(await readEvent(esInstance, eventId));
        eventId++;
    }
    return await Promise.all(eventPromises);
};


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
    NEW_EVENT,
    EVENT_SCHEMAS,
    eventsFromTransaction,
    convertUIntArray,
    readEvent,
    readEvents,
    emitEventStream,
    readEventsStartingAt,
    eventStorePath,
    readModelStorePath,
    receiveEvents,
    rebuildReadModelWithGenerator,
    maybeSyncReadModel
};
