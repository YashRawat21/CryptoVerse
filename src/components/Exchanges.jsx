import React, { useEffect, useState } from 'react';
import Header from './Header';
import { coinData } from '../utilities/api';
import Loader from './Loader';

const Exchanges = () => {
  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([]);

  const fetchData = async () => {
    try {
      const data = await fetch(`${coinData}/exchanges`);
      const exchangeData = await data.json();
      setExchanges(exchangeData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exchange data:', error);
      setLoading(false); // Set loading to false even in case of an error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div>
            {Array.isArray(exchanges) && exchanges.length > 0 ? (
              exchanges.map((coin, i) => (
                <div key={i} className='flex   items-center justify-evenly mt-60'>
                  <div>
                    <img src={coin.image} className='h-20 ' />
                  </div>
                  <div>
                    <h4 className='w-28 text-xl font-bold'>{coin.name}</h4>
                  </div>
                  <div>
                    <h4 className='w-28 text-xl font-bold'>{coin.trade_volume_24h_btc.toFixed(0)}</h4>
                  </div>
                  <div>
                    <h4 className='w-28 text-xl font-bold'>{coin.trust_score_rank}</h4>
                  </div>
                </div>
              ))
            ) : (
              <p>No exchange data available</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Exchanges;
