import { Link } from "react-router-dom";
import "./chartBox.scss";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import axios from "axios";

const ChartBox = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://blackcoffer-udso.onrender.com/relevance");

      let filteredData = response.data;

      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="chartBox" style={{ width: "100%", overflow: "hidden" }}>
      <div className="boxInfo">
        <div className="title">
          <img src="/revenueIcon.svg" alt="" />
          <span>Relevance</span>
        </div>
        <h1>56,432</h1>
        <Link to="/" style={{ color: "teal" }}>
          View all
        </Link>
      </div>
      <div className="chartInfo">
        <div className="chart">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={data}>
              <Tooltip
                contentStyle={{ background: "black", border: "none", opacity: 0.6 }}
              />
              <Line
                type="monotone"
                dataKey="relevance"
                stroke="teal"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
