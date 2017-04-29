pragma solidity ^0.4.8;
import "./ArrayUtils.sol";
import './zeppelin/lifecycle/Killable.sol';

contract Faucet is Killable {
    using ArrayUtils for address[];

    mapping (address => uint) lastSent;
    mapping (address => bool) authorizedAddressesMapping;
    address[] public requestorAddresses;
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
      if (msg.sender != creator)
        throw;
      _;
    }

    modifier onlyAuthorized() {
      if (msg.sender != creator && !authorizedAddressesMapping[msg.sender])
        throw;
      _;
    }

    modifier isAvailable() {
      if (lastSent[msg.sender] >= (block.number-blockLimit) || address(this).balance <= sendAmount)
        throw;
      _;
    }

    // Getters and Setters
  	function setBlockLimit(uint limit) returns (bool){
        blockLimit = limit;
        return true;
  	}

  	function getBlockLimit() returns (uint){
  		  return blockLimit;
  	}

  	function setSendAmount(uint256 val) returns (bool){
        sendAmount = val;
        return true;
  	}

  	function getSendAmount() returns (uint256){
  	    return sendAmount;
  	}

    // Helper Functions
  	function getBalance() returns (uint){
        return address(this).balance;
  	}

    function getRequestorAddresses() constant returns (address[]) {
      return requestorAddresses;
    }

  	function getRemainingBlocks() returns (uint) {
        if(blockLimit > (block.number-lastSent[msg.sender]))
            return blockLimit-(block.number-lastSent[msg.sender]);
        else
            return 0;
  	}

    function addRequestorAddress(address _requestor) public {
        if (requestorAddresses.indexOf( _requestor) != uint(-1))
            throw;
        requestorAddresses.push(_requestor);
        authorizedAddressesMapping[_requestor] = false;
    }

    function authorizeRequestorAddress(address _requestor) public {
        if (requestorAddresses.indexOf(_requestor) == uint(-1))
            throw;
        if (authorizedAddressesMapping[_requestor])
            throw;
        authorizedAddressesMapping[_requestor] = true;
    }

    function revokeRequestorAddress(address _requestor) public {
        if (requestorAddresses.indexOf(_requestor) == uint(-1))
            throw;
        if (!authorizedAddressesMapping[_requestor])
            throw;
        authorizedAddressesMapping[_requestor] = false;
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
