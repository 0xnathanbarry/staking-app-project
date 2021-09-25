pragma solidity >=0.5.0 <0.9.0;

import './RWD.sol';
import './MikeCoin.sol';

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    RWD public rwd;
    MikeCoin public mikecoin;

    constructor(RWD _rwd, MikeCoin _mikecoin) public {
        rwd = _rwd;
        mikecoin = _mikecoin;
    }
}
