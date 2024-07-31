// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WsNft is ERC721, Ownable {
    uint256 private tokenCounter = 0;

    constructor() ERC721("WSNFT", "WSNFT") Ownable(_msgSender()) {
        _mint(_msgSender(), tokenCounter);
        tokenCounter += 1;
    }

    function mint(address _to) public onlyOwner {
        _safeMint(_to, tokenCounter);
        tokenCounter += 1;
    }
}
