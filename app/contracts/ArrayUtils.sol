pragma solidity ^0.4.8;

library ArrayUtils {

  /** Finds the index of a given value in an array. */
  function indexOf(address[] storage self, address value) returns (uint) {
      for (uint i = 0; i < self.length; i++)
          if (self[i] == value) return i;
      return uint(-1);
  }

  /** Removes the given value in an array. */
  /*function remove(address[] storage self, address value) returns (address[]) {
      uint index = indexOf(self, value);
      if (index < self.length-1) {
          delete self[index];
      }
      return self;
  }*/
}
