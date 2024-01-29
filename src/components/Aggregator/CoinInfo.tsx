'use client'
import axios from "axios"
import { useEffect, useState, useContext } from "react"
// import Link from "next/link"
import { StockChart } from "~/utils/apis"
import { Line } from "react-chartjs-2"
import { Container } from "react-bootstrap"
import { chartDays } from "~/utils/data"
import { Crypto } from "~/utils/Crypto"
import {CategoryScale} from 'chart.js'
import Chart from 'chart.js/auto'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official';
import highchartsTheme from 'highcharts/themes/dark-unica';

const CoinInfo = (props: { chain: any }) => {
  highchartsTheme(Highcharts)
  const { currency } : { currency : string } = useContext(Crypto);
  const [historicData, setHistoricData] = useState<[any]>([{}]);
  const [days, setDays] = useState(1);
  const [flag,setflag] = useState(false);
  // const id = props.chain
  Chart.register(CategoryScale);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(StockChart(props.chain, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };
  const chartOptions = {
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days,props.chain]);

  return (
    <div className="" style={{background: 'white', width: '100%', maxHeight: '450px'}}>
      {!historicData || flag===false ? (
        <Container className=' mx-auto justify-content-center mt-4 text-white items-center h-4/5'><span className="loading loading-infinity text-info text-4xl w-40 h-32 m-auto"></span></Container>
      ) : (
        <>
          {/* <Line
            className="line"
            data={{
              labels: historicData?.map((coin: (string | number | Date)[]) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicData?.map((coin: any[]) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#75c9ff",
                  // fontSize:"10"
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
            style={{padding:"0px 10px"}}
          />
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around"
            }}
          >
            {chartDays.map((day, i) => (
              <button
                key={i}
                onClick={() => {setDays(day.value);
                  setflag(false);
                }}
                style={(day.value === days)?{backgroundColor:"#75c9ff",color:"black",border: "1px solid #212529"}:{backgroundColor:"#212529",border:"1px solid #75c9ff",color:"#75c9ff"}}
                className="timeBtn"
              >
                {day.label}
              </button>
            ))}
          </div> */}
        </>
      )}
      <HighchartsReact
        constructorType={'stockChart'}
        highcharts={Highcharts}
        options={{
          chart: {
            type: 'column'
          },
          title: {
            text: 'Monthly Sales Data'
          },
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
          },
          yAxis: {
            title: {
              text: 'Revenue'
            }
          },
          series: [{
            name: 'Sales',
            data: historicData// Set your data here
          }]
        }}
      />
    </div>
  );
};

export default CoinInfo;