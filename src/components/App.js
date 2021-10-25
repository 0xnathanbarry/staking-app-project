import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Web3 from "web3";

const App = () => {
  useEffect(() => {
    const willMount = async () => {
      await loadWeb3();
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

  const [account, setAccount] = useState("0x0");

  return (
    <div>
      <Navbar account={account} />
      <h1>Hello</h1>
    </div>
  );
};

export default App;
