import React from 'react';
import { isAuth } from "./untils/auth";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Map from "./pages/Map";
import Rent from "./pages/Rent";
import Home from "./pages/Home";
import News from "./pages/News";
import Login from "./pages/Login";
import Index from "./pages/Index";
import RentAdd from "./pages/RentAdd";
import Profile from "./pages/Profile";
import CityList from "./pages/CityList";
import MyCollect from "./pages/MyCollect";
import HouseList from "./pages/HouseList";
import RentSearch from "./pages/RentSearch";
import HouseDetail from "./pages/HouseDetail";

function App() {

    const RequireAuth = ({ children }: { children: JSX.Element }) => {
        let auth = isAuth();
        let location = useLocation();

        if (!auth) {
            return <Navigate to="/login" state={{ from: location }} replace={true} />;
        }

        return children;
    }

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
                <Route path={"/houseDetail/:houseId"} element={<HouseDetail />} />
                <Route path={"/cityList"} element={<CityList />} />
                <Route path={"/map"} element={<Map />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/collect"} element={<RequireAuth><MyCollect/></RequireAuth>} />
                <Route path={"/rent"} element={<RequireAuth><Rent/></RequireAuth>} />
                <Route path={"/rent/rentAdd"} element={<RequireAuth><RentAdd/></RequireAuth>} />
                <Route path={"/rent/rentSearch"} element={<RequireAuth><RentSearch/></RequireAuth>} />
            </Routes>
        </div>
      </Router>
  );
}

export default App;
