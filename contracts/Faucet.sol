pragma solidity ^0.4.2;

import './zeppelin/ownership/Ownable.sol';

contract Faucet is Ownable {
    address[] public addresses;

    function getBalance() returns (uint) {
        return this.balance;
    }
    
    function addAddress(address addr) onlyOwner {
        addresses.push(addr);
    }
    
    function withdrawl(uint amount) {
        for (uint i = 0; i < addresses.length; i++) {
            if(msg.sender == addresses[i]){

				if (this.balance > amount ){
						if(!msg.sender.send(amount)){
							throw;
						}
				}
            }
        }
    }
    
    function deposit() payable {
        
    }
}