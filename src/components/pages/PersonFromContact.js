import React, {useEffect} from "react";
import DataRepresent from "./dataRepresent";
import {useNavigate} from "react-router-dom";

function PersonFromContacct() {
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

          if (store.indexNames.contains("structured")) {
            var index = store.index("structured");
            // // Use getAll() on the object store
            var request = index.getAll("personFromContact");
            request.onsuccess = function () {
              setDataArray(request.result);
            };
          }
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
          onClick={() => {
            async function getContact() {
              const supported = "contacts" in navigator;
              if (supported) {
                const supportedProperties =
                  await navigator.contacts.getProperties();
                if (supportedProperties.includes("name")) {
                  console.log("name is supported");
                }
              }

              navigate("/registered/dataCollector", {
                state: {
                  showNameField: true,
                  youGot: "You Get",
                  youGave: "You Gave",
                  dataCategory: "personFromContact",
                },
              });
            }
            getContact();
          }}
        >
          +
        </button>
      </div>
    </>
  );
}

export default PersonFromContacct;
