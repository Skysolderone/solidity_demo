// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MyContractV2 {
    mapping(address => bool) public accessAllowed;
    uint public data;

    function setData(uint _data) public {
        require(accessAllowed[msg.sender], "Access not allowed");
        data = _data;
    }

    function getData() public view returns (uint) {
        return data;
    }

    function grantAccess(address _addr) public {
        accessAllowed[_addr] = true;
    }

    function revokeAccess(address _addr) public {
        accessAllowed[_addr] = false;
    }
}
