var Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

var EventStore = artifacts.require('./Transmute/EventStore.sol')

var _ = require('lodash')

const {
    NEW_EVENT,
    eventsFromTransaction,
    convertUIntArray,
    readEvent,
    readEvents
} = require('./Framework')

contract('EventStore', (accounts) => {

    let event = {
        Type: 'ADDRESS_AUTHORIZED',
        AddressValue: accounts[0],
        UIntValue: 1,
        StringValue: 'TransmuteEvent'
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
        it('emits a NEW_EVENT', () => {
            return EventStore.deployed()
                .then((_esInstance) => {
                    return _esInstance
                        .emitEvent(event.Type, event.AddressValue, event.UIntValue, event.StringValue, {
                            from: accounts[0],
                            gas: 2000000
                        })
                })
                .then((tx) => {
                    let events = eventsFromTransaction(tx);
                    // console.log(events);
                    assert.equal(events.length, 1);
                    assert.equal(events[0].Type, event.Type);
                    assert.equal(events[0].AddressValue, event.AddressValue);
                    assert.equal(events[0].UIntValue, event.UIntValue);
                    assert.equal(events[0].StringValue, event.StringValue);
                })
        })
    })

    describe('readEvent', () => {
        it('should return the event object [EXPENSIVE]', () => {
            return EventStore.deployed()
                .then((_esInstance) => {
                    return readEvent(_esInstance, 0);
                })
                .then((eventObject) => {
                    // console.log("eventObject: ", eventObject)
                    assert.equal(eventObject.Type, event.Type);
                    assert.equal(eventObject.AddressValue, event.AddressValue);
                    assert.equal(eventObject.UIntValue, event.UIntValue);
                    assert.equal(eventObject.StringValue, event.StringValue);
                })
        })
    })

    describe('readEvents', () => {
        it('should return all event objects [EXPENSIVE]', () => {
            return EventStore.deployed()
                .then((_esInstance) => {
                    return readEvents(_esInstance);
                })
                .then((eventObjects) => {
                    // console.log('eventObjects: ', eventObjects)
                    assert.equal(eventObjects.length, 1);
                    let eventObject = eventObjects[0];
                    assert.equal(eventObject.Type, event.Type);
                    assert.equal(eventObject.AddressValue, event.AddressValue);
                    assert.equal(eventObject.UIntValue, event.UIntValue);
                    assert.equal(eventObject.StringValue, event.StringValue);
                })
        })
    })
})