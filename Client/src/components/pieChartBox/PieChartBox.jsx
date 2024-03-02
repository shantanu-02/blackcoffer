import React from "react";
import "./pieChartBox.scss";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import axios from "axios";

const PieChartBox = () => {
  const [data, setData] = useState([]);
  const [dataTwo, setDataTwo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resAsia = await axios.get("https://blackcoffer-udso.onrender.com/region/asia");
        const resAmerica = await axios.get(
          "https://blackcoffer-udso.onrender.com/region/america"
        );
        const resAfrica = await axios.get(
          "https://blackcoffer-udso.onrender.com/region/africa"
        );
        const resEurope = await axios.get(
          "https://blackcoffer-udso.onrender.com/region/europe"
        );
        const resWorld = await axios.get("https://blackcoffer-udso.onrender.com/region/world");

        const asiaCount = resAsia.data.length;
        const americaCount = resAmerica.data.length;
        const africaCount = resAfrica.data.length;
        const europeCount = resEurope.data.length;
        const worldCount = resWorld.data.length;

        setDataTwo([{ name: "World", value: worldCount, color: "#59b649" }]);

        setData([
          { name: "Asia", value: asiaCount, color: "#0088FE" },
          { name: "America", value: americaCount, color: "#00C49F" },
          { name: "Africa", value: africaCount, color: "#FFBB28" },
          { name: "Europe", value: europeCount, color: "#FF8042" },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pieChartBox">
      <h1>Regions by Source</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
            <Pie
              data={dataTwo}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={120}
              fill="#59b649"
            />
            <Cell key={dataTwo.name} fill={dataTwo.color} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {data.map((item) => (
          <div className="option">
            <div className="title">
              <div
                className="dot"
                style={{ backgroundColor: item.color }}
              ></div>
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
      <div className="options2">
        <div className="option2">
          <div className="title2">
            <div
              className="dot2"
              style={{ backgroundColor: "#59b649" }}
            ></div>
            <span>World</span>
          </div>
          <span>131</span>
        </div>
      </div>
    </div>
  );
};

export default PieChartBox;
