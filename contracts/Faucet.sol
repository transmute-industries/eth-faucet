contract Faucet {
    address owner;
    uint256 sendAmount;
    mapping (address => uint) lastSent;
    uint blockLimit;
    function Faucet(){
        owner = msg.sender;
        sendAmount = 1000000000000000000;
        blockLimit = 5;
    }
	function getBalance() returns (uint){
	     return address(this).balance;
	}
	function getWei() returns (bool){
	    if(lastSent[msg.sender]<(block.number-blockLimit)&&address(this).balance>sendAmount){
	        msg.sender.send(sendAmount);
	        lastSent[msg.sender] = block.number;
	        return true;
	    } else {
	        return false;
	    }
	}
	function sendWei(address recp) returns (bool){
		  if(lastSent[msg.sender]<(block.number-blockLimit)&&address(this).balance>sendAmount){
	        recp.send(sendAmount);
	        lastSent[msg.sender] = block.number;
	        return true;
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
		  if(msg.sender==owner) {
	        blockLimit = limit;
	        return true;
	    } else {
	        return false;
	    }
	}
	function setSendAmount(uint256 val) returns (bool){
	    if(msg.sender==owner)   {
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
	    if(msg.sender==owner) {
	        suicide(owner);
	    }
	}
}