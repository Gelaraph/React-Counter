import React, { useState } from "react";
import "../../App.css";

const Button = () => {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    if (count < 10) {
      setCount((prev) => prev + 1);
    }
    // console.log("Increment button clicked");
  }

  function handleDecrement() {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  }

  return (
    <div>
      <div className="counter-value pulse">
        <strong className="pulse">{count}</strong>
      </div>
      <div className="buttons">
        <div>
          <button onClick={handleIncrement} disabled={count === 10}>
            Increment
          </button>
        </div>
        <div>
          <button onClick={handleDecrement} disabled={count === 0}>
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
};

export default Button;
