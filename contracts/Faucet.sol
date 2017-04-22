pragma solidity ^0.4.8;
import './zeppelin/lifecycle/Killable.sol';

contract Faucet is Killable {
    uint256 sendAmount;
    mapping (address => uint) lastSent;
    uint blockLimit;
    bytes32 public name;
    uint public timeCreated;

    event EtherRequested(address indexed fromAddress, uint256 indexed sentAmount);
    event EtherSent(address indexed toAddress);

    function () payable {}

    // Constructor
    function Faucet(bytes32 _name) {
        timeCreated = now;
        name = _name;
        sendAmount = 1000000000000000000;
        blockLimit = 0;
    }

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

  	function getBalance() returns (uint){
        return address(this).balance;
  	}

  	function getWei() returns (bool) {
  	    if(lastSent[msg.sender] < (block.number-blockLimit) && address(this).balance > sendAmount) {
  	        if (msg.sender.send(sendAmount)) {
                lastSent[msg.sender] = block.number;
				        EtherRequested(msg.sender, sendAmount);
	              return true;
            } else {
                throw;
            }
  	    } else {
  	        return false;
  	    }
  	}

  	function sendWei(address recp) returns (bool) {
  		  if(lastSent[msg.sender] < (block.number-blockLimit) && address(this).balance > sendAmount) {
  	        if (recp.send(sendAmount)) {
                lastSent[msg.sender] = block.number;
				        EtherSent(msg.sender);
	              return true;
            } else {
                throw;
            }
  	    } else {
  	        return false;
  	    }
  	}

  	function getRemainingBlocks() returns (uint) {
        if(blockLimit > (block.number-lastSent[msg.sender]))
            return blockLimit-(block.number-lastSent[msg.sender]);
        else
            return 0;
  	}

  	function refundRemainingBalance() returns (bool) {
        if (owner.send(address(this).balance)) {
            return true;
        } else {
            throw;
        }
  	}

    function destroy() {
        selfdestruct(owner);
    }
}
