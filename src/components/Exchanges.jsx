import React, { useEffect, useState } from 'react'
import Header from './Header'
import { coinData } from '../utilities/api'
import Loader from './Loader'

const Exchanges = () => {
      const [loading , setLoading] = useState(true)
      const [exchanges , setExchanges] = useState([])
     const fetchData = async() => {
      const data = await fetch(`${coinData}/exchanges`)
      const exchangeData = await data.json();
      setExchanges(exchangeData)
      setLoading(false)
     }
     console.log(exchanges)
     useEffect(() => {
         fetchData()
     },[])
  return (
    <div>
        {
          loading ? <Loader /> : <>
           <Header />
       <div>
        {
          exchanges.map((coin) => {
            return (
               <div className='flex items-center justify-evenly mt-60'>
               <div>
              <img src= {coin.image} className='h-20 ' />
            </div>
        <div>
          {/* name */}
          <h4 className='w-20'>{coin.name}</h4>
        </div>
        <div>
          {/* price */}
          <h4 className='w-20'>{coin.trade_volume_24h_btc.toFixed(0)}</h4>
        </div>
            <div>
              {/* rank */}
             <h4 className='w-20'>{coin.trust_score_rank}</h4>   
            </div>
              </div>
            )
          })
        }
       </div>
          </>
        }
    </div>
  )
}

export default Exchanges