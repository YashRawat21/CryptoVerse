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
import Loader from './Loader';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const CoinChart = ({currency}) => {
    const [chartData , setChartData] = useState([])
    const [days , setDays] = useState(1);
    const {id} = useParams()
    const coinChartData = async() => {
        const data = await fetch(`${coinData}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`);
        const json = await data.json();
        setChartData(json.prices)
        
    }
    useEffect(() => {
      coinChartData()
    },[id , currency , days])
    const myData  = {
        labels : chartData?.map((value) => {
            const date = new Date(value[0])
             const time = date.getHours() > 12
             ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
             : `${date.getHours()} : ${date.getMinutes()} AM`
              return days === 1 ? time : date.toLocaleString()
        }) ,
        datasets: [
            {
              label : `price in past ${days} in ${currency}`,
              data : chartData?.map((value) => value[1]),
              borderColor: 'orange',
              borderWidth : '3'
            }
        ]
    }
  return (
         <>
         {
            chartData.length === 0 ?  <Loader /> :      <div>
            <Line className= 'mt-20'data={myData} options={
                {
                    elements: {
                        point:{
                            radius:1,
                        }
                    }
                }
            }/>
                           <div className='ml-16'>
                                <button className='h-8 w-20 ml-3 mt-16 mb-8 bg-orange-500 rounded-lg ' onClick={() => setDays(1)}>24 hours</button>
                                <button className='h-8 w-20 ml-3 mt-16 mb-8 bg-orange-500 rounded-lg' onClick={()=> setDays(30)}>1 Month</button>
                                <button className='h-8 w-20 ml-3 mt-16 mb-8 bg-orange-500 rounded-lg' onClick={() => setDays(365)}>1 Year</button>
    
                            </div>
        </div>
         }
         </>
  )
}

export default CoinChart