pragma solidity ^0.4.8;

library ArrayUtils {

  /** Finds the index of a given value in an array. */
  function IndexOf(address[] array, address value) returns(uint) {
    uint index = 0;
    while (index < array.length-1 && array[index] != value) {
      index++;
    }
    return index;
  }

  /** Removes the given value in an array. */
  function RemoveByValue(address[] array, address value) {
    uint index = IndexOf(array, value);
    RemoveByIndex(array, index);
  }

  /** Removes the value at the given index in an array. */
  function RemoveByIndex(address[] array, uint index) {
    if (index < array.length-1) {
      delete array[index];
    }
  }
}
