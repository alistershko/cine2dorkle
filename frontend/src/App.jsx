import { useState } from "react";
import "./App.css";
import { Header } from "./components/header.jsx";
import Timer from "./components/Timer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Header />
      </div>
      <h1>Double Header</h1>
    </>
  );
}

export default App;
