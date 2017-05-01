var Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

var EventStore = artifacts.require('./Transmute/EventStore.sol')

var _ = require('lodash')

const {
    NEW_EVENT,
    eventsFromTransaction,
    convertUIntArray,
    getEventById,
    getEventsByIds
} = require('./Framework')

contract('EventStore', (accounts) => {

    let event = {
        Type: 'ADDRESS_AUTHORIZED',
        Value: accounts[0],
        Address: accounts[0]
    }

    it('is a deployed contract', () => {
        return EventStore.deployed()
            .then((_esInstance) => {
                return _esInstance;
            })
    })

    it('is currently version 1', () => {
        return EventStore.deployed()
            .then((_esInstance) => {
                return _esInstance.getVersion();
            })
            .then((versionBigNum) => {
                let version = versionBigNum.toNumber();
                assert(version === 1)
            })
    })

    describe('emitEvent', () => {
        it('emits a NEW_EVENT event with Id, Type and Value', () => {
            return EventStore.deployed()
                .then((_esInstance) => {
                    return _esInstance
                        .emitEvent(event.Type, event.Value, event.Address, {
                            from: accounts[0],
                            gas: 2000000
                        })
                })
                .then((tx) => {
                    let events = eventsFromTransaction(tx);
                    // console.log(events);
                    assert.equal(events.length, 1);
                    assert.equal(events[0].Type, event.Type);
                    assert.equal(events[0].Value, event.Value);
                    assert.equal(events[0].Address, event.Address);
                })
        })
    })

    describe('getEventIds', () => {
        it('should return all event Ids', () => {
            return EventStore.deployed()
                .then((_esInstance) => {
                    return _esInstance
                        .getEventIds()

                })
                .then((bigNumArray) => {
                    let eventIds = convertUIntArray(bigNumArray);
                    assert.equal(eventIds.length, 1);
                    assert.equal(eventIds[0], 0);
                })
        })
    })

    describe('getType', () => {
        it('should return the event type by Id', () => {
            return EventStore.deployed()
                .then((_esInstance) => {
                    return _esInstance
                        .getType(0)
                        .then((eventType) => {
                            assert.equal(eventType, event.Type);
                        })
                })
        })
    })

    describe('getValue', () => {
        it('should return the event value by Id', () => {
            return EventStore.deployed()
                .then((_esInstance) => {
                    return _esInstance
                        .getValue(0)
                        .then((eventValue) => {
                            assert.equal(eventValue, event.Value);
                        })
                })
        })
    })

    describe('getAddress', () => {
        it('should return the event value by Id', () => {
            return EventStore.deployed()
                .then((_esInstance) => {
                    return _esInstance
                        .getAddress(0)
                        .then((recordedAddress) => {
                            assert.equal(recordedAddress, event.Address );
                        })
                })
        })
    })

    describe('getEventById(esInstance, eventId)', () => {
        it('should return the event object by eventId', () => {
            return EventStore.deployed()
                .then((_esInstance) => {
                    return getEventById(_esInstance, 0)
                })
                .then((eventObject) => {
                    assert.equal(eventObject.Id, 0);
                    assert.equal(eventObject.Type, event.Type);
                    assert.equal(eventObject.Value, event.Value);
                    assert.equal(eventObject.Address, event.Address);
                })
        })
    })

    describe('getEventsByIds(esInstance, eventIds)', () => {
        it('should return an array with event objects matching eventIds', () => {
            return EventStore.deployed()
                .then((_esInstance) => {
                    return _esInstance
                        .getEventIds()
                        .then((bigNumArray) => {
                            let eventIds = convertUIntArray(bigNumArray);
                            return getEventsByIds(_esInstance, eventIds)
                        })
                        .then((eventObjects) => {
                            assert(eventObjects.length === 1);
                            assert.equal(eventObjects[0].Type, event.Type);
                            assert.equal(eventObjects[0].Value, event.Value);
                            assert.equal(eventObjects[0].Address, event.Address);
                        })
                })
        })
    })

})


