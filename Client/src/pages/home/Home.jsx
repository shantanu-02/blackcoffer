import "./home.scss";
import TopBox from "../../components/topbox/Topbox";
import ChartBox1 from "../../components/chartBox/ChartBox1";
import ChartBox2 from "../../components/chartBox/ChartBox2";
import ChartBox3 from "../../components/chartBox/ChartBox3";
import ChartBox from "../../components/chartBox/ChartBox";
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion
} from "../../data";
import BarChartBox from "../../components/barchartbox/BarChartBox";
import PieChartBox from "../../components/pieChartBox/PieChartBox";
import BigChartBox from "../../components/bigChartBox/BigChartBox";

const Home = () => {
  return (
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <ChartBox1 />
      </div>
      <div className="box box3">
        <ChartBox2 />
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>
      <div className="box box5">
        <ChartBox {...chartBoxConversion} />
      </div>
      <div className="box box6">
        <ChartBox3/>
      </div>
      <div className="box box7">
        <BigChartBox />
      </div>
      <div className="box box8">
        <BarChartBox {...barChartBoxVisit} />
      </div>
      <div className="box box9">
        <BarChartBox {...barChartBoxRevenue} />
      </div>
    </div>
  );
};

export default Home;
