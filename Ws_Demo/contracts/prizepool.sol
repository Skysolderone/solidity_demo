// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract PrizePool is Ownable {
    using SafeERC20 for IERC20;
    address public wsaddress;
    address[3] public addresslist;
    uint8 label = 0;

    constructor(address _wsaddress) Ownable(_msgSender()) {
        addresslist = [address(0), address(0), address(0)];
        wsaddress = _wsaddress;
    }

    function AddList(address to) public {
        addresslist[label] = to;
        label += 1;
        if (label == 3) {
            label = 0;
        }
    }

    function sendShareList() public onlyOwner {
        uint256 amount = IERC20(wsaddress).balanceOf(address(this)) /
            addresslist.length;
        for (uint8 i = 0; i < addresslist.length; i++) {
            sendCoin(addresslist[i], amount);
        }
    }

    function sendCoin(address _to, uint256 _amount) internal {
        IERC20(wsaddress).safeTransfer(_to, _amount);
    }
}
