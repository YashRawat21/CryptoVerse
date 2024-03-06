import React, { useEffect, useState } from 'react'
import { coinData } from '../utilities/api'
import { useParams } from 'react-router-dom'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const CoinChart = () => {
    const [chartData , setChartData] = useState([])
    const {id} = useParams()
    const coinChartData = async() => {
        const data = await fetch(`${coinData}/coins/${id}/market_chart?vs_currency=inr&days=365`);
        const json = await data.json();
        setChartData(json.prices)
        // console.log(json.prices)
    }
    useEffect(() => {
      coinChartData()
    },[id])
    const myData  = {
        labels : chartData?.map((value) => {
            const date = new Date(value[0])
             console.log(date)
        })
    }
  return (
    <div>
        {/* <Line data={myData}/> */}
    </div>
  )
}

export default CoinChart