pragma solidity ^0.4.2;
import '../zeppelin/lifecycle/Killable.sol';

contract EventStore is Killable{

  uint public eventCount;
  uint[] public Ids;

  mapping (uint => string) typeMap;
  mapping (uint => string) valueMap;
  mapping (uint => address) addressMap;

  event NEW_EVENT(uint Id, string Type, string Value, address Address);

  function getVersion() constant returns (uint) {
    return 1;
  }

  function getEventIds() constant returns (uint[]) {
    return Ids;
  }

  function emitEvent(string _type, string _value, address _address) 
    returns (bool)
  {
    
    Ids.push(eventCount);

    typeMap[eventCount] =  _type;
    valueMap[eventCount] =  _value;
    addressMap[eventCount] =  _address;
    
    NEW_EVENT(eventCount, _type, _value, _address);

    eventCount = eventCount + 1;
    return true;
  }

  function getType(uint eventId) constant returns (string) {
    return typeMap[eventId];
  }
  
  function getValue(uint eventId) constant returns (string) {
    return valueMap[eventId];
  }

  function getAddress(uint eventId) constant returns (address) {
    return addressMap[eventId];
  }

  


}
