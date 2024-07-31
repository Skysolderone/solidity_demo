// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

// import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract MyToken is ERC20Upgradeable {
    function initialize() public initializer {
        __ERC20_init("MyToken", "MTK");
        _mint(msg.sender, 10000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
