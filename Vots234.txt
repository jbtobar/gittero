pragma solidity ^0.4.11;

contract Vots {
	struct accountHolder {}
	struct Positions {
		seccode;
		qty;
		price;
		varmar;
	}
	struct Order {
		ordernum;
		seccode;
		qty;
		price;
		status;
		balance;
	}
	mapping (bytes32 => Order) public pendingOrders;

	mapping (bytes32 => int) public currentPositions;
    bytes32[] public pendingList;


	address public voterAddress;
	string public username;
	uint public totalTokens;
	bytes32[] public confirmedList;

	function Vots(string _username, uint tokens) {
		voterAddress = msg.sender;
		totalTokens = tokens;
		username = _username;
	}
	

	function createOrder(bytes32 ordernum, int qty, bytes32 seccode, uint price) {
		pendingOrders[ordernum].seccode = seccode
		pendingOrders[ordernum].qty = qty
		if (qty < 0) {qty = qty * -1}
		pendingOrders[ordernum].balance = qty
		pendingOrders[ordernum].price = price
		pendingOrders[ordernum].status = "P"
	}

	function confirmOrder(bytes32 ordernum) {
		if (validOrder(ordernum) == false) throw;
		pendingOrders[ordernum].status = "C" 
	}

	function cancelOrder() {}
	function confirmCancel() {}

	function fillOrder(bytes32 ordernum, int filled) {
		if (validOrder(ordernum) == false) throw;
		if (filled > pendingOrders[ordernum].balance) throw;
		bytes32 seccode = pendingOrders[ordernum].seccode
		currentPositions[seccode].qty = pendingOrders[ordernum].balance
		currentPositions[seccode].price


	}

	function allPendingOrders() {}
	function allPositions() {}

	

	function holder() returns (address) { return voterAddress; }
	function holderName() returns (string) { return username; }
	function holderBalance() returns (uint) { return totalTokens; }


}