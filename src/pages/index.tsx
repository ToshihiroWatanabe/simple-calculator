import type { NextPage } from "next";
import { Fragment, useState } from "react";
import { BUTTONS, MAX_DIGIT } from "utils/constants";
import InputMode from "types/InputMode";

const Home: NextPage = () => {
  const [outputOperation, setOutputOperation] = useState("");
  const [outputValue, setOutputValue] = useState(0);
  let inputMode: InputMode = "continue";
  let previousValue = 0;
  let isDecimaled: boolean = false;

  const onClick = (code: number) => {
    if (BUTTONS[code] == "C") {
      clear();
    }
    if (inputMode == "continue" && code >= 0 && code <= 9) {
      if (String(outputValue).length > MAX_DIGIT) {
        return;
      }
      if (isDecimaled) {
        setOutputValue(outputValue + code / 10);
      } else if (Number.isInteger(outputValue)) {
        setOutputValue(outputValue * 10 + code);
      } else if (!Number.isInteger(outputValue)) {
        const decimalPosition = outputValue.toString().indexOf(".");
        console.log(decimalPosition);
        setOutputValue(
          outputValue +
            code * 10 ** -(outputValue.toString().length - decimalPosition)
        );
      }
    }
    isDecimaled = false;
    if (
      inputMode == "continue" &&
      BUTTONS[code] === "." &&
      Number.isInteger(outputValue)
    ) {
      isDecimaled = true;
    }
  };

  const clear = () => {
    setOutputOperation("");
    setOutputValue(0);
    inputMode = "continue";
    previousValue = 0;
    isDecimaled = false;
  };

  return (
    <>
      <div>
        <input type="text" defaultValue={outputOperation} size={1}></input>
        <input
          type="text"
          defaultValue={outputValue}
          size={10}
          style={{ textAlign: "right" }}
        ></input>
      </div>
      {BUTTONS.map((button, index) => {
        return (
          <Fragment key={index}>
            {index === 11 && <br />}
            <button
              onClick={() => {
                onClick(index);
              }}
            >
              {button}
            </button>
          </Fragment>
        );
      })}
    </>
  );
};

export default Home;
