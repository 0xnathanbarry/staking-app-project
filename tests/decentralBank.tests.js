const { assert } = require('console');

const MikeCoin = artifacts.require('MikeCoin');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank', (accounts) => {
    describe('Mock MikeCoin Deployment', async () =>  {
        it('matches name successfully', async () => {
            let mikecoin = await MikeCoin.new();
            const name = mikecoin.name();
            assert.equal(name, 'MikeCoin');
        })
    })
})