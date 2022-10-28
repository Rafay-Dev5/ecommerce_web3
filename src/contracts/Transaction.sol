// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Transaction{
    
    function deposit() external payable{

    }

    function withdraw (address payable _reciever, uint _amount) public{
        _reciever.transfer(_amount);
    }

    function getBalance() external view returns(uint){
        return address(this).balance;
    }

    function getAddress() external view returns(address){
        return address(this);
    }
}