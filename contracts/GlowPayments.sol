// SPDX-License-Identifier: MIT
// GlowIDE — GlowPayments, testnet only. Escrows a payment until released/refunded.
// NOT audited. Testnet only. Production use requires audit + verified settlement flow:
// a payment must only be marked successful when settlement evidence is verified off-chain.
pragma solidity ^0.8.24;
interface IERC20 { function transferFrom(address from, address to, uint256 value) external returns (bool); function transfer(address to, uint256 value) external returns (bool); }
contract GlowPayments {
    address public owner;
    struct Payment { address payer; address payee; address token; uint256 amount; bytes32 idempotencyKey; bool released; bool refunded; }
    mapping(bytes32 => Payment) public payments;
    event PaymentCreated(bytes32 indexed id, address indexed payer, address indexed payee, uint256 amount);
    event PaymentReleased(bytes32 indexed id);
    event PaymentRefunded(bytes32 indexed id);
    constructor() { owner = msg.sender; }
    modifier onlyOwner() { require(msg.sender == owner, "not owner"); _; }
    function createPayment(bytes32 id, address payee, address token, uint256 amount) external {
        require(payments[id].payer == address(0), "duplicate idempotency key");
        require(payee != address(0) && amount > 0, "invalid");
        require(IERC20(token).transferFrom(msg.sender, address(this), amount), "transfer failed");
        payments[id] = Payment(msg.sender, payee, token, amount, id, false, false);
        emit PaymentCreated(id, msg.sender, payee, amount);
    }
    function release(bytes32 id) external onlyOwner {
        Payment storage p = payments[id]; require(p.payer != address(0) && !p.released && !p.refunded, "invalid state");
        p.released = true; require(IERC20(p.token).transfer(p.payee, p.amount), "release failed"); emit PaymentReleased(id);
    }
    function refund(bytes32 id) external onlyOwner {
        Payment storage p = payments[id]; require(p.payer != address(0) && !p.released && !p.refunded, "invalid state");
        p.refunded = true; require(IERC20(p.token).transfer(p.payer, p.amount), "refund failed"); emit PaymentRefunded(id);
    }
}
