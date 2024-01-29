import React, {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useLocation, useNavigate} from "react-router-dom";
import {globalSymbol} from "../../service/globalData/global";
import Calculator from "../smallComponents/calculator";

function DataCollector({
  youGot = "You Got",
  youGave = "You Gave",
  showNameField = false,
  showNOPfield = false,
  isShowSpliter = false,
  dataCategory,
}) {
  const location = useLocation();
  const history = useNavigate();
  const data = location.state;

  if (data) {
    youGot = data.youGot;
    youGave = data.youGave;
    showNameField = data.showNameField;
    showNOPfield = data.showNOPfield;
    isShowSpliter = data.isShowSpliter;
    dataCategory = data.dataCategory;
  }
  const [isAttachment, setIsAttachment] = useState(false);
  const [isShowCalculator, setIsShowCalculator] = useState(false);
  const [isYouGot, setIsYougot] = useState("");
  const [displayAmount, setDisplayAmount] = React.useState("");
  const [numberOfPerson, setNumberOfPerson] = useState(0);
  const [date, setDate] = useState(new Date());

  return (
    <>
      <div
        className={`h-screen w-screen z-10 ${isShowCalculator ? "" : "hidden"}`}
      >
        <Calculator
          setIsShowCalculator={setIsShowCalculator}
          displayAmount={displayAmount}
          setDisplayAmount={setDisplayAmount}
        />
      </div>

      <>
        <div className={`${isShowCalculator ? "hidden" : ""}`}>
          <form
            onSubmit={(event) => {
              event.preventDefault();

              if (isYouGot && displayAmount) {
                // Open (or create) the database
                const values = event.target.elements;
                var openRequest = indexedDB.open("MyDatabase", 2);

                // Create the schema
                openRequest.onupgradeneeded = function (e) {
                  var db = e.target.result;

                  var store = db.createObjectStore("MyObjectStore", {
                    keyPath: "id",
                    autoIncrement: true,
                  });
                  store.createIndex("structured", "dataCategory", {
                    unique: false,
                  });
                };

                openRequest.onsuccess = function (e) {
                  // Start a new transaction
                  var db = e.target.result;
                  if (db.objectStoreNames.contains("MyObjectStore")) {
                    var tx = db.transaction("MyObjectStore", "readwrite");
                    var store = tx.objectStore("MyObjectStore");

                    // Add some data
                    const data = {};
                    for (let i = 0; i < values.length; i++) {
                      if (values[i].id && values[i].value) {
                        data[values[i].id] = values[i].value;
                      }
                    }
                    data["dataCategory"] = dataCategory;
                    data["Amount"] = displayAmount;
                    data["creditType"] = isYouGot;
                    store.add(data);
                    // Close the db when the transaction is done
                    tx.oncomplete = function () {
                      db.close();
                    };
                  }
                };
                history(-1);
              } else {
                if (!isShowSpliter)
                  toast.error(
                    `Please select one of the ${youGot} or ${youGave} !`,
                    {
                      position: "bottom-center",
                      autoClose: 2000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: false,
                      progress: undefined,
                      theme: "light",
                    }
                  );
                else {
                  toast.error(`Please press Split button and enter Amount!`, {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                  });
                }
              }
            }}
            autoComplete="off"
          >
            <div className="grid gap-6 mb-6 md:grid-cols-2 p-4 pb-30">
              {
                // name
              }
              {showNameField && (
                <div>
                  <label
                    htmlFor="Name"
                    className="block mb-2 text-sm font-medium "
                  >
                    {isShowSpliter ? "Group Name" : "Name"}
                  </label>
                  <input
                    type="text"
                    id="Name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="John"
                    required
                  />
                </div>
              )}
              {
                // number of person
              }
              {showNOPfield && (
                <div>
                  <label
                    htmlFor="numberOfPerson"
                    className="block mb-2 text-sm font-medium "
                  >
                    Number of Person
                  </label>
                  <input
                    type="number"
                    id="numberOfPerson"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Number of Person"
                    required
                    onChange={() =>
                      setNumberOfPerson(
                        document.getElementById("numberOfPerson").value
                      )
                    }
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="Information"
                  className="block mb-2 text-sm font-medium e"
                >
                  Extra Information
                  <span className="text-gray-400 pl-2">optional</span>
                </label>
                <input
                  type="text"
                  id="ExtraInformation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Information(eg: place, reason for payment etc.)"
                />
              </div>

              <div className="flex flex-row items-stretch justify-around justify-items-center">
                <div>
                  <label
                    htmlFor="Information"
                    className="block mb-2 text-sm font-medium e"
                  >
                    Date
                    <span className="text-gray-400 pl-2">optional</span>
                  </label>
                  <div className="">
                    <DatePicker
                      className="border border-gray-600 rounded-md  p-2 bg-gray-300 caret-color: transparent;"
                      dateFormat="dd/MM/yyyy h:mm aa"
                      id="date"
                      selected={date}
                      showTimeInput
                      onChange={(date) => setDate(date)}
                    />
                  </div>
                </div>

                {
                  // camera
                }
                <div>
                  <label
                    htmlFor="Information"
                    className="block mb-2 text-sm font-medium e"
                  >
                    Attachment
                    <span className="text-gray-400 pl-2">optional</span>
                  </label>
                  <div
                    className="flex justify-center  self-center p-2 bg-black text-white border border-black rounded-lg active:text-gray-400 "
                    onClick={() =>
                      document.getElementById("cameraInput").click()
                    }
                  >
                    {isAttachment ? "Retake" : "Attach Bill"}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    capture="camera"
                    id="cameraInput"
                    style={{display: "none"}}
                    onChange={(e) => {
                      setIsAttachment(true);
                      toast.success("🦄 Attachment is captured!", {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                      });
                    }}
                  />
                </div>
              </div>
              {displayAmount > 0 && !isShowSpliter && (
                <div>
                  <div
                    className={`flex justify-center self-center ${
                      isYouGot === "earn"
                        ? `border-green-400`
                        : `border-rose-600`
                    } border-2 h-12 rounded-md`}
                  >
                    <div
                      className={`flex justify-center items-center text-white font-bold px-4 h-full ${
                        isYouGot === "earn" ? `bg-green-400 ` : `bg-rose-600`
                      }`}
                    >
                      {isYouGot === "earn" ? youGot : youGave}
                    </div>
                    <div className="flex justify-center items-center px-2 bg-slate-400 h-full">
                      {globalSymbol}
                    </div>
                    <div className="flex-1 justify-center self-center px-2 font-bold">
                      {displayAmount}
                    </div>
                  </div>
                </div>
              )}

              {isShowSpliter && displayAmount > 0 && numberOfPerson > 0 && (
                <div
                  className={`flex justify-center self-center  border-2 h-12 rounded-md`}
                >
                  <div
                    className={`flex justify-center items-center text-white font-bold px-4 h-full bg-blue-600 rounded-l-md`}
                  >
                    Each member should give
                  </div>
                  <div className="flex justify-center items-center px-2 bg-slate-400 h-full">
                    {globalSymbol}
                  </div>
                  <div className="flex-1 justify-center self-center px-2 font-bold overflow-hidden">
                    {displayAmount / numberOfPerson}
                  </div>
                </div>
              )}
            </div>

            <div className="fixed bottom-0 w-full">
              {!isShowSpliter ? (
                <div className="flex flex-row justify-evenly mx-4 my-4">
                  <div
                    id="button 1"
                    type="button"
                    className="flex w-1/2 text-white justify-center justify-items-center bg-green-600  hover:scale-125 rounded-md px-6 py-3 mr-2"
                    value="You Got"
                    onClick={() => {
                      setIsShowCalculator(true);
                      setIsYougot("earn");
                    }}
                  >
                    {youGot}
                  </div>

                  <div
                    id="button 2"
                    type="button"
                    className="flex w-1/2 justify-center text-white justify-items-center bg-red-700  hover:scale-125 rounded-md px-6 py-3"
                    value="You Gave"
                    onClick={() => {
                      setIsShowCalculator(true);
                      setIsYougot("spend");
                    }}
                  >
                    {youGave}
                  </div>
                </div>
              ) : (
                <div className="flex flex-row justify-evenly mx-4 my-4">
                  <div
                    id="button 1"
                    type="button"
                    className="flex w-1/2 text-black justify-center justify-items-center bg-[#99BC85] font-bold hover:scale-125 rounded-md px-6 py-3 "
                    value="split"
                    onClick={() => {
                      setIsShowCalculator(true);
                      setIsYougot("split");
                    }}
                  >
                    Split
                  </div>
                </div>
              )}
              <button
                type="submit"
                className=" text-white bg-blue-700  font-medium  text-md w-full sm:w-auto px-5 py-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  history(-1);
                }}
                className=" text-white bg-black  font-medium  text-md w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Cancel
              </button>
            </div>
          </form>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            limit={1}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover={false}
            theme="light"
          />
        </div>
      </>
    </>
  );
}

export default DataCollector;
