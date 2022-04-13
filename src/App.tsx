import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import News from "./pages/News";
import CityList from "./pages/CityList";

function App() {
    return (
      <Router>
        <div className="App">
            <Link to={"/home"}>首页</Link>
            <Link to={"/cityList"}>城市</Link>
            <Routes>
                <Route path={"/home"} element={<Home />}>
                    <Route path={"/home/news"} element={<News />} />
                </Route>
                <Route path={"/cityList"} element={<CityList />} />
            </Routes>
        </div>
      </Router>
  );
}

export default App;
