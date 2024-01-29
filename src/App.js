import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  useLocation,
} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useLayoutEffect, useState} from "react";
import Unregistered from "./components/pages/Unregistered";
import Registered from "./components/pages/Registered";
import styled from "styled-components";
import splash from "./assets/splash.svg";
import user from "./assets/user.png";
import MyExpenses from "./components/pages/MyExpenses";
import Calculator from "./components/smallComponents/calculator";
import GroupSpliter from "./components/pages/GroupSpliter";
import PersonFromContact from "./components/pages/PersonFromContact";
import DataCollector from "./components/pages/DataCollector";
import DataRepresent from "./components/pages/dataRepresent";
import leftArrow from "./assets/leftarrow.png";
import UserProfile from "./components/pages/userProfile";
import ParticularData from "./components/pages/particularData.js";

const ScreenWrapper = styled.div` 
display: flex;
  justify-content: center;
  align-items: center;
 height: 100vh;
  background-size: cover; // This makes the background image cover the entire div
  color: white;
  background-color: #99BC85; // This makes the text color white
`;

const RegisteredFlow = () => (
  <Routes>
    <Route path="/welcome" element={<Registered />} />
    <Route path="/userProfile" element={<UserProfile />} />
    <Route path="/groupSpliter" element={<GroupSpliter />} />
    <Route path="/myExpenses" element={<MyExpenses />} />
    <Route path="/personContact" element={<PersonFromContact />} />
    <Route path="/dataCollector" element={<DataCollector />} />
    <Route path="/dataRepresent" element={<DataRepresent />} />
    <Route path="/particularData" element={<ParticularData />} />
  </Routes>
);

const NonRegisteredFlow = () => (
  <Routes>
    <Route path="/welcome" element={<Unregistered />} />
  </Routes>
);

const Home = () => {
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (localStorage.getItem("userName"))
      setIsUserRegistered(
        localStorage.getItem("userName").length > 0 ? true : false
      );
  }, []);

  useEffect(() => {
    if (isUserRegistered) {
      navigate("/registered/welcome");
    } else {
      navigate("/unregistered/welcome");
    }
  }, [isUserRegistered]);

  return null;
};

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <nav className="bg-[#99BC85] dark:bg-[#0a4308]-500 sticky">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {location.pathname !== "/registered/welcome" && (
            <img
              src={`${leftArrow}`}
              className="w-8 fill-white"
              alt="expensefair Logo"
              onClick={() => navigate("/registered/welcome")}
            />
          )}
          <span className="font-bold text-white font-mono">
            Expense Tracker
          </span>
          <img
            className="w-8 h-8  fill-white"
            src={`${user}`}
            alt="df"
            onClick={() => navigate("/registered/userProfile")}
          />
        </div>
      </nav>

      <Outlet />
    </>
  );
};
const Layout2 = () => (
  <>
    <Outlet />
  </>
);

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Change splash screen after 3 seconds

    return () => clearTimeout(timer); // This will clear the timer when the component unmounts.
  }, []);

  if (showSplash) {
    // Render splash screen
    return (
      <ScreenWrapper className="splash-screen">
        <img
          className="w-full"
          src={`${splash}`}
          alt="hey"
          fetchpriority="high"
        />
      </ScreenWrapper>
    );
  } else {
    // Render your application
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/registered/*" element={<RegisteredFlow />} />
          </Route>
          <Route path="/" element={<Layout2 />}>
            <Route path="/unregistered/*" element={<NonRegisteredFlow />} />
          </Route>
          <Route path="/calculator" element={<Calculator />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
