import React from "react";

import MainHeader from "./components/header";
import "./styles.css";
import Routes from "./routes";

const App = () => (
  <div className="App">
    <MainHeader />
    <Routes />
  </div>
);

export default App;
