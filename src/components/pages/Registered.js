import React, {useEffect} from "react";
import styled from "styled-components";
import group from "../../assets/group.png";
import contact from "../../assets/contact.png";
import myself from "../../assets/myself.png";

import {useNavigate} from "react-router-dom";
import DataRepresent from "./dataRepresent";

const ScrollWrapper = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
min-height: 100%;
min-width: 100%;
`;
const OuterWrapper = styled.div`
border: 1px solid black;
border-radius: 8px;
background-color: white;
margin: 3px;
min-height: 120px;
min-width: 120px;
`;

function Registered() {
  const navigate = useNavigate();
  const [dataArray, setDataArray] = React.useState([]);
  const [recentDataArray, setRecentDataArray] = React.useState([]);
  const [isRecentOrAll, setIsRecentOrAll] = React.useState(false);
  const [totalEarn, setTotalEarn] = React.useState(0);
  const [totalSpent, setTotalSpent] = React.useState(0);
  const [myExpenseAmount, setMyExpenseAmount] = React.useState(0);
  const todayDate = new Date();
  const [globalSymbol] = React.useState(localStorage.getItem("currencySymbol"));
  const Insighter = () => (
    <div className="relative">
      <div className="absolute flex box-border top-4 rounded-md bg-white  h-28 inset-x-4 ">
        <div className="flex flex-col justify-center justify-items-center text-black w-1/2 h-full rounded-l-md border-r-2 border-black-600 ">
          <div className="flex flex-col justify-center h-full w-full justify-items-center text-center text-lg  border-b-2 border-black-600">
            <span className="font-medium">
              {globalSymbol} {totalEarn}
            </span>
            <span className="font-semibold text-sm text-green-600">
              You will get
            </span>
          </div>
          <div className="flex flex-col justify-center h-full w-full justify-items-center text-center text-lg  ">
            <span className="font-medium">
              {globalSymbol} {totalSpent}
            </span>
            <span className="font-semibold text-sm text-red-500">
              You will give
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center justify-items-center text-black w-1/2 h-full rounded-r-md border-r-2 border-black-600 ">
          <div className="flex flex-col h-2/3 justify-center  w-full justify-items-center text-center text-lg rounded-r-md border-b-2 border-black-600">
            <span className="font-medium">
              {globalSymbol} {myExpenseAmount}
            </span>
            <span
              className="font-semibold  text-blue-600"
              style={{fontSize: "12px", lineHeight: "15px"}}
            >
              My Expenses
            </span>
            <span
              className="font-semibold  text-blue-600"
              style={{fontSize: "12px", lineHeight: "15px"}}
            >
              for this month
            </span>
          </div>
          <div className="flex flex-col justify-center bg-black h-1/3 w-full justify-items-center text-center text-lg rounded-br-md border-b-2 ">
            <span className="font-bold text-white text-sm">Detail Report</span>
          </div>
        </div>
      </div>
      <div className="h-14 bg-[#99BC85]"></div>
    </div>
  );

  useEffect(() => {
    async function openDB() {
      var openRequest = indexedDB.open("MyDatabase", 2);

      openRequest.onsuccess = async function (e) {
        var db = e.target.result;

        if (db.objectStoreNames.contains("MyObjectStore")) {
          var transaction = db.transaction("MyObjectStore", "readonly");
          var store = transaction.objectStore("MyObjectStore");

          // Use getAll() on the object store
          var requestOfAll = store.getAll();
          var request = store.index("structured").getAll("personFromContact");

          requestOfAll.onsuccess = function () {
            requestOfAll.result.map((item) => {
              if (
                (item.creditType === "split" || item.creditType === "earn") &&
                item.dataCategory !== "myExpense" &&
                item.dataCategory !== "groupSpliter"
              )
                setTotalEarn((prevState) => prevState + parseInt(item.Amount));
              else if (
                item.dataCategory !== "myExpense" &&
                item.dataCategory !== "groupSpliter"
              )
                setTotalSpent((prevState) => prevState + parseInt(item.Amount));
              if (
                item.dataCategory === "myExpense" &&
                todayDate.getMonth() + 1 - item.date.slice(3, 5) === 0
              ) {
                if (item.creditType === "earn")
                  setMyExpenseAmount(
                    (prevState) => prevState - parseInt(item.Amount)
                  );
                else
                  setMyExpenseAmount(
                    (prevState) => prevState + parseInt(item.Amount)
                  );
              }
            });
          };
          request.onsuccess = function () {
            let recentDataArray = JSON.parse(
              localStorage.getItem("recentDataArray")
            );
            console.log("sdadfa", recentDataArray);
            if (window.localStorage)
              request.result.map((item) => {
                if (recentDataArray && recentDataArray.includes(item.id)) {
                  setRecentDataArray((prevState) => [...prevState, item]);
                }
              });
            setDataArray((prevState) => [...prevState, ...request.result]);
          };
        } else {
          db.close();
          indexedDB.deleteDatabase("MyDatabase");
        }
      };
    }
    openDB();
  }, []);

  return (
    <>
      <Insighter />
      <div className="p-2 pt-24 h-full bg-gray-200">
        <span className="text-center text-lg font-bold ">Add Transactions</span>
        <div className="flex flex-col justify-center mb-6">
          <div className="flex justify-center">
            <OuterWrapper
              className="inline-block border-gray-500"
              onClick={() => navigate("/registered/myExpenses")}
            >
              <ScrollWrapper>
                <img src={`${myself}`} alt="group" />
                <p>My</p> <p>Expenses</p>
              </ScrollWrapper>
            </OuterWrapper>
            <OuterWrapper
              className="inline-block overflow-ellipsis"
              onClick={() => navigate("/registered/personContact")}
            >
              <ScrollWrapper className="whitespace-normal">
                <img src={`${contact}`} alt="group" />
                <p>Individual</p> <p>person</p>
              </ScrollWrapper>
            </OuterWrapper>

            <OuterWrapper
              className="inline-block"
              onClick={() => navigate("/registered/groupSpliter")}
            >
              <ScrollWrapper>
                <img src={`${group}`} alt="group" />
                <p>Group</p> <p>Spliter</p>
              </ScrollWrapper>
            </OuterWrapper>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full justify-items-center ">
          <div className="flex w-1/2  text-white bg-[#031902] hover:bg-gradient-to-br  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            <div
              type="button"
              className="flex-1 h-full w-full hover:scale-125 "
              onClick={() => setIsRecentOrAll(true)}
            >
              Recent
            </div>
            <span>|</span>
            <div
              type="button"
              className="flex-1 hover:scale-125"
              onClick={() => setIsRecentOrAll(false)}
            >
              All
            </div>
          </div>
          <div
            className={` bg-white w-full mx-8 my-4 rounded-lg px-2 py-3 overflow-scroll  `}
            style={{minHeight: "45vh", maxHeight: "45vh"}}
          >
            {isRecentOrAll ? (
              <DataRepresent dataArray={recentDataArray} height="50vh" />
            ) : (
              <DataRepresent dataArray={dataArray} height="50vh" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Registered;
