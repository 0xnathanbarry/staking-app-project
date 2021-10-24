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
    });
  });
});
