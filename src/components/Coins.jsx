import React, { useEffect, useState } from 'react';
import { coinData } from '../utilities/api';
import Loader from './Loader';
import Header from './Header';

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('inr');
  const selectedCurrency = currency === 'inr' ? "₹" : "$";
   
  const getCoinData = async () => {
    try {
      const data = await fetch(`${coinData}/coins/markets?vs_currency=${currency}`);
      const coinsData = await data.json();
      if (Array.isArray(coinsData)) {
        setCoins(coinsData);
      } else {
        console.error('Invalid coin data format:', coinsData);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching coin data:', error);
      setLoading(false);
    }
  };
   
console.log(coins)
  useEffect(() => {
    getCoinData();
  }, [currency]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className=' ml-40'>
            <button className= 'h-8 w-20 ml-7 mt-16 bg-orange-500 rounded-lg'onClick={() => setCurrency("inr")}>INR</button>
            <button className= 'h-8 w-20 ml-7 mt-16 bg-orange-500 rounded-lg' onClick={() => setCurrency("usd")}>USD</button>
          </div>
          <div>
            {coins.map((coin, i) => {
              const profit = coin.price_change_percentage_24h > 0;
             return(
              <div key={i} className='flex items-center justify-evenly mt-60 text-xl font-bold'>
              <div>
                <img src={coin.image} className='h-20' alt='coin' />
              </div>
              <div>
                <h4 className='w-20'>{coin.name}</h4>
              </div>
              <div>
                <h4 className='w-20'>{selectedCurrency}{coin.current_price.toFixed(0)}</h4>
              </div>
              <div style={profit ? {color: "green"} : {color:"red"}}>
                <h4  className='w-20'>{profit? "+" + coin.price_change_percentage_24h.toFixed(2) : coin.price_change_percentage_24h.toFixed(2)}</h4>
              </div>
            </div>
             )
            
            })}
          </div>
        </>
      )}

    </div>
  );
};

export default Coins;
