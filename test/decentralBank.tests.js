const MikeCoin = artifacts.require("MikeCoin");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("DecentralBank", ([owner, customer]) => {
  let mikecoin, rwd;

  function tokens(number) {
    return web3.utils.toWei(number, "ether");
  }

  before(async () => {
    // load Contracts
    mikecoin = await MikeCoin.new();
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(rwd.address, mikecoin.address);

    //Transfer all tokens to DecentralBank (1 million)
    await rwd.transfer(decentralBank.address, tokens("1000000"));

    // Transfer 100 mock Tethers to Customer
    await mikecoin.transfer(customer, tokens("100")), { from: owner };
  });

  describe("Mock MikeCoin Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await mikecoin.name();
      assert.equal(name, "MikeCoin");
    });
  });
  describe("RWD Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await rwd.name();
      assert.equal(name, "Reward Token");
    });
    it("matches symbol successfully", async () => {
      const symbol = await rwd.symbol();
      assert.equal(symbol, "RWD");
    });
  });
  describe("Decentral Bank Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await decentralBank.name();
      assert.equal(name, "Decentral Bank");
    });

    it("there are tokens", async () => {
      balance = await rwd.balanceOf(decentralBank.address);
      assert.equal(balance, tokens("1000000"));
    });
  });
  describe("Yield Farming", async () => {
    it("rewards tokens for staking", async () => {
      let result;

      // Check Investor Blanace
      result = await mikecoin.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens("100"),
        "customer mock wallet balance before staking"
      );

      // Check staking for customer
      await mikecoin.approve(decentralBank.address, tokens("100"), {
        from: customer,
      });
      await decentralBank.depositTokens(tokens("100"), { from: customer });

      // check updated balance of customer
      result = await mikecoin.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens("0"),
        "customer mock wallet balance after staking"
      );

      // check updated balance of bank
      result = await mikecoin.balanceOf(decentralBank.address);
      assert.equal(
        result.toString(),
        tokens("100"),
        "decentral bank wallet balance after staking from customer"
      );

      // Is Staking
      result = await decentralBank.isStaking(customer);
      assert.equal(
        result.toString(),
        "true",
        "customer staking status after staking"
      );

      // Issue Tokens
      await decentralBank.issueTokens({ from: owner });

      // Unsure only the owner can issue tokens
      await decentralBank.issueTokens({ from: customer }).should.be.rejected;

      // Unstake Tokens
      await decentralBank.unstakeTokens({ from: customer });

      // Check unstaking balances
      result = await mikecoin.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens("100"),
        "customer mock wallet balance after unstaking"
      );

      // check updated balance of bank
      result = await mikecoin.balanceOf(decentralBank.address);
      assert.equal(
        result.toString(),
        tokens("0"),
        "decentral bank wallet balance after unstaking from customer"
      );

      // Is Staking
      result = await decentralBank.isStaking(customer);
      assert.equal(
        result.toString(),
        "false",
        "customer staking status after unstaking"
      );
    });
  });
});
