pragma solidity ^0.4.8;
import "./TreasureChest.sol";

contract TreasureChestFactory {
  uint public lastValue;
  address public lastAddress;

	function createTreasureChest() payable returns (address) {
    lastValue = msg.value;
    lastAddress = msg.sender;
		TreasureChest newTreasureChest = new TreasureChest(msg.value, msg.sender);
    if (!newTreasureChest.send(msg.value)) {
      throw;
    }
    return address(newTreasureChest);
	}
}