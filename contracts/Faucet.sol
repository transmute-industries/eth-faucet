pragma solidity ^0.4.8;

contract Faucet {

    uint public faucetBalance;
    address public faucetOwner;

    uint256 sendAmount;
    mapping (address => uint) lastSent;
    uint blockLimit;

    event EtherRequested(address indexed fromAddress);
	event EtherSent(address indexed toAddress);

    function () payable {}

    // Constructor
    function Faucet(
      uint _value,
      address _owner
      ) {
        faucetBalance = _value;
        faucetOwner = _owner;
        sendAmount = 1000000000000000000;
        blockLimit = 5;
    }
   
	function getBalance() returns (uint){
	     return address(this).balance;
	}
	function getWei() returns (bool){
	    if(lastSent[msg.sender]<(block.number-blockLimit)&&address(this).balance>sendAmount){
	        if (msg.sender.send(sendAmount) ){
                lastSent[msg.sender] = block.number;
				EtherRequested(msg.sender );
	            return true;
            } else {
                throw;
            }
	    } else {
	        return false;
	    }
	}
	function sendWei(address recp) returns (bool){
		  if(lastSent[msg.sender]<(block.number-blockLimit)&&address(this).balance>sendAmount){
	        if (recp.send(sendAmount) ){
                lastSent[msg.sender] = block.number;
				EtherSent(msg.sender );
	            return true;
            } else{
                throw;
            }
	        
	    } else {
	        return false;
	    }
	}
	function getRemainingBlocks() returns (uint){
	     if(blockLimit>(block.number-lastSent[msg.sender]))
          return blockLimit-(block.number-lastSent[msg.sender]);
       else
          return 0;
	}
	function getBlockLimit() returns (uint){
		  return blockLimit;
	}
	function setBlockLimit(uint limit) returns (bool){
		  if(msg.sender==faucetOwner) {
	        blockLimit = limit;
	        return true;
	    } else {
	        return false;
	    }
	}
	function setSendAmount(uint256 val) returns (bool){
	    if(msg.sender==faucetOwner)   {
	        sendAmount = val;
	        return true;
	    } else {
	        return false;
	    }
	}
	function getSendAmount() returns (uint256){
	    return sendAmount;
	}
	function killMe(){
	    if(msg.sender==faucetOwner) {
	        suicide(faucetOwner);
	    }
	}


}