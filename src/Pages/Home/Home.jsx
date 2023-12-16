import React, { useEffect, useMemo, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBatteryData } from "../../Redux/Actions/batteryDataAction";
import { setSearchFilterById } from "../../Redux/Slice/BatterDataSlice";
import "./Home.css";
import search from "../../assets/search.png";
import LoadingScreen from "../../Components/Loading/Loading";

// Lazy load the Table component
const Table = lazy(() => import("../../Components/Table/Table"));

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
    if (error === "Network Error") {
      alert("You're not connected to internet. Please try again");
    }
  }, []);

  const cachedData = useMemo(() => completeData, [completeData]);
  const cachedFilters = useMemo(() => filterData, [filterData]);

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
          {cachedData ? (
            <Suspense fallback={<div>Loading...</div>}>
              <Table
                columns={columns}
                data={isFilter !== true ? cachedData : cachedFilters}
              />
            </Suspense>
          ) : (
            <div
              style={{ color: "white", marginTop: "24px", fontSize: "16px" }}
            >
              {error ? error : "No data available"}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
