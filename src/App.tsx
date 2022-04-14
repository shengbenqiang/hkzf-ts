import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import News from "./pages/News";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import CityList from "./pages/CityList";
import HouseList from "./pages/HouseList";

function App() {

    return (
      <Router>
        <div className="App">
            <Routes>
                <Route path={"/"} element={<Navigate to={"/home"} />}></Route>
                <Route path={"/home"} element={<Home />}>
                    <Route path={"/home"} element={<Index />} />
                    <Route path={"/home/news"} element={<News />} />
                    <Route path={"/home/profile"} element={<Profile />} />
                    <Route path={"/home/houseList"} element={<HouseList />} />
                </Route>
                <Route path={"/cityList"} element={<CityList />} />
            </Routes>
        </div>
      </Router>
  );
}

export default App;
