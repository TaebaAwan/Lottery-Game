// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Lottery Contract
 * @dev A contract for a lottery game where participants can purchase tickets and a random winner is selected
 */
contract Lottery {

    address owner;
    uint public pricePerTicket;   // Price of one ticket in wei
    uint public totalTickets;     // Total number of tickets 
    bool isLotteryActive;
    uint totalAmountCollected;
    uint public remainingTickets; 

    mapping  (uint => address) playersUniqueNumbers; 
    uint public index = 0;

    event TicketPurchased(address player);
    event winnerDeclared(address player);

    // @dev Sets the owner of the contract and the price and total number of tickets
    constructor(uint _pricePerTicket, uint _totalTickets) {
        owner = msg.sender;
        pricePerTicket = _pricePerTicket; 
        totalTickets = _totalTickets; 
        remainingTickets = totalTickets;
        isLotteryActive = true;
    }

    /**
    * @dev Modifier to check if the lottery is currently active
    */
    modifier isLotteryOpen {
      require(isLotteryActive == true, "Lottery Tickets sold Out!, Wait for the next round");
      _;
   }

    /**
     * @dev Allows a participant to purchase a ticket and participate in the lottery(if tickets are available)
     * If tickets are sold out, a winner is choosen & gaeme restarts
     * @return success A boolean indicating if the ticket purchase was successful.
     */
    function participateInGame() isLotteryOpen public payable returns (bool success) {
    if (purchaseTicket() == true) {
        return true;
    } else {
            isLotteryActive == false;
            selectWinner();
            restartGame();     
        }
    }

    /**
     * @dev Allows a participant to purchase a ticket by sending the required funds.
     * @return A boolean indicating if the ticket purchase was successful.
     */
    function purchaseTicket() public payable returns (bool) {
        require(msg.value == pricePerTicket, "Insufficient funds sent");
        require(index < totalTickets, "Lottery Tickets sold Out!, Wait for the next round");

        playersUniqueNumbers[index]= msg.sender;
        index++;
        remainingTickets= totalTickets- index;

        totalAmountCollected += msg.value;
        emit TicketPurchased(msg.sender);
        return true;

    }

    /**
     * @dev Selects a random winner from the participants and transfers the total amount collected to the winner
     * @return indexOfWinner The index of the selected winner in the playersUniqueNumbers mapping.
     */
    function selectWinner() private returns(uint)  {
        
        uint256 randonNumber  = uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, totalTickets)))% totalTickets;
        uint256 indexOfWinner =  randonNumber % totalTickets;
        address winner= playersUniqueNumbers[indexOfWinner];

        payable(address(winner)).transfer(totalAmountCollected);
        emit winnerDeclared(msg.sender);

        return indexOfWinner;

    }

    /**
     * @dev Restarts the game by deleting all player information and resetting the lottery status for next round
     */
    function restartGame() private {

        for (uint256 i = 0; i < totalTickets; i++) {
            delete playersUniqueNumbers[i];
        }
        isLotteryActive == true;
    }
    
}
