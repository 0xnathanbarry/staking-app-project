import React, { useState } from "react";
import Navbar from "./Navbar";

const App = () => {
  const [account, setAccount] = useState("0x0");
  return (
    <div>
      <Navbar account={account} />
      <h1>Hello</h1>
    </div>
  );
};

export default App;
