import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";

function ParticularData() {
  const {state} = useLocation();
  const [userData, setUserData] = React.useState({});
  useEffect(() => {
    console.log("heyee");
    async function openDB() {
      var openRequest = indexedDB.open("MyDatabase", 2);

      openRequest.onsuccess = async function (e) {
        var db = e.target.result;

        if (db.objectStoreNames.contains("MyObjectStore")) {
          var transaction = db.transaction("MyObjectStore", "readonly");
          var store = transaction.objectStore("MyObjectStore");

          // Use getAll() on the object store
          var request = store.get(state.id);
          request.onsuccess = function () {
            setUserData(request.result);
            console.log("here", userData);
          };
        } else {
          db.close();
          indexedDB.deleteDatabase("MyDatabase");
        }
      };
    }
    openDB();
  }, []);
  console.log("here", userData.Name);
  return (
    <div className="w-screen ">
      <div className="w-full h-12 bg-slate-400 text-black">{userData.Name}</div>
    </div>
  );
}

export default ParticularData;
