import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBatteryData } from "../../Redux/Actions/batteryDataAction";
import { setSearchFilterById } from "../../Redux/Slice/BatterDataSlice";
import Table from "../../Components/Table/Table";
import "./Home.css";
import search from "../../assets/search.png";
import LoadingScreen from "../../Components/Loading/Loading";
const Home = () => {
  const { completeData, isFilter, filterData, loading, error } = useSelector(
    (state) => state.batteryStore
  );

  const dispatch = useDispatch();
  const columns = [
    { title: "BATTERY ID" },
    { title: "SOC" },
    { title: "IMEI" },
    { title: "CURRENT OWNER | ID" },
  ];

  useEffect(() => {
    dispatch(fetchBatteryData());
  }, []);

  return (
    <>
      {loading === true ? (
        <LoadingScreen />
      ) : (
        <div className="container">
          <h1 className="page-heading">Bike BaaZ</h1>
          <div className="search-container">
            <div className="search-input-container">
              <input
                className="search-input"
                type="text"
                placeholder="Search by Battery ID"
                onChange={(e) => {
                  dispatch(setSearchFilterById(e.target.value));
                }}
              />
              <img src={search} alt="search" className="search-icon" />
            </div>
          </div>
          {completeData ? (
            <Table
              columns={columns}
              data={isFilter !== true ? completeData : filterData}
            />
          ) : (
            <div>No data available</div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
