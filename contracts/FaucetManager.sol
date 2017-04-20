pragma solidity ^0.4.8;
import "./Faucet.sol";
import './zeppelin/lifecycle/Killable.sol';

contract FaucetManager is Killable {

  mapping (address => address) creatorFaucetMapping;
  mapping (bytes32 => address) nameFaucetMapping;

  event FaucetCreated(
    address _address,
    address _creatorAddress,
    bytes32 _name,
    uint _timeCreated
  );

	function createFaucet(bytes32 _name) payable returns (address) {
    // Validate Local State
    if (nameFaucetMapping[_name] != 0) {
      throw;
    }
    if (creatorFaucetMapping[msg.sender] != 0) {
      throw;
    }

    // Update Local State

    // Interact With Other Contracts
		Faucet _newFaucet = new Faucet(_name);
    if (!_newFaucet.send(msg.value)) {
      throw;
    }

    // Update State Dependent On Other Contracts
    creatorFaucetMapping[msg.sender] = address(_newFaucet);
    nameFaucetMapping[_name] = address(_newFaucet);

    // Emit Events
    FaucetCreated(address(_newFaucet), msg.sender, _newFaucet.name(), _newFaucet.timeCreated());
    return address(_newFaucet);
	}

  function faucetByCreator() constant returns(address)  {
    return creatorFaucetMapping[msg.sender];
  }

  function faucetByName(bytes32 _name) constant returns(address)  {
    return nameFaucetMapping[_name];
  }

  function killFaucet(address _address, bytes32 _name, address _creator) constant returns(bool)  {
    Faucet _faucet = Faucet(_address);
    if (nameFaucetMapping[_name] == 0) {
      throw;
    }
    if ((_creator != msg.sender && this.owner() != msg.sender) || creatorFaucetMapping[_creator] == 0) {
      throw;
    }
    if (!_faucet.refundRemainingBalance()) {
      throw;
    }
    /*delete nameFaucetMapping[_name];
    delete creatorFaucetMapping[_creator];
    _faucet.kill();*/
    return true;
  }
}
