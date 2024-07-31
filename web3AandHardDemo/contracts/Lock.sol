// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
    address public owner;
    function setOwner(address _owner) public {
        owner = _owner;
    }
}
