import React from "react";
import "./bigChartBox.scss";
import {
  ResponsiveContainer,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import axios from "axios";
import { useState, useRef, useEffect } from "react";

const BigChartBox = () => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [data, setData] = useState([]);
  const [sectorFilter, setSectorFilter] = useState(null);
  const [startYearFilter, setStartYearFilter] = useState(null);

  useEffect(() => {
    fetchData();
  }, [sectorFilter, startYearFilter]);

  const fetchData = async () => {
    try {
      // let url = "/years";
      // const params = {};
      const response = await axios.get("http://localhost:8000/years");

      let filteredData = response.data;

      if (sectorFilter) {
        filteredData = filteredData.filter(
          (item) => item.sector === sectorFilter
        );
      }

      if (startYearFilter) {
        filteredData = filteredData.filter(
          (item) => item.start_year >= startYearFilter
        );
      }

      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSectorChange = (event) => {
    const sector = event.target.value;
    setSectorFilter(sector === "All" ? null : sector);
  };

  const handleStartYearChange = (event) => {
    const startYear = event.target.value;
    setStartYearFilter(startYear === "All" ? null : startYear);
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const x = event.pageX - containerRef.current.offsetLeft;
    const distance = x - startX;
    containerRef.current.scrollLeft = scrollLeft - distance;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const totalDataLength = data.length;

  const containerWidth = totalDataLength * 15;
  return (
    <>
      <h1 style={{ margin: 20 }}>Growth of Sectors</h1>
      <div className="filter-section">
        <label htmlFor="sectorFilter">Sector:</label>
        <select
          className="filter"
          id="sectorFilter"
          onChange={handleSectorChange}
        >
          <option value="All">All</option>
          <option value="Energy">Energy</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Retail">Retail</option>
          <option value="Environment">Environment</option>
          <option value="Financial ">Financial </option>
          <option value="Financial services ">Financial services </option>
          <option value="Information Technology">Information Technology</option>
          <option value="Aerospace & defence">Aerospace & defence</option>
          <option value="Support services">Support services</option>
          <option value="Automotive">Automotive</option>
          <option value="Government">Government</option>
          <option value="Construction">Construction</option>
          <option value="Food & agriculture">Food & agriculture</option>
        </select>
        <label htmlFor="startYearFilter">Start Year:</label>
        <select
          className="filter"
          id="startYearFilter"
          onChange={handleStartYearChange}
        >
          <option value="All">All</option>
          <option value="2020">2016</option>
          <option value="2021">2017</option>
          <option value="2020">2018</option>
          <option value="2021">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2020">2022</option>
          <option value="2021">2023</option>
          <option value="2020">2024</option>
        </select>
      </div>
      <div
        className="bigChartBox"
        style={{ width: "100%", height: "350px", overflow: "hidden" }}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="chart">
          <ResponsiveContainer width={`${containerWidth}%`} height="120%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="sector" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="end_year"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="start_year"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default BigChartBox;
