const _ = require('lodash');

const NEW_EVENT = 'NEW_EVENT';

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
  _.forIn(log.args, (value, key) => {
    let prop = getPropFromSchema(schema[key], value)
    _.extend(event, {
      [key]: prop
    })
  });
  return event;
}

const eventsFromTransaction = (tx) => {
  return tx.logs.map((log) => {
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


module.exports = {
  NEW_EVENT,
  EVENT_SCHEMAS,
  eventsFromTransaction,
  convertUIntArray,
  readEvent,
  readEvents,
  emitEventStream,
  readEventsStartingAt
};
