pragma solidity >=0.5.0 <0.9.0;

import "./RWD.sol";
import "./MikeCoin.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    RWD public rwd;
    MikeCoin public mikecoin;

    address[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(RWD _rwd, MikeCoin _mikecoin) public {
        rwd = _rwd;
        mikecoin = _mikecoin;
        owner = msg.sender;
    }

    function depositTokens(uint256 _amount) public {
        // Require staking amount to be greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Transfer mikecoin tokens to this contract address for staking
        mikecoin.transferFrom(msg.sender, address(this), _amount);

        // Update Staking Balance
        stakingBalance[msg.sender] += _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update Staking Status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Issue Rewards
    function issueTokens() public {
        // require the owner to issue tokens
        require(msg.sender == owner, "caller must be owner");

        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient] / 9;
            if (balance > 0) {
                rwd.transfer(recipient, balance);
            }
        }
    }

    // unstake tokens
    function unstakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];
        // require amount to be greater than zero
        require(balance > 0, "staking balance can't be less than zero");

        // transfer the tokens to the specified contract address from our bank
        mikecoin.transfer(msg.sender, balance);

        // reset staking balance
        stakingBalance[msg.sender] = 0;

        // Update Staking balance
        isStaking[msg.sender] = false;
    }
}
