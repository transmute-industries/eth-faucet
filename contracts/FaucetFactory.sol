pragma solidity ^0.4.8;
import "./Faucet.sol";

contract FaucetFactory {
  
  address[] public faucetAddresses;

	function createFaucet() payable returns (address) {
		Faucet newFaucet = new Faucet(msg.value, msg.sender);
    faucetAddresses.push(address(newFaucet));
    if (!newFaucet.send(msg.value)) {
      throw;
    }
    return address(newFaucet);
	}

  function getAllFaucets() constant returns(address[] faucetAddresses)  {
    return faucetAddresses;
  }

}