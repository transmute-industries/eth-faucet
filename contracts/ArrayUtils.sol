pragma solidity ^0.4.8;

library ArrayUtils {

  struct ArrayList {
      address[] values;
      mapping(address => bool) addressToExistsMapping;
      mapping(address => uint) addressToIndexMapping;
      mapping(uint => address) indexToAddressMapping;
      uint numberOfValues;
  }

  function insert(ArrayList storage self, address value)
      returns (bool)
  {
      if (self.addressToExistsMapping[value])
          return false;
      self.addressToExistsMapping[value] = true;
      self.addressToIndexMapping[value] = self.numberOfValues;
      self.indexToAddressMapping[self.numberOfValues] = value;
      if (self.values.length <= self.numberOfValues) {
          self.values.push(value);
          self.numberOfValues++;
      } else {
          for (uint i = 0; i < self.values.length; i++) {
              if (self.values[i] == 0) {
                  self.values[i] = value;
                  self.numberOfValues++;
                  return true;
              }
          }
      }
      return false;
  }

  function remove(ArrayList storage self, address value)
      returns (bool)
  {
      if (!self.addressToExistsMapping[value])
          return false;
      self.addressToExistsMapping[value] = false;
      self.numberOfValues--;
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
