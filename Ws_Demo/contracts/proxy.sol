// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MyContractProxy {
    address public currentVersion;
    address public owner;

    constructor(address _currentVersion) {
        currentVersion = _currentVersion;
        owner = msg.sender;
    }

    function upgrade(address newVersion) public {
        require(msg.sender == owner, "only owner can upgrade");
        currentVersion = newVersion;
    }

    receive() external payable {}

    fallback() external payable {
        address implementation = currentVersion;
        require(
            implementation != address(0),
            "Contract implementation not set"
        );
        assembly {
            let ptr := mload(0x40)
            calldatacopy(ptr, 0, calldatasize())
            let result := delegatecall(
                gas(),
                implementation,
                ptr,
                calldatasize(),
                0,
                0
            )
            returndatacopy(ptr, 0, returndatasize())

            switch result
            case 0 {
                revert(ptr, returndatasize())
            }
            default {
                return(ptr, returndatasize())
            }
        }
    }
}
