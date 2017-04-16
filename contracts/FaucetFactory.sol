pragma solidity ^0.4.8;
import "./Faucet.sol";

contract FaucetFactory {
  
  address[] public faucetAddresses;

  event FaucetCreated(address creatorAddress);

	function createFaucet() payable returns (address) {
		Faucet newFaucet = new Faucet(msg.value, msg.sender);
    faucetAddresses.push(address(newFaucet));
    FaucetCreated(msg.sender);
    if (!newFaucet.send(msg.value)) {
      throw;
    }
    return address(newFaucet);
	}

  function getAllFaucets() constant returns(address[] faucetAddresses)  {
    return faucetAddresses;
  }

}