
const { expect } = require("chai");

describe("Lottery", function () {
  let Lottery;
  let lottery;
  const ticketPrice = ethers.utils.parseEther("1");
  const totalTickets = 10;

  beforeEach(async function () {
    Lottery = await ethers.getContractFactory("Lottery");
    lottery = await Lottery.deploy(ticketPrice, totalTickets);
    await lottery.deployed();
  });

  it("should participate in the game", async function () {
    const result = await lottery.participateInGame({
      value: ticketPrice,
    });

    expect(result).to.equal(true);
  });

  it("should not participate in the game when the lottery is closed", async function () {
    // Purchase all available tickets
    for (let i = 0; i < totalTickets; i++) {
      await lottery.participateInGame({
        value: ticketPrice,
      });
    }

    await expect(
      lottery.participateInGame({
        value: ticketPrice,
      })
    ).to.be.revertedWith("Lottery Tickets sold Out!, Wait for the next round");
  });

  it("should purchase a ticket", async function () {
    const result = await lottery.purchaseTicket({
      value: ticketPrice,
    });

    expect(result).to.equal(true);
  });

  it("should not purchase a ticket with insufficient funds", async function () {
    await expect(
      lottery.purchaseTicket({
        value: ticketPrice.sub(1),
      })
    ).to.be.revertedWith("Insufficient funds sent");
  });

  it("should not purchase a ticket when all tickets are sold out", async function () {
    // Purchase all available tickets
    for (let i = 0; i < totalTickets; i++) {
      await lottery.purchaseTicket({
        value: ticketPrice,
      });
    }

    await expect(
      lottery.purchaseTicket({
        value: ticketPrice,
      })
    ).to.be.revertedWith("Lottery Tickets sold Out!, Wait for the next round");
  });

  it("should select a winner", async function () {
    // Purchase a ticket
    await lottery.purchaseTicket({
      value: ticketPrice,
    });

    const winnerIndex = await lottery.selectWinner();

    expect(winnerIndex).to.be.a("number");
    expect(winnerIndex).to.be.lessThan(totalTickets);
  });

  it("should restart the game", async function () {
    // Purchase a ticket
    await lottery.purchaseTicket({
      value: ticketPrice,
    });

    await lottery.restartGame();

    const remainingTickets = await lottery.remainingTickets();

    expect(remainingTickets).to.equal(totalTickets);
  });
});