pragma solidity ^0.4.8;
import "./Faucet.sol";

contract FaucetFactory {
  uint public lastValue;
  address public lastAddress;

	function createFaucet() payable returns (address) {
    lastValue = msg.value;
    lastAddress = msg.sender;
		Faucet newFaucet = new Faucet(msg.value, msg.sender);
    if (!newFaucet.send(msg.value)) {
      throw;
    }
    return address(newFaucet);
	}
}