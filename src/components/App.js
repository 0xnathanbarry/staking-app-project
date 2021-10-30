import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Web3 from "web3";

import MikeCoin from "../truffle_abis/MikeCoin.json";

const App = () => {
  useEffect(() => {
    const willMount = async () => {
      await loadWeb3();
      await loadBlockchainData();
    };
    willMount();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("No ethereum browser detected!");
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    setState({ ...state });
    const networkId = await web3.eth.net.getId();

    // Load MikeCoin Contract
    const mikecoinData = MikeCoin.networks[networkId];
    if (mikecoinData) {
      const mikecoin = new web3.eth.Contract(
        MikeCoin.abi,
        mikecoinData.address
      );
      let mikecoinBalance = await mikecoin.methods.balanceOf(account).call();
      setState({
        ...state,
        mikecoin: mikecoin,
        account: account[0],
        mikecoinBalance: mikecoinBalance.toString(),
      });
    } else {
      window.alert(
        "Error! MikeCoin contract not deployed - no detected network!"
      );
    }
  };

  const [state, setState] = useState({
    account: "0x0",
    mikecoin: {},
    rwd: {},
    decentralBank: {},
    mikecoinBalance: "0",
    rwdBalance: "0",
    stakingBalance: "0",
    loading: "true",
  });

  return (
    <div>
      <Navbar account={state.account} />
      <h1>Hello</h1>
    </div>
  );
};

export default App;
