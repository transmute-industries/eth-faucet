pragma solidity ^0.4.8;

library ArrayUtils {

  struct ArrayList {
      address[] values;
      mapping(address => bool) addressToExistsMapping;
      mapping(address => uint) addressToIndexMapping;
      mapping(uint => address) indexToAddressMapping;
      uint nextEmptyIndex;
  }

  function insert(ArrayList storage self, address value)
      returns (bool)
  {
      if (self.addressToExistsMapping[value])
          return false;
      self.addressToExistsMapping[value] = true;
      self.addressToIndexMapping[value] = self.nextEmptyIndex;
      self.indexToAddressMapping[self.nextEmptyIndex] = value;
      if (self.values.length > self.nextEmptyIndex) {
          self.values.push(value);
          self.nextEmptyIndex++;
      }
/*else {
          self.values[self.nextEmptyIndex++] = value;
      }*/
      return true;
  }

  function remove(ArrayList storage self, address value)
      returns (bool)
  {
      if (!self.addressToExistsMapping[value])
          return false;
      self.addressToExistsMapping[value] = false;
      self.nextEmptyIndex = self.addressToIndexMapping[value];
      delete self.indexToAddressMapping[self.addressToIndexMapping[value]];
      delete self.values[self.addressToIndexMapping[value]];
      delete self.addressToIndexMapping[value];
      return true;
  }

  function contains(ArrayList storage self, address value)
      returns (bool)
  {
      return self.addressToExistsMapping[value];
  }

  function indexOf(ArrayList storage self, address value)
      returns (uint)
  {
      if (!self.addressToExistsMapping[value])
          return uint(-1);
      return self.addressToIndexMapping[value];
  }
}
