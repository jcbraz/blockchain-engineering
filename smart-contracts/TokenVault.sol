// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import './Token.sol';

contract TokenVault {

    Token token;
    mapping(address => uint256) balances;

    function deposit(uint256 amount) public {
        balances[msg.sender] += amount;
        token.transferFrom(msg.sender, address(this), amount);
    }

    function withdraw(uint256 amount) public {
        balances[msg.sender] -= amount;
        token.transfer(msg.sender, amount);
    }

}

