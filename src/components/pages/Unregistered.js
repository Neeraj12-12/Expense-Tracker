import React, {useState} from "react";
import currencyList from "../../utils/currencyList.json";
import logo from "../../assets/logo.svg";
import {useNavigate} from "react-router-dom";

function Unregistered() {
  const Navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    const selected = currencyList.currencies.find(
      (item) => item.name === event.target.value
    );
    setSelectedCurrency(selected);
  };

  return (
    <>
      <form
        className="flex flex-col  justify-center"
        onSubmit={(event) => {
          event.preventDefault();
          const values = event.target.elements;
          for (let i = 0; i < values.length; i++) {
            if (values[i].id) {
              // Check if element has an id
              localStorage.setItem(values[i].id, values[i].value);
            }
          }
          localStorage.setItem("currencySymbol", selectedCurrency.symbol);
          Navigate("/registered/welcome");
        }}
        autocomplete="off"
      >
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-16 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-30 w-auto"
              src={`${logo}`}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Basic Information
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your Name
              </label>
              <div className="mt-2">
                <input
                  id="userName"
                  type="text"
                  required
                  className="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Please Enter Your Name"
                />
              </div>
              <span className="text-xs">
                Note: We use only your name to address you in the app.
              </span>
            </div>
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Currency
                </label>
              </div>
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
                  <p>Your Selected Currency: {selectedCurrency.symbol}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="absolute w-full bottom-0">
          <button
            type="submit"
            className=" w-full h-14 justify-center bg-indigo-600 text-mx font-bold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default Unregistered;
