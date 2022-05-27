// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

contract Escrow {
	address public depositor; // Signer
	address payable public beneficiary; // Receiver of funds
	address public arbiter; // Approver of transaction

	bool public isApproved;
	event Approved(uint256 amountSent);

	constructor(address _arbiter, address payable _beneficiary) payable {
		arbiter = _arbiter;
		beneficiary = _beneficiary;
		depositor = msg.sender;
	}

	function approve() external {
		// We want the caller of this function to be our arbiter
		require(msg.sender == arbiter);
		// We want the balance to be this smart contracts balance
		uint256 balance = address(this).balance;
		// We want to transfer the amount in this contract to the beneficiary
		beneficiary.transfer(balance);
		// We want to emit our event so we can listen to it using js
		emit Approved(balance);
		// We want let the world know that this contract has been approved
		isApproved = true;
	}
}
