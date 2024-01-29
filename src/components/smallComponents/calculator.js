import React, {useState, useEffect} from "react";
import {globalSymbol} from "../../service/globalData/global";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";

function Calculator({setIsShowCalculator, displayAmount, setDisplayAmount}) {
  const location = useLocation();
  const data = location.state;
  console.log("cal", data);

  const handleNumberClick = (number) => {
    setDisplayAmount(displayAmount + number.toString());
  };

  const handleClearClick = () => {
    setDisplayAmount("");
  };
  return (
    <>
      <div className="box-border h-screen w-full bg-gray-300">
        <div className="flex h-14 mx-4  pt-4 justify-center justify-items-center rounded-md  bg-gray-300">
          <div className="flex justify-center justify-items-center rounded-md hover:outline w-full h-full">
            <div className="flex flex-col justify-center px-2 justify-self-center text-lg bg-white rounded-l-md">
              {globalSymbol}
            </div>
            <input
              placeholder="Enter Amount"
              type="number"
              className=" w-full rounded-r-md bg-white border-none outline-none"
              value={displayAmount}
              onChange={(e) => setDisplayAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="absolute bottom-0 box-border inset-b-0 inset-x-0 bg-white ">
          <div
            id="save"
            className="flex flex-row w-full justify-center items-center active:bg-green-400 bg-green-600 h-14 text-lg text-white font-bold"
            onClick={() => setIsShowCalculator(false)}
          >
            Save
          </div>
          <div className="flex justify-evenly box-border inset-x-4 mx-2 mt-4">
            <div
              id="C"
              className="flex flex-col justify-center items-center bg-black h-12 w-28 mx-1 my-1 border-2 border-black text-white active:scale-110  rounded-md"
              onClick={handleClearClick}
            >
              C
            </div>
          </div>
          <div className="flex justify-evenly box-border inset-x-4 mx-2">
            <div
              id="7"
              className="flex flex-col justify-center items-center bg-black h-12 w-28 mx-1 my-1 border-2 border-black text-white active:scale-110  rounded-md"
              onClick={() => handleNumberClick("7")}
            >
              7
            </div>
            <div
              id="8"
              className="flex flex-col justify-center items-center bg-black h-12 w-28 mx-1 my-1 border-2 border-black text-white active:scale-110  rounded-md"
              onClick={() => handleNumberClick("8")}
            >
              8
            </div>
            <div
              id="9"
              className="flex flex-col justify-center items-center bg-black h-12 w-28 mx-1 my-1 border-2 border-black text-white active:scale-110  rounded-md"
              onClick={() => handleNumberClick("9")}
            >
              9
            </div>
          </div>
          <div className="flex justify-evenly box-border inset-x-4 mx-2">
            <div
              id="4"
              className="flex flex-col justify-center items-center bg-black h-12 w-28 mx-1 my-1 border-2 border-black text-white active:scale-110  rounded-md"
              onClick={() => handleNumberClick("4")}
            >
              4
            </div>
            <div
              id="5"
              className="flex flex-col justify-center items-center bg-black h-12 w-28 mx-1 my-1 border-2 border-black text-white active:scale-110  rounded-md"
              onClick={() => handleNumberClick("5")}
            >
              5
            </div>
            <div
              id="6"
              className="flex flex-col justify-center items-center bg-black h-12 w-28 mx-1 my-1 border-2 border-black text-white active:scale-110  rounded-md"
              onClick={() => handleNumberClick("6")}
            >
              6
            </div>
          </div>
          <div className="flex justify-evenly box-border inset-x-4 mx-2">
            <div
              id="1"
              className="flex flex-col justify-center items-center bg-black h-12 w-28 mx-1 my-1 border-2 border-black text-white active:scale-110  rounded-md"
              onClick={() => handleNumberClick("1")}
            >
              1
            </div>
            <div
              id="2"
              className="flex flex-col justify-center items-center bg-black h-12 w-28 mx-1 my-1 border-2 border-black text-white active:scale-110  rounded-md"
              onClick={() => handleNumberClick("2")}
            >
              2
            </div>
            <div
              id="3"
              className="flex flex-col justify-center items-center bg-black h-12 w-28 mx-1 my-1 border-2 border-black text-white active:scale-110  rounded-md"
              onClick={() => handleNumberClick("3")}
            >
              3
            </div>
          </div>
          <div className="flex justify-evenly box-border inset-x-4 mx-2 mb-4">
            <div
              id="0"
              className="flex flex-col justify-center items-center bg-black h-12 w-28 mx-1 my-1 border-2 border-black text-white active:scale-110  rounded-md"
              onClick={() => handleNumberClick("0")}
            >
              0
            </div>
            <div
              id="."
              className="flex flex-col justify-center items-center bg-black h-12 w-28 mx-1 my-1 border-2 border-black text-white active:scale-110  rounded-md"
              onClick={() => handleNumberClick(".")}
            >
              .
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Calculator;
