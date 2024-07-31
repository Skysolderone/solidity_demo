// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract WsToken is ERC20, Ownable {
    uint8 public decimals_;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _amount,
        uint8 _decimal
    ) ERC20(_name, _symbol) Ownable(_msgSender()) {
        decimals_ = _decimal;
        _mint(_msgSender(), _amount);
    }

    // constructor() Ownable(_msgSender)
    // function initialize(
    //     string memory _name,
    //     string memory _symbol,
    //     uint256 _amount,
    //     uint8 _decimal
    // ) public {
    //     __ERC20_init(_name, _symbol);
    //     __Ownable_init(_msgSender());
    //     decimals_ = _decimal;
    //     _mint(_msgSender(), _amount);
    // }

    // function initialize(
    //     string memory _name,
    //     string memory _symbol,
    //     uint256 _amount,
    //     uint8 _decimal
    // ) public initializer {
    //     decimals = _decimal;
    //     __ERC20_init(_name, _symbol);
    //     _mint(_msgSender(), _amount);
    // }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function decimals() public view override returns (uint8) {
        return decimals_;
    }

    function approve(
        address to,
        uint256 amount
    ) public override returns (bool) {
        address owner = _msgSender();
        _approve(owner, to, amount);
        return true;
    }
}
