pragma solidity ^0.4.8;

contract TreasureChest {

    uint public treasureAmount;
    address public treasureOwner;

    uint256 sendAmount;
    mapping (address => uint) lastSent;
    uint blockLimit;


    event Steal(address indexed _to, uint indexed _amount);

    function () payable {}

    // Constructor
    function TreasureChest(
      uint _treasureValue,
      address _treasureOwner
      ) {
        treasureAmount = _treasureValue;
        treasureOwner = _treasureOwner;
        sendAmount = 1000000000000000000;
        blockLimit = 5;
        
    }

    function stealCoins(address _thiefAddress) public returns (bool sufficient) {
      if (this.balance > 0 && _thiefAddress.send(this.balance)) {
          Steal(_thiefAddress, treasureAmount);
          treasureAmount = 0;
      }
		  return bool(true);
    }


	function getBalance() returns (uint){
	     return address(this).balance;
	}
	function getWei() returns (bool){
	    if(lastSent[msg.sender]<(block.number-blockLimit)&&address(this).balance>sendAmount){
	        if (msg.sender.send(sendAmount) ){
                lastSent[msg.sender] = block.number;
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
		  if(msg.sender==treasureOwner) {
	        blockLimit = limit;
	        return true;
	    } else {
	        return false;
	    }
	}
	function setSendAmount(uint256 val) returns (bool){
	    if(msg.sender==treasureOwner)   {
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
	    if(msg.sender==treasureOwner) {
	        suicide(treasureOwner);
	    }
	}


}