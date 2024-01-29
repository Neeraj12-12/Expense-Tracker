import React, {useEffect} from "react";
import {globalSymbol} from "../../service/globalData/global";
import {useNavigate} from "react-router-dom";

function DataRepresent({dataArray, height}) {
  var colors = ["#99BC85", "#BFD8AF", "#D4E7C5"];
  let colorIndex = 0;
  let recentDataArray;
  const navigate = useNavigate();

  if (window.localStorage.getItem("recentDataArray")) {
    recentDataArray = JSON.parse(
      window.localStorage.getItem("recentDataArray")
    );
  } else {
    recentDataArray = [];
  }

  const handleRecentData = () => {
    window.localStorage.removeItem("recentDataArray");

    console.log("heresave", JSON.stringify(recentDataArray));
    window.localStorage.setItem(
      "recentDataArray",
      JSON.stringify(recentDataArray)
    );
  };

  return (
    <>
      <div
        className={`h-screen mb-32 overflow-scroll`}
        style={{height: {height} ? `${height}` : ""}}
      >
        {dataArray.length > 0 ? (
          dataArray.map((data, index) => {
            let userName;
            let randomColor = colors[colorIndex++ % colors.length];
            let cropedAmount = data.Amount.slice(0, 7);
            if (data.Name) {
              userName =
                data.Name.slice(0, 1).toUpperCase() + data.Name.slice(1);
            } else {
              if (data.dataCategory === "myExpense")
                userName = data.creditType === "earn" ? "Earned" : "Spent";
              else userName = "Unknown";
            }
            return (
              <>
                <div
                  className="flex col-span-1 w-full h-12 px-3 my-3 "
                  onClick={() => {
                    navigate("/registered/particularData", {
                      state: {
                        id: data.id,
                      },
                    });
                    if (data.dataCategory !== "personFromContact") return;

                    if (recentDataArray && recentDataArray.length) {
                      if (recentDataArray.includes(data.id)) return;

                      if (recentDataArray.length <= 4) {
                        recentDataArray.push(data.id);
                        console.log(recentDataArray);
                      } else {
                        recentDataArray.shift();
                        recentDataArray.push(data.id);
                        console.log(recentDataArray);
                      }
                      handleRecentData();
                    } else {
                      console.log("erere");
                      recentDataArray.push(data.id);
                      console.log(recentDataArray);
                      handleRecentData();
                    }
                  }}
                >
                  <div
                    id="avatar"
                    className={`flex text-white text-2xl font-semibold justify-center items-center rounded-full h-full w-12 mr-4 `}
                    style={{backgroundColor: randomColor}}
                  >
                    {userName[0].toUpperCase()}
                  </div>
                  <div className="flex-1 grid ">
                    <span className="text-black text-md font-bold">
                      {userName}
                    </span>
                    <span className="text-black text-sm">{data.date}</span>
                  </div>
                  <div className="grid  ">
                    <div
                      className="text-nowrap text-right w-full"
                      style={{
                        maxWidth: 100,
                        overflow: "hidden",
                        maxHeight: 50,
                        textOverflow: "ellipsis",
                      }}
                    >
                      <span className="text-black text-md font-bold text-right">
                        {globalSymbol} {cropedAmount}
                      </span>
                    </div>
                    <span
                      className={` text-black text-sm font-semibold text-right ${
                        data.creditType === "split"
                          ? "text-blue-500"
                          : data.creditType === "earn"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {data.creditType === "split"
                        ? "Splitted"
                        : data.creditType === "earn"
                        ? "You'll get"
                        : "You'll give"}
                    </span>
                  </div>
                </div>
                <div className="border-b-2"></div>
              </>
            );
          })
        ) : (
          <div className={`flex justify-center items-center h-full`}>
            No data
          </div>
        )}
      </div>
    </>
  );
}

export default DataRepresent;
