import React, { useEffect, useState } from 'react';
import { coinData } from '../utilities/api';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoPulseOutline } from "react-icons/io5";
import CoinChart from './CoinChart';


 const CoinDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [coinDetails, setCoinDetails] = useState([]);
    const [currency, setCurrency] = useState('inr');
    const selectedCurrency = currency === 'inr' ? "₹" : "$";

    // const getCoin = async () => {
    //     try {
    //         const data = await fetch(`${coinData}/coins/${id}`);
    //         const json = await data.json();
    //         if (Array.isArray(json)) {
    //             setCoinDetails(json);
    //         } else {
    //             console.error("Invalid data format:", json);
    //         }
    //         setLoading(false);
    //     } catch (error) {
    //         console.error("Error fetching coin details:", error);
    //         setLoading(false);
    //     }
    //     console.log(coinDetails)
    // };
    const getCoin = async() => {
     
        const data = await fetch(`${coinData}/coins/${id}`);
         const json = await data.json();
         setCoinDetails(json);
          setLoading(false)
        }

    useEffect(() => {
        getCoin();
    }, [id]);
    const profit = coinDetails?.market_data?.price_change_percentage_24h > 0;
    return (
        <div>
            {loading ? <Loader /> : (
               
                        <div className='ml-16'>
                             <div>
                     <button className= 'h-8 w-20 ml-3 mt-16 mb-8 bg-orange-500 rounded-lg'onClick={() => setCurrency("inr")}>INR</button>
                     <button className= 'h-8 w-20 ml-3 mt-16 mb-8 bg-orange-500 rounded-lg' onClick={() => setCurrency("usd")}>USD</button>
                      </div>
                            <div>
                                <div className='font-bold mt-4'>{coinDetails.last_updated}</div>
                            </div>
                           
                            <div>
                                <img className='mt-16 h-36 object-cover' src= {coinDetails?.image?.small} alt='Coin logo' />
                            </div>
                            <div className='font-bold text-3xl mt-[50px]'>{coinDetails.name}</div>
                            <div className='font-bold text-xl mt-3'>{currency == 'inr' ? "₹" : "$"}{coinDetails.market_data.current_price[currency]}</div>
                            <div className='mt-3 ml-2 flex items-center'> {profit ? < IoIosArrowUp color='green'/>: <IoIosArrowDown color='red'/>} {coinDetails.market_data.price_change_percentage_24h}%</div>
                            <div className='font-bold text-2xl mt-5 ml-1 flex items-center'> <IoPulseOutline color='orange'/>#{coinDetails.market_cap_rank}</div>
                            <div className='mt-5 w-80'>{coinDetails.description.en.split('.')[0]}</div>

                            <CoinChart />
                        </div>
                  
                ) 
            }
        </div>
    );
};

export default CoinDetails;
