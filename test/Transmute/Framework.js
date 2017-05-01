const _ = require('lodash');

const NEW_EVENT = 'NEW_EVENT';

const EVENT_SCHEMAS = {
    [NEW_EVENT]: {
        Id: 'BigNumber',
        Type: 'String',
        Value: 'String',
        Address: 'String'
    }
}

const getPropFromSchema = (propType, value) => {
    switch (propType) {
        case 'String': return value.toString(); break;
        case 'BigNumber': return value.toNumber(); break;
        default: throw ('UNKNWON propType. Make sure your schema is up to date.')
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

const getEventById = async (esInstance, eventId) => {
    return {
        Id: eventId,
        Type: await esInstance.getType(eventId),
        Value: await esInstance.getValue(eventId),
        Address: await esInstance.getAddress(eventId),
    }
}

const getEventsByIds = async (esInstance, eventIds) => {
    return await Promise.all(
        eventIds
            .map(async (eventId) => {
                return await getEventById(esInstance, eventId)
            })
    );
}


module.exports = {
    NEW_EVENT,
    EVENT_SCHEMAS,
    eventsFromTransaction,
    convertUIntArray,
    getEventById,
    getEventsByIds
}