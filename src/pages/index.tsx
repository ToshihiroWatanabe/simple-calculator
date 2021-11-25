import type { NextPage } from "next";
import { Fragment, useState } from "react";
import { BUTTONS, MAX_DIGIT } from "utils/constants";
import InputMode from "types/InputMode";

let inputMode: InputMode = "continue";
let previousValue = 0;
let previousOperation = "";
let isDecimaled: boolean = false;

const Home: NextPage = () => {
  const [outputOperation, setOutputOperation] = useState("");
  const [outputValue, setOutputValue] = useState(0);

  const onClick = (code: number) => {
    if (BUTTONS[code] === "C") {
      clear();
    }
    if (["+", "-", "*", "/"].includes(BUTTONS[code])) {
      if (["+", "-", "*", "/"].includes(previousOperation)) {
        calculate();
      }
      setOutputValue((value) => {
        previousValue = value;
        return value;
      });
      previousOperation = BUTTONS[code];
      setOutputOperation(previousOperation);
      inputMode = "break";
    }
    if (BUTTONS[code] === "=") {
      calculate();
    }
    if (inputMode === "continue" && code >= 0 && code <= 9) {
      if (String(outputValue).length > MAX_DIGIT) {
        return;
      }
      if (isDecimaled) {
        setOutputValue(outputValue + code / 10);
      } else if (Number.isInteger(outputValue)) {
        setOutputValue(outputValue * 10 + code);
      } else if (!Number.isInteger(outputValue)) {
        const decimalPosition = outputValue.toString().indexOf(".");
        setOutputValue(
          outputValue +
            code * 10 ** -(outputValue.toString().length - decimalPosition)
        );
      }
    }
    if (inputMode === "break" && code >= 0 && code <= 9) {
      setOutputValue(code);
      inputMode = "continue";
    }
    isDecimaled = false;
    if (BUTTONS[code] === "." && Number.isInteger(outputValue)) {
      isDecimaled = true;
      if (inputMode === "break") {
        setOutputValue(0);
        inputMode = "continue";
      }
    }
  };

  const calculate = () => {
    if (outputOperation === "+") {
      const tmp = outputValue;
      setOutputValue(outputValue + previousValue);
      previousValue = tmp;
      setOutputOperation("");
    } else if (previousOperation === "+") {
      setOutputValue(outputValue + previousValue);
    }
    if (outputOperation === "-") {
      const tmp = outputValue;
      setOutputValue(previousValue - outputValue);
      previousValue = tmp;
      setOutputOperation("");
    } else if (previousOperation === "-") {
      setOutputValue(outputValue - previousValue);
    }
    if (outputOperation === "*") {
      const tmp = outputValue;
      setOutputValue(previousValue * outputValue);
      previousValue = tmp;
      setOutputOperation("");
    } else if (previousOperation === "*") {
      setOutputValue(outputValue * previousValue);
    }
    if (outputOperation === "/") {
      const tmp = outputValue;
      setOutputValue(previousValue / outputValue);
      previousValue = tmp;
      setOutputOperation("");
    } else if (previousOperation === "/") {
      setOutputValue(outputValue / previousValue);
    }
  };

  const clear = () => {
    setOutputOperation("");
    setOutputValue(0);
    inputMode = "continue";
    previousValue = 0;
    previousOperation = "";
    isDecimaled = false;
  };

  return (
    <>
      <div>
        <input type="text" defaultValue={outputOperation} size={1}></input>
        <input
          type="text"
          defaultValue={
            String(outputValue).length > MAX_DIGIT ? "??????????" : outputValue
          }
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
