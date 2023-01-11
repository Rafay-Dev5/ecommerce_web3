// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Transaction{
    
    string public name;
    uint public productCount = 0;
    mapping(uint => Product) public products;

    struct Product {
        uint id;
        string name;
        uint price;
        string image;
        address owner;
        bool purchased;
    }

    event ProductCreated(
        uint id,
        string name,
        uint price,
        string image,
        address owner,
        bool purchased
    );

    event ProductPurchased(
        uint id,
        string name,
        uint price,
        string image,
        address owner,
        bool purchased
    );

    constructor() {
        name = "BLN Project 22";
    }

    function createProduct(string memory _name, uint _price,string memory _image) public {
        // Increment product count
        ++productCount;
        // Create the product
        products[productCount] = Product(productCount, _name, _price,_image,msg.sender, false);
        // Trigger an event
        emit ProductCreated(productCount, _name, _price,_image,msg.sender, false);
    }

    function deposit(uint _id) external payable{
        Product memory _product = products[_id];
        _product.purchased = true;
        _product.owner = msg.sender;
        products[_id] = _product;
        emit ProductPurchased(productCount, _product.name, _product.price,_product.image,_product.owner,true);
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

    function dep() external payable{
        
    }
}