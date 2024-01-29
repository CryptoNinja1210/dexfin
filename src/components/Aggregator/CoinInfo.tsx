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
    console.log(data)
    setflag(true);
    setHistoricData(data);
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days,props.chain]);

  return (
    <div className="" style={{background: 'white', width: '100%', maxHeight: '450px'}}>
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
            type: 'candlestick',
            data: historicData// Set your data here
          }]
        }}
      />
    </div>
  );
};

export default CoinInfo;