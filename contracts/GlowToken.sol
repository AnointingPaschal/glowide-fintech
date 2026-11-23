// SPDX-License-Identifier: MIT
// GlowIDE — GlowToken (GLOW), testnet only.
// Deploy to Arc Testnet only for demo/testing. NOT audited. Do not deploy to mainnet
// without a professional audit, verified USDC/bridge configuration and legal review.
pragma solidity ^0.8.24;
contract GlowToken {
    string public constant name = "GlowIDE Token";
    string public constant symbol = "GLOW";
    uint8 public constant decimals = 18;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    address public owner;
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    constructor(uint256 initialSupply) { owner = msg.sender; totalSupply = initialSupply; balanceOf[msg.sender] = initialSupply; emit Transfer(address(0), msg.sender, initialSupply); }
    function transfer(address to, uint256 value) external returns (bool) {
        require(to != address(0), "zero address"); require(balanceOf[msg.sender] >= value, "insufficient");
        balanceOf[msg.sender] -= value; balanceOf[to] += value; emit Transfer(msg.sender, to, value); return true;
    }
    function approve(address spender, uint256 value) external returns (bool) { allowance[msg.sender][spender] = value; emit Approval(msg.sender, spender, value); return true; }
    function transferFrom(address from, address to, uint256 value) external returns (bool) {
        require(balanceOf[from] >= value, "insufficient"); require(allowance[from][msg.sender] >= value, "allowance");
        allowance[from][msg.sender] -= value; balanceOf[from] -= value; balanceOf[to] += value; emit Transfer(from, to, value); return true;
    }
}
