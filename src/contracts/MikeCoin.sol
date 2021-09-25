pragma solidity >=0.5.0 <0.9.0;

contract MikeCoin {
    string public name = 'MikeCoin';
    string public symbol = 'MKC';
    uint256 public totalSupply = 1_000_000_000000000000000000;
    uint8 public decimals = 18;

    event Transfer(address indexed _from, address indexed _to, uint _value);

    event Approve(address indexed _owner, address indexed _spender, uint _value);

    mapping(address => uint256) public balanceOf;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint _value) public returns (bool success) {
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
    }
}