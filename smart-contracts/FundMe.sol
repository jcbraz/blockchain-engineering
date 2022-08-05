// Get funds from users
// Withdraw funds
// Set a minimum funding value in USD

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract FundMe {

    uint256 public minimumUSD = 50;

    function fund() public payable {
        // want to be able to set a minimum fund amount in USD
        // 1. How do we send ETH to this contract
        // Code to require the user to send 1 ETH, 1 ETH == 1e18 WEI
        // require(msg.value > 1e18,"Not enough ETH!"); // 1e18 == 1 * 10 ** 10 ** 18 == 10000000000000000000

        // Reverting:
        // if the require is not met, all the decarations above the "require" are undone and the remaining gas is returned


        require(msg.value >= minimumUSD,"Not enough USD!");
        
    }
}

// Beggineer debugging tips (can be usefull ...ß)

// Limit tinkering / triaging for 20 minutes -> bug "try" to fix
// Take at least 15 minutes yourself -> or be 100% sure you exhausted all options.

// 1. Tinker and try to pinpoint exactly what is going on
// 2. Google the exact same error -> quotes can help (for copy and paste the error)
// 3. Ask a question on a forum like Stack Exchange Ethereum (ethereum.stackexchange.com)

// Ask the perfect question on forums:
// 1. Search
// 2. Summarizing Title
// 3. Introduce the problem first
// 4. Add minimalistic code
// 5. Use backpacks (Markdown ```)
// 6. Use Tags
// 7. Read Forum Rules