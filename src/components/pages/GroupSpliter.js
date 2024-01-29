import React, {useEffect} from "react";

import DataRepresent from "./dataRepresent";
import {useNavigate} from "react-router-dom";
function GroupSpliter() {
  const [dataArray, setDataArray] = React.useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function openDB() {
      var openRequest = indexedDB.open("MyDatabase", 2);

      openRequest.onsuccess = async function (e) {
        var db = e.target.result;

        if (db.objectStoreNames.contains("MyObjectStore")) {
          var transaction = db.transaction("MyObjectStore", "readonly");
          var store = transaction.objectStore("MyObjectStore");
          console.log("dvv", store);
          var index = store.index("structured");

          // // Use getAll() on the object store
          var request = index.getAll("groupSpliter");
          console.log("here", index.getAll());
          request.onsuccess = function () {
            setDataArray(request.result);
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
      <DataRepresent dataArray={dataArray} />
      <div className="sticky flex justify-center bottom-0 w-full bg-[#99BC85] h-14 overflow-visible">
        <button
          className=" absolute bottom-2 border-2 border-black bg-white text-black p-6 rounded-full shadow-lg text-2xl m-auto"
          onClick={() =>
            navigate("/registered/dataCollector", {
              state: {
                showNameField: true,
                showNOPfield: true,
                isShowSpliter: true,
                dataCategory: "groupSpliter",
              },
            })
          }
        >
          +
        </button>
      </div>
    </>
  );
}

export default GroupSpliter;
