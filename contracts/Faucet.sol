pragma solidity ^0.4.8;
import "./IndexedEnumerableSetLib.sol";
import './Transmute/EventStore.sol';

contract Faucet is EventStore  {
    using IndexedEnumerableSetLib for IndexedEnumerableSetLib.IndexedEnumerableSet;

    mapping (address => uint) lastSent;
    mapping (address => bool) authorizedAddressesMapping;
    IndexedEnumerableSetLib.IndexedEnumerableSet requestorAddresses;
    address public creator;
    string public name;
    uint public timeCreated;

    uint256 sendAmount;
    uint blockLimit;

    // Events
    event EtherRequested(address indexed fromAddress, uint256 indexed sentAmount);
    event EtherSent(address indexed toAddress);

    // Fallback Function
    function() payable {}

    // Constructor
    function Faucet(string _name, address _creator) {
        timeCreated = now;
        name = _name;
        creator = _creator;
        sendAmount = 1000000000000000000;
        blockLimit = 0;
    }

    // Modifiers
    modifier onlyCreator() {
      if (tx.origin != creator)
        throw;
      _;
    }

    modifier onlyAuthorized() {
      if (tx.origin != creator && !authorizedAddressesMapping[tx.origin])
        throw;
      _;
    }

    modifier isAvailable() {
      if (lastSent[tx.origin] >= (block.number - blockLimit) || address(this).balance <= sendAmount)
        throw;
      _;
    }

    // Getters and Setters
  	function setBlockLimit(uint limit) onlyCreator returns (bool) {
        blockLimit = limit;
        return true;
  	}

  	function getBlockLimit() returns (uint) {
  		  return blockLimit;
  	}

  	function setSendAmount(uint256 val) onlyCreator returns (bool) {
        sendAmount = val;
        return true;
  	}

  	function getSendAmount() returns (uint256) {
  	    return sendAmount;
  	}

    // Helper Functions
  	function getBalance() returns (uint) {
        return address(this).balance;
  	}

    function getRequestorAddresses() constant returns (address[]) {
      return requestorAddresses.values;
    }

  	function getRemainingBlocks() returns (uint) {
        if(blockLimit > (block.number-lastSent[tx.origin]))
            return blockLimit-(block.number-lastSent[tx.origin]);
        else
            return 0;
  	}

    function addRequestorAddress(address _requestor) public {
        if (requestorAddresses.contains(_requestor))
            throw;
        requestorAddresses.add(_requestor);
        authorizedAddressesMapping[_requestor] = false;
        emitEvent('FAUCET_ADDRESS_ACCESS_REQUESTED', _requestor, 1, '');
    }

    function authorizeRequestorAddress(address _requestor) public onlyCreator {
        if (!requestorAddresses.contains(_requestor))
            throw;
        if (authorizedAddressesMapping[_requestor])
            throw;
        authorizedAddressesMapping[_requestor] = true;
        emitEvent('FAUCET_ADDRESS_ACCESS_GRANTED', _requestor, 1, '');
    }

    function revokeRequestorAddress(address _requestor) public onlyCreator {
        if (!requestorAddresses.contains(_requestor))
            throw;
        if (!authorizedAddressesMapping[_requestor])
            throw;
        authorizedAddressesMapping[_requestor] = false;
        emitEvent('FAUCET_ADDRESS_ACCESS_REVOKED', _requestor, 1, '');
    }

    function isAddressAuthorized(address _address) public constant returns (bool) {
        return authorizedAddressesMapping[_address];
    }

    // Interface
  	function sendWei(address recp) onlyAuthorized isAvailable {
        if (!recp.send(sendAmount)) {
            throw;
        }
        lastSent[msg.sender] = block.number;
        EtherSent(msg.sender);
  	}

  	function getWei() onlyAuthorized isAvailable {
        if (!msg.sender.send(sendAmount)) {
            throw;
        }
        lastSent[msg.sender] = block.number;
        EtherRequested(msg.sender, sendAmount);
  	}

}
