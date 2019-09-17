pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract CubToken is ERC20, Ownable {

    string public constant name = "CubToken";
    string public constant symbol = "CUB";
    uint32 public constant decimals = 5;
    uint256 public constant initialSupply = 999 * 10 ** decimals;

    constructor() public {
        _mint(msg.sender, initialSupply);
    }

    function proxyTransfer(address targetAddr, uint256 amount) public returns (bool success) {
        return super.transfer(targetAddr, amount);
    }
}