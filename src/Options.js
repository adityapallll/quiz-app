import React, { useState, useEffect } from "react";

const Options = ({ id, description, correct, is_true, disabled }) => {
  const [data, setData] = useState(is_true);
  const [change, setChange] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    correct(data);
    setIsDisabled(true);
    if (is_true === true) {
      setChange(true);
      //   setShowConfetti(true);
    } else {
      setChange(false);
    }
  };

  return (
    <div>
      {/* {showConfetti && <Confetti width={width} height={height} />} */}
      <button
        className={`option-box ${change}`}
        onChange={(e) => setData(e.target.value)}
        onClick={handleClick}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        disabled={isDisabled}
      >
        {description}
      </button>
    </div>
  );
};

export default Options;
