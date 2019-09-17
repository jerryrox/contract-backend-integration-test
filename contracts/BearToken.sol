pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract BearToken is ERC20Mintable, Ownable {

    string public constant name = "BearToken";
    string public constant symbol = "BEAR";
    uint32 public constant decimals = 5;
    uint256 public constant initialSupply = 1000 * 10 ** decimals;

    constructor() public {
        mint(msg.sender, initialSupply);
    }
}