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
    }

    function depositTokens(uint256 _amount) public {
        // Require staking amount to be greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Transfer tether tokens to this contract address for staking
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
}
