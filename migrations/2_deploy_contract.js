const MikeCoin = artifacts.require('MikeCoin');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function(deployer, network, accounts) {
    // Deploy MikeCoin
    await deployer.deploy(MikeCoin);
    const mikecoin = await MikeCoin.deployed();

    // Deploy RWD
    await deployer.deploy(RWD);
    const rwd = await RWD.deployed();

    // Deploy DecentralBank Contract
    await deployer.deploy(DecentralBank, rwd.address, mikecoin.address);
    const decentralBank = await DecentralBank.deployed();

    // Transfer all RWD tokens to Decentral Bank
    await rwd.transfer(decentralBank.address, '1000000000000000000000000');

    // Distribute 100 Tether tokens to investor
    await mikecoin.transfer(accounts[1], '100000000000000000000')
}