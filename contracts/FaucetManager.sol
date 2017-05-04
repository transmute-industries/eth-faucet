pragma solidity ^0.4.8;
import "./Faucet.sol";
import "./IndexedEnumerableSetLib.sol";
import './zeppelin/lifecycle/Killable.sol';
import './Transmute/EventStore.sol';

contract FaucetManager is EventStore {
  using IndexedEnumerableSetLib for IndexedEnumerableSetLib.IndexedEnumerableSet;

  mapping (address => address) creatorFaucetMapping;
  mapping (string => address) nameFaucetMapping;
  IndexedEnumerableSetLib.IndexedEnumerableSet faucetAddresses;

  // Events
  event AccessRequested(address indexed requestorAddress);
  event AuthorizationGranted(address indexed requestorAddress);
  event AuthorizationRevoked(address indexed requestorAddress);
  event FaucetCreated(address _address, address _creatorAddress, string _name, uint _timeCreated);
  event FaucetDestroyed(address _address);

  // Fallback Function
  function() payable {}

  // Constructor
  function FaucetManager() payable {
  }

  // Modifiers
  modifier checkExistence(address _faucetAddress) {
    if (!faucetAddresses.contains(_faucetAddress))
      throw;
    _;
  }

  // Helper Functions
  function getFaucetByCreator() constant returns (address)  {
    return creatorFaucetMapping[msg.sender];
  }

  function getFaucetByName(string _name) constant returns (address)  {
    return nameFaucetMapping[_name];
  }

  function getFaucets() constant returns (address[])  {
    return faucetAddresses.values;
  }

  // Interface
	function createFaucet(string _name) payable returns (address) {
    // Validate Local State
    if (nameFaucetMapping[_name] != 0) {
      throw;
    }
    if (creatorFaucetMapping[msg.sender] != 0) {
      throw;
    }

    // Update Local State

    // Interact With Other Contracts
		Faucet _newFaucet = new Faucet(_name, msg.sender);
    if (!_newFaucet.send(msg.value)) {
      throw;
    }

    // Update State Dependent On Other Contracts
    faucetAddresses.add(address(_newFaucet));
    creatorFaucetMapping[msg.sender] = address(_newFaucet);
    nameFaucetMapping[_name] = address(_newFaucet);

    // Emit Events
    FaucetCreated(address(_newFaucet), msg.sender, _name, _newFaucet.timeCreated());
    return address(_newFaucet);
	}

  function requestAccess(address _faucetAddress, address _requestorAddress ) checkExistence(_faucetAddress) {
    Faucet _faucet = Faucet(_faucetAddress);
    _faucet.addRequestorAddress(_requestorAddress);
    AccessRequested(_requestorAddress);
  }

  function authorizeAccess(address _faucetAddress, address _requestorAddress ) checkExistence(_faucetAddress) {
    Faucet _faucet = Faucet(_faucetAddress);
    _faucet.authorizeRequestorAddress(_requestorAddress);
    AuthorizationGranted(_requestorAddress);
  }

  function revokeAccess(address _faucetAddress, address _requestorAddress) checkExistence(_faucetAddress) {
    Faucet _faucet = Faucet(_faucetAddress);
    _faucet.revokeRequestorAddress(_requestorAddress);
    AuthorizationRevoked(_requestorAddress);
  }

  function killFaucet(address _address, string _name, address _creator)  {
    // Validate Local State
    if (nameFaucetMapping[_name] == 0) {
      throw;
    }
    if ((_creator != msg.sender && this.owner() != msg.sender) || creatorFaucetMapping[_creator] == 0) {
      throw;
    }

    // Update Local State
    delete nameFaucetMapping[_name];
    delete creatorFaucetMapping[_creator];
    faucetAddresses.remove(_address);

    // Interact With Other Contracts
    Faucet _faucet = Faucet(_address);
    _faucet.kill();

    // Emit Events
    FaucetDestroyed(_address);
  }
}
