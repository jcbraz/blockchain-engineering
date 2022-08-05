// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;


contract Token {
    string private name;
    string private symbol;
    address owner;

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
        owner = msg.sender;
    }


    mapping(address => uint256) balances;

    function balanceOF(address ad) public view returns (uint256) {
        return balances[ad];
    }

    function transfer(address to, uint256 amount) public payable {
        require(msg.sender == owner, "Wrong address");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function transferFrom(address from, address to, uint256 amount) public payable {
        require(balanceOF(from) > 0, "Insuficient funds");
        balances[from] -= amount;
        balances[to] += amount;
    }

    function chargeFee(uint256 fee) private {
        require(balances[msg.sender] > 0,"Insufficient balance");
        balances[msg.sender] += msg.value / fee;
    }

    function mint() public payable {
        require(msg.sender == owner,"Wrong address");
        balances[msg.sender] += msg.value;
        chargeFee(100);
    }

    function burn(uint256 amount) public {
        require(msg.sender == owner,"Wrong address");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
}