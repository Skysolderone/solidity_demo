// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "./upgrade.sol";

contract MyToken2 is MyToken {
    function burn(address from, uint256 _amount) public {
        _burn(from, _amount);
    }
}
