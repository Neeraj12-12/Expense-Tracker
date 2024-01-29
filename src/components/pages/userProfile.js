import React, {useState} from "react";
import user from "../../assets/user.png";
import currencyList from "../../utils/currencyList.json";
import {useNavigate} from "react-router-dom";
import {
  globalUserName,
  globalCurrency,
  globalSymbol,
} from "../../service/globalData/global";

function UserProfile() {
  const [selectedOption, setSelectedOption] = useState(`${globalCurrency}`);
  const [selectedCurrency, setSelectedCurrency] = useState(`${globalSymbol}`);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    const selected = currencyList.currencies.find(
      (item) => item.name === event.target.value
    );
    console.log(selected);
    setSelectedCurrency(selected.symbol);

    localStorage.setItem("currency", selected.name);
    localStorage.setItem("currencySymbol", selected.symbol);
    localStorage.setItem("isChanged", "true");
  };

  console.log(globalUserName);
  return (
    <div>
      <div className="flex flex-col  items-center h-screen w-screen mt-20 ">
        <div className="flex justify-center items-center bg-black rounded-full h-36 w-36">
          <img src={`${user}`} className="w-26" alt="user" />
        </div>
        <div className="text-3xl font-serif mt-4">{globalUserName}</div>

        <div className="relative mt-2">
          <select
            id="currency"
            value={selectedOption}
            onChange={handleChange}
            className="block px-4  w-full h-10  rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm leading-6 appearance-none pr-8"
            required
            placeholder="Select Currency"
          >
            <option key={"2"} value={""}>
              select
            </option>
            {currencyList.currencies.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 12l-6-6h12l-6 6z" />
            </svg>
          </div>
        </div>
        {selectedCurrency && (
          <div className="mt-2">
            <p>Your Selected Currency: {selectedCurrency}</p>
          </div>
        )}
      </div>
      <div className="absolute bottom-4 w-screen">
        <button
          className=" w-full h-16 rounded-lg  bg-red-500 text-white"
          onClick={() => {
            const result = prompt(
              "Are you sure you want to clear all data?",
              "yes"
            );
            if (result === "yes") {
              localStorage.clear();

              indexedDB.deleteDatabase("MyDatabase");
              navigate("/");
            }
          }}
        >
          Clear All Data
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
